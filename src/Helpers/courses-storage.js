import { defaultCoursesCatalog } from "../data/courses";

const UPLOADED_COURSES_KEY = "CursosProfesores";

export function getUploadedCourses() {
  try {
    const data = localStorage.getItem(UPLOADED_COURSES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveUploadedCourse(course) {
  const list = getUploadedCourses();
  list.push(course);
  localStorage.setItem(UPLOADED_COURSES_KEY, JSON.stringify(list));
}

export function getAllCourses() {
  return [...defaultCoursesCatalog, ...getUploadedCourses()];
}

export function getCourseById(id) {
  const course = getAllCourses().find((c) => c.id === id);
  return course ?? defaultCoursesCatalog[0];
}

export function getCoursesByProfessor(professorId) {
  return getUploadedCourses().filter((c) => c.professorId === professorId);
}

export function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function normalizeVideoUrl(url) {
  if (!url) return "";
  const trimmed = url.trim();
  if (trimmed.includes("youtube.com/embed/")) return trimmed;
  const watchMatch = trimmed.match(/[?&]v=([^&]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  const shortMatch = trimmed.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return `https://www.youtube.com/embed/${trimmed}`;
  }
  return trimmed;
}

export function buildCourseFromForm(form, professor) {
  const id = `${slugify(form.name)}-${Date.now()}`;
  const professorName = professor.nombre || "Profesor";
  const lessons = form.lessons
    .filter((l) => l.title.trim() && l.video.trim())
    .map((l) => ({
      title: l.title.trim(),
      video: normalizeVideoUrl(l.video),
      description: l.description.trim() || `Lección de ${form.name}`,
    }));

  return {
    id,
    name: form.name.trim(),
    category: form.category,
    level: form.level,
    duration: form.duration || `${lessons.length * 2} h`,
    instructor: professorName,
    createdBy: professorName,
    professorId: professor.id || professor.correo,
    accent: form.accent || "#8b5cf6",
    description: form.description.trim(),
    isUploaded: true,
    uploadedAt: new Date().toISOString(),
    sections: [
      {
        title: form.sectionTitle.trim() || "Contenido del curso",
        lessons,
      },
    ],
  };
}
