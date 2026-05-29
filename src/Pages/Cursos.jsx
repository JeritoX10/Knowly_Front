import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Clock, BarChart3, ArrowRight, GraduationCap, SearchX, Award, CheckCircle2 } from "lucide-react";
import { getAllCourses } from "../Helpers/courses-storage";
import { getCurrentUser, isFreePlan, getUserPlanId } from "../Helpers/plan-access";
import { isCourseCompleted, COMPLETION_EVENT } from "../Helpers/course-completion";

const CATEGORY_ORDER = [
  "Todos",
  "Programación",
  "Backend",
  "Seguridad",
  "Diseño",
  "Datos",
  "Idiomas",
  "Negocios",
  "Arte",
  "Productividad",
  "Soft skills",
  "Otro",
];

function Cursos() {
  const [courses, setCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const usuario = getCurrentUser();
  const showFreeHint = usuario && isFreePlan(getUserPlanId(usuario));
  const [, setCompletionTick] = useState(0);

  const refreshCourses = useCallback(() => {
    setCourses(getAllCourses());
    setCompletionTick((n) => n + 1);
  }, []);

  useEffect(() => {
    refreshCourses();
    window.addEventListener(COMPLETION_EVENT, refreshCourses);
    return () => window.removeEventListener(COMPLETION_EVENT, refreshCourses);
  }, [refreshCourses]);

  const categories = useMemo(() => {
    const fromCourses = [...new Set(courses.map((c) => c.category))];
    const ordered = CATEGORY_ORDER.filter(
      (cat) => cat === "Todos" || fromCourses.includes(cat)
    );
    const extras = fromCourses.filter((cat) => !CATEGORY_ORDER.includes(cat));
    return [...ordered, ...extras];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    if (activeCategory === "Todos") return courses;
    return courses.filter((c) => c.category === activeCategory);
  }, [courses, activeCategory]);

  return (
    <div className="courses-page">
      <header className="courses-header">
        <h1>Catálogo de cursos</h1>
        <p>
          Explora formación acreditada en programación, diseño, datos, negocios y más. Usa los
          filtros para encontrar el curso ideal.
        </p>
        {showFreeHint && (
          <p className="courses-free-hint" role="status">
            Puedes explorar todos los cursos. Al pulsar <strong>Ver curso</strong> necesitarás una
            membresía de pago para acceder a las lecciones.
          </p>
        )}
        <div className="courses-filters" role="tablist" aria-label="Filtrar por categoría">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              className={`courses-category-pill${activeCategory === cat ? " courses-category-pill--active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <p className="courses-filter-count">
          {filteredCourses.length}{" "}
          {filteredCourses.length === 1 ? "curso encontrado" : "cursos encontrados"}
          {activeCategory !== "Todos" && (
            <span>
              {" "}
              en <strong>{activeCategory}</strong>
            </span>
          )}
        </p>
      </header>

      {filteredCourses.length === 0 ? (
        <div className="courses-empty">
          <SearchX size={48} />
          <h3>No hay cursos en esta categoría</h3>
          <p>Prueba otro filtro o vuelve a ver todos los cursos.</p>
          <button
            type="button"
            className="courses-category-pill courses-category-pill--active"
            onClick={() => setActiveCategory("Todos")}
          >
            Ver todos
          </button>
        </div>
      ) : (
      <div className="courses-grid">
        {filteredCourses.map((course) => {
          const finished = usuario && isCourseCompleted(usuario, course.id);
          return (
          <article
            key={course.id}
            className={`course-card${finished ? " course-card--completed" : ""}`}
          >
            <div
              className="course-card-banner"
              style={{
                background: `linear-gradient(135deg, ${course.accent}dd, ${course.accent}88)`,
              }}
            >
              <span className="course-card-category">{course.category}</span>
              <div className="course-card-banner-tags">
                <span className="course-card-level">{course.level}</span>
                {finished && (
                  <span className="course-card-done">
                    <CheckCircle2 size={12} /> Finalizado
                  </span>
                )}
                {course.isUploaded && !finished && <span className="course-card-new">Nuevo</span>}
              </div>
            </div>
            <div className="course-card-body">
              <h3 className="course-card-title">{course.name}</h3>
              <p className="course-card-desc">{course.description}</p>

              <div className="course-card-professor">
                <GraduationCap size={16} />
                <div>
                  <span className="course-card-professor-label">Profesor creador</span>
                  <span className="course-card-professor-name">
                    {course.createdBy || course.instructor}
                  </span>
                </div>
              </div>

              <div className="course-card-meta">
                <span>
                  <Clock size={14} />
                  {course.duration}
                </span>
                <span>
                  <BarChart3 size={14} />
                  {course.level}
                </span>
              </div>
              <div className="course-card-footer course-card-footer--actions">
                {finished ? (
                  <Link to="/certificados" className="course-card-btn course-card-btn--done">
                    <Award size={16} />
                    Ver diploma
                  </Link>
                ) : (
                  <Link to={`/vista?curso=${course.id}`} className="course-card-btn">
                    Ver curso
                    <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            </div>
          </article>
        );
        })}
      </div>
      )}
    </div>
  );
}

export default Cursos;
