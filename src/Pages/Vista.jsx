import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";
import Swal from "sweetalert2";
import CourseSidebar from "../Components/CourseSidebar.jsx";
import CourseContent from "../Components/CourseContent.jsx";
import PlanGuard from "../Components/PlanGuard.jsx";
import { getCourseById } from "../Helpers/courses-storage";
import { getCurrentUser } from "../Helpers/plan-access";
import {
  completeCourse,
  isCourseCompleted,
  COMPLETION_EVENT,
} from "../Helpers/course-completion";

function VistaContent({ course, usuario }) {
  const navigate = useNavigate();
  const firstLesson = course.sections[0]?.lessons[0];
  const [currentLesson, setCurrentLesson] = useState(firstLesson);
  const [completed, setCompleted] = useState(() => isCourseCompleted(usuario, course.id));
  const [finishing, setFinishing] = useState(false);

  const userKey = usuario?.correo ?? "";

  const refreshCompleted = useCallback(() => {
    setCompleted(isCourseCompleted(getCurrentUser(), course.id));
  }, [userKey, course.id]);

  useEffect(() => {
    const updated = getCourseById(course.id);
    setCurrentLesson(updated.sections[0]?.lessons[0]);
    refreshCompleted();
  }, [course.id, refreshCompleted]);

  useEffect(() => {
    window.addEventListener(COMPLETION_EVENT, refreshCompleted);
    return () => window.removeEventListener(COMPLETION_EVENT, refreshCompleted);
  }, [refreshCompleted]);

  const handleFinishCourse = async () => {
    const confirm = await Swal.fire({
      title: "¿Finalizar este curso?",
      html: `Al confirmar, generaremos tu diploma de <strong>${course.name}</strong> y el curso aparecerá como completado en tu catálogo.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, finalizar curso",
      cancelButtonText: "Seguir estudiando",
      confirmButtonColor: "#7c3aed",
    });

    if (!confirm.isConfirmed) return;

    setFinishing(true);
    const { alreadyHad } = completeCourse(usuario, course);
    setCompleted(true);
    setFinishing(false);

    if (alreadyHad) {
      await Swal.fire({
        title: "Ya completaste este curso",
        text: "Tu diploma sigue disponible en la sección de certificados.",
        icon: "info",
        confirmButtonColor: "#7c3aed",
      });
      return;
    }

    const result = await Swal.fire({
      title: "¡Felicitaciones!",
      html: `Completaste <strong>${course.name}</strong>. Tu diploma ya está en Mis certificados.`,
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Ver mi diploma",
      cancelButtonText: "Seguir en el curso",
      confirmButtonColor: "#7c3aed",
    });

    if (result.isConfirmed) {
      navigate("/certificados");
    }
  };

  return (
    <main className="course-view">
      <div className="course-view-topbar">
        <div>
          <Link to="/cursos" className="course-view-back">
            ← Catálogo
          </Link>
          <h1 className="course-view-title">
            {course.name}
            {completed && <span className="course-view-badge-done">Finalizado</span>}
          </h1>
          <p className="course-view-subtitle">
            {course.category} · {course.level} · Profesor:{" "}
            {course.createdBy || course.instructor}
          </p>
        </div>
        <div className="course-view-user">
          <UserCircle size={22} />
          <span>Hola, {usuario?.nombre || "estudiante"}</span>
        </div>
      </div>

      <div className="course-view-layout">
        <CourseSidebar
          course={course}
          currentLesson={currentLesson}
          setCurrentLesson={setCurrentLesson}
        />
        <CourseContent
          lesson={currentLesson}
          courseName={course.name}
          isCompleted={completed}
          onFinishCourse={handleFinishCourse}
          finishing={finishing}
        />
      </div>
    </main>
  );
}

export default function Vista() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("curso") || "python";
  const course = useMemo(() => getCourseById(courseId), [courseId]);
  const usuario = getCurrentUser();

  return (
    <PlanGuard access="course" courseName={course.name}>
      <VistaContent course={course} usuario={usuario} />
    </PlanGuard>
  );
}
