const STORAGE_KEY = "KnowlyCertificados";
export const COMPLETION_EVENT = "knowly:courses-completed";

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAll(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getUserKey(usuario) {
  return usuario?.correo || usuario?.id || "invitado";
}

function formatDate(date) {
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function generateCode(courseId) {
  const slug = String(courseId).replace(/[^a-z0-9]/gi, "").slice(0, 4).toUpperCase();
  const year = new Date().getFullYear();
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `KNW-${slug || "CRS"}-${year}-${suffix}`;
}

export function buildCertificateFromCourse(course) {
  return {
    id: `cert-${course.id}`,
    courseId: course.id,
    courseName: course.name,
    completionDate: formatDate(new Date()),
    grade: "A",
    hours: course.duration || "—",
    code: generateCode(course.id),
    instructor: course.createdBy || course.instructor || "Knowly",
  };
}

export function getCertificatesForUser(usuario) {
  const key = getUserKey(usuario);
  const list = readAll()[key];
  return Array.isArray(list) ? list : [];
}

export function isCourseCompleted(usuario, courseId) {
  if (!usuario || !courseId) return false;
  return getCertificatesForUser(usuario).some((c) => c.courseId === courseId);
}

export function completeCourse(usuario, course) {
  const key = getUserKey(usuario);
  const all = readAll();
  const list = all[key] ?? [];

  if (list.some((c) => c.courseId === course.id)) {
    return { certificate: list.find((c) => c.courseId === course.id), alreadyHad: true };
  }

  const certificate = buildCertificateFromCourse(course);
  all[key] = [...list, certificate];
  writeAll(all);
  window.dispatchEvent(new CustomEvent(COMPLETION_EVENT));
  return { certificate, alreadyHad: false };
}

export function getCompletionStats(certificates) {
  if (!certificates.length) {
    return { count: 0, average: "—", totalHours: "0 h" };
  }
  const grades = { "A+": 4.3, A: 4, "B+": 3.3, B: 3 };
  const sum = certificates.reduce((acc, c) => acc + (grades[c.grade] ?? 4), 0);
  const avg = (sum / certificates.length).toFixed(1);
  const hoursNum = certificates.reduce((acc, c) => {
    const n = parseInt(String(c.hours), 10);
    return acc + (Number.isNaN(n) ? 0 : n);
  }, 0);
  return {
    count: certificates.length,
    average: avg,
    totalHours: `${hoursNum} h`,
  };
}
