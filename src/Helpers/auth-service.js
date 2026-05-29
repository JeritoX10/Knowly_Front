import { end_points } from "../Services/api";
import { getLocalStorage } from "./local-storage";
import { FREE_PLAN_ID } from "./plan-access";

const LOCAL_USERS_KEY = "CuentasKnowly";

export async function fetchUsuariosApi() {
  const response = await fetch(end_points.usuario);
  if (!response.ok) {
    throw new Error(`Error del servidor: ${response.status}`);
  }
  return response.json();
}

export async function checkApiHealth() {
  try {
    const response = await fetch(end_points.usuario, { method: "GET" });
    return response.ok;
  } catch {
    return false;
  }
}

function getLocalUsers() {
  try {
    const data = localStorage.getItem(LOCAL_USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveLocalUser(user) {
  const list = getLocalUsers().filter((u) => u.correo !== user.correo);
  list.push(user);
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(list));
}

/** Mantiene CuentasKnowly al día (login, registro, pago) */
export function persistLocalUser(user) {
  if (!user?.correo) return;
  saveLocalUser({
    id: user.id || user.ideusuario,
    ideusuario: user.ideusuario,
    nombre: user.nombre,
    apellido: user.apellido,
    documento: user.documento,
    correo: user.correo,
    contrasenia: user.contrasenia || user.contrasea,
    rol: user.rol ?? "estudiante",
    planId: user.planId ?? FREE_PLAN_ID,
  });
}

function buildApiPayload(user) {
  return {
    ideusuario: user.ideusuario,
    rol: user.rol?.toUpperCase() || "ESTUDIANTE",
    nombre: user.nombre,
    apellido: user.apellido,
    documento: user.documento,
    correo: user.correo,
    contrasenia: user.contrasenia || user.contrasea,
  };
}

async function updateUserOnApi(id, user) {
  try {
    const response = await fetch(`${end_points.usuario}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildApiPayload(user)),
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    console.warn("No se pudo actualizar usuario en API:", e);
  }
  return null;
}

async function syncUserToApi(user) {
  if (user.id && !String(user.id).startsWith("local-")) {
    return updateUserOnApi(user.id, user);
  }

  try {
    const apiUsers = await fetchUsuariosApi();
    const match = apiUsers.find((u) => u.correo === user.correo);
    if (match?.id) {
      const updated = await updateUserOnApi(match.id, user);
      if (updated?.id) {
        return { ...user, id: updated.id };
      }
    }
  } catch {
    /* respaldo local */
  }
  return user;
}

export async function registerUser(userData) {
  let apiUser = null;
  try {
    const response = await fetch(end_points.usuario, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildApiPayload(userData)),
    });
    if (response.ok) {
      apiUser = await response.json();
    }
  } catch (e) {
    console.warn("Registro API no disponible, usando almacenamiento local:", e);
  }

  const user = {
    ...userData,
    id: apiUser?.id || apiUser?.ideusuario || `local-${Date.now()}`,
  };

  persistLocalUser(user);
  return user;
}

export async function findUserForLogin(correo, contrasea) {
  const localUsers = getLocalUsers();
  const localMatch = localUsers.find(
    (u) => u.correo === correo && (u.contrasenia === contrasea || u.contrasea === contrasea)
  );

  if (localMatch) {
    return {
      ...localMatch,
      rol: localMatch.rol ?? "estudiante",
      planId: localMatch.planId ?? FREE_PLAN_ID,
    };
  }

  let apiUsers = [];
  try {
    apiUsers = await fetchUsuariosApi();
  } catch {
    apiUsers = [];
  }

  const apiMatch = apiUsers.find(
    (u) => u.correo === correo && (u.contrasenia === contrasea || u.contrasea === contrasea)
  );

  if (!apiMatch) return null;

  const user = {
    ...apiMatch,
    id: apiMatch.id,
    rol: apiMatch.rol ?? "estudiante",
    planId: apiMatch.planId ?? FREE_PLAN_ID,
    contrasea,
  };

  persistLocalUser(user);
  return user;
}

/** Guarda plan y rol en local + API (persiste entre sesiones) */
export async function updateUserMembership(correo, { planId, rol }) {
  const list = getLocalUsers();
  let idx = list.findIndex((u) => u.correo === correo);

  if (idx < 0) {
    const session = getLocalStorage("Usuario");
    if (session?.correo !== correo) return null;
    persistLocalUser(session);
    idx = getLocalUsers().findIndex((u) => u.correo === correo);
    if (idx < 0) return null;
  }

  const updated = {
    ...list[idx],
    planId,
    ...(rol ? { rol } : {}),
  };

  list[idx] = updated;
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(list));

  const synced = await syncUserToApi(updated);
  if (synced?.id && !String(synced.id).startsWith("local-")) {
    list[idx] = { ...updated, id: synced.id };
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(list));
  }

  return list[idx];
}

/** @deprecated usar updateUserMembership */
export function updateUserPlan(correo, planId) {
  return updateUserMembership(correo, { planId });
}
