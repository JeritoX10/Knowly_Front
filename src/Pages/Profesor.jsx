import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Upload, Plus, Trash2, Video, BookOpen, CheckCircle } from "lucide-react";
import { getLocalStorage } from "../Helpers/local-storage";
import {
  buildCourseFromForm,
  saveUploadedCourse,
  getCoursesByProfessor,
} from "../Helpers/courses-storage";
import { redirect } from "../Helpers/alerts";
import PlanGuard from "../Components/PlanGuard";
import { hasPaidPlan } from "../Helpers/plan-access";

const emptyLesson = { title: "", video: "", description: "" };

const CATEGORIES = [
  "Programación",
  "Diseño",
  "Negocios",
  "Datos",
  "Idiomas",
  "Arte",
  "Productividad",
  "Soft skills",
  "Otro",
];

const LEVELS = ["Principiante", "Intermedio", "Avanzado"];

const ACCENT_COLORS = ["#8b5cf6", "#3b82f6", "#22c55e", "#f59e0b", "#ec4899", "#06b6d4", "#ef4444"];

export default function Profesor() {
  const navigate = useNavigate();
  const usuario = getLocalStorage("Usuario");
  const [myCourses, setMyCourses] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "Programación",
    level: "Principiante",
    duration: "",
    description: "",
    sectionTitle: "Módulo 1",
    accent: "#8b5cf6",
    lessons: [{ ...emptyLesson }],
  });

  useEffect(() => {
    if (!usuario || usuario.rol !== "profesor") {
      navigate("/login");
      return;
    }
    if (usuario && !hasPaidPlan(usuario)) {
      return;
    }
    setMyCourses(getCoursesByProfessor(usuario.id || usuario.correo));
  }, [usuario, navigate, submitted]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateLesson = (index, field, value) => {
    setForm((prev) => {
      const lessons = [...prev.lessons];
      lessons[index] = { ...lessons[index], [field]: value };
      return { ...prev, lessons };
    });
  };

  const addLesson = () => {
    setForm((prev) => ({
      ...prev,
      lessons: [...prev.lessons, { ...emptyLesson }],
    }));
  };

  const removeLesson = (index) => {
    if (form.lessons.length <= 1) return;
    setForm((prev) => ({
      ...prev,
      lessons: prev.lessons.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validLessons = form.lessons.filter((l) => l.title.trim() && l.video.trim());
    if (!form.name.trim()) {
      redirect("Escribe el nombre del curso", null, "warning");
      return;
    }
    if (validLessons.length === 0) {
      redirect("Agrega al menos una lección con título y enlace de video", null, "warning");
      return;
    }

    const course = buildCourseFromForm({ ...form, lessons: validLessons }, usuario);
    saveUploadedCourse(course);
    setSubmitted(true);
    setForm({
      name: "",
      category: "Programación",
      level: "Principiante",
      duration: "",
      description: "",
      sectionTitle: "Módulo 1",
      accent: "#8b5cf6",
      lessons: [{ ...emptyLesson }],
    });
    redirect("¡Curso publicado en el catálogo!", "/cursos", "success");
  };

  if (!usuario || usuario.rol !== "profesor") {
    return null;
  }

  return (
    <PlanGuard access="profesor" feature="profesor">
    <div className="professor-page">
      <header className="professor-header">
        <div>
          <span className="professor-badge">Panel docente</span>
          <h1>Hola, {usuario.nombre}</h1>
          <p>Sube videos y publica tus cursos. Aparecerán en el catálogo con tu nombre como profesor.</p>
        </div>
        <Link to="/cursos" className="landing-btn landing-btn--outline">
          Ver catálogo
        </Link>
      </header>

      <div className="professor-layout">
        <form className="professor-form" onSubmit={handleSubmit}>
          <h2>
            <Upload size={22} />
            Publicar nuevo curso
          </h2>

          <div className="professor-form-grid">
            <label className="professor-field professor-field--full">
              <span>Nombre del curso</span>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Ej: Introducción a React"
                required
              />
            </label>

            <label className="professor-field">
              <span>Categoría</span>
              <select value={form.category} onChange={(e) => updateField("category", e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="professor-field">
              <span>Nivel</span>
              <select value={form.level} onChange={(e) => updateField("level", e.target.value)}>
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </label>

            <label className="professor-field">
              <span>Duración estimada</span>
              <input
                type="text"
                value={form.duration}
                onChange={(e) => updateField("duration", e.target.value)}
                placeholder="20 h"
              />
            </label>

            <label className="professor-field professor-field--full">
              <span>Descripción</span>
              <textarea
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Describe de qué trata tu curso..."
                rows={3}
              />
            </label>

            <label className="professor-field professor-field--full">
              <span>Título del módulo</span>
              <input
                type="text"
                value={form.sectionTitle}
                onChange={(e) => updateField("sectionTitle", e.target.value)}
                placeholder="Módulo 1"
              />
            </label>

            <div className="professor-field professor-field--full">
              <span>Color del curso</span>
              <div className="professor-colors">
                {ACCENT_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`professor-color-btn${form.accent === color ? " professor-color-btn--active" : ""}`}
                    style={{ background: color }}
                    onClick={() => updateField("accent", color)}
                    aria-label={`Color ${color}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="professor-lessons">
            <h3>
              <Video size={20} />
              Lecciones en video
            </h3>
            <p className="professor-lessons-hint">
              Pega el enlace de YouTube (compartir o embed). Se mostrarán en el reproductor del curso.
            </p>

            {form.lessons.map((lesson, index) => (
              <div key={index} className="professor-lesson-card">
                <div className="professor-lesson-head">
                  <span>Lección {index + 1}</span>
                  {form.lessons.length > 1 && (
                    <button
                      type="button"
                      className="professor-lesson-remove"
                      onClick={() => removeLesson(index)}
                      aria-label="Eliminar lección"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Título de la lección"
                  value={lesson.title}
                  onChange={(e) => updateLesson(index, "title", e.target.value)}
                />
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={lesson.video}
                  onChange={(e) => updateLesson(index, "video", e.target.value)}
                />
                <textarea
                  placeholder="Descripción breve (opcional)"
                  value={lesson.description}
                  onChange={(e) => updateLesson(index, "description", e.target.value)}
                  rows={2}
                />
              </div>
            ))}

            <button type="button" className="professor-add-lesson" onClick={addLesson}>
              <Plus size={18} />
              Agregar otra lección
            </button>
          </div>

          <button type="submit" className="landing-btn landing-btn--primary professor-submit">
            <Upload size={18} />
            Publicar curso en Knowly
          </button>
        </form>

        <aside className="professor-sidebar">
          <h3>
            <BookOpen size={20} />
            Mis cursos publicados
          </h3>
          {myCourses.length === 0 ? (
            <p className="professor-empty">Aún no has subido cursos. ¡Publica el primero!</p>
          ) : (
            <ul className="professor-course-list">
              {myCourses.map((c) => (
                <li key={c.id} className="professor-course-item">
                  <div className="professor-course-dot" style={{ background: c.accent }} />
                  <div>
                    <strong>{c.name}</strong>
                    <span>Profesor: {c.instructor}</span>
                    <Link to={`/vista?curso=${c.id}`}>Ver curso →</Link>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="professor-tip">
            <CheckCircle size={18} />
            <p>
              Los estudiantes verán tu nombre como <strong>profesor creador</strong> en el catálogo de
              cursos.
            </p>
          </div>
        </aside>
      </div>
    </div>
    </PlanGuard>
  );
}
