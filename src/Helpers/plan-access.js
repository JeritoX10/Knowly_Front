import { getLocalStorage } from "./local-storage";

export const FREE_PLAN_ID = "gratuito";

/** Rutas accesibles con plan gratuito (además de blogs y catálogo) */
export const FREE_ALLOWED_PATHS = [
  "/",
  "/home",
  "/blogs",
  "/cursos",
  "/login",
  "/estudiantes",
  "/profesores",
  "/pago",
];

export function isFreePlan(planId) {
  return !planId || planId === FREE_PLAN_ID;
}

export function getUserPlanId(usuario) {
  return usuario?.planId ?? FREE_PLAN_ID;
}

export function hasPaidPlan(usuario) {
  if (!usuario) return false;
  return !isFreePlan(getUserPlanId(usuario));
}

/** Blogs siempre permitidos si hay sesión (incluso plan gratuito) */
export function canAccessBlogs(usuario) {
  return Boolean(usuario);
}

export function canAccessPremiumContent(usuario) {
  if (!usuario) return false;
  return hasPaidPlan(usuario);
}

/** Lecciones y contenido del curso (requiere plan de pago) */
export function canAccessCourseContent(usuario) {
  return canAccessPremiumContent(usuario);
}

export function canAccessProfesorPanel(usuario) {
  if (!usuario || usuario.rol !== "profesor") return false;
  return hasPaidPlan(usuario);
}

export function getUpgradeMessage(feature) {
  const messages = {
    cursos: "el catálogo completo de cursos",
    certificados: "tus certificados acreditados",
    contacto: "la comunidad y reseñas",
    vista: "el contenido de este curso",
    profesor: "el panel para subir cursos",
    default: "esta sección",
  };
  return messages[feature] || messages.default;
}

export function getCurrentUser() {
  return getLocalStorage("Usuario");
}
