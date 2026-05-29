import { Link } from "react-router-dom";
import { CheckCircle, PlayCircle, Award, PartyPopper } from "lucide-react";

export default function CourseContent({
  lesson,
  courseName,
  isCompleted,
  onFinishCourse,
  finishing,
}) {
  if (!lesson) return null;

  return (
    <section className="course-content">
      <div className="course-content-card">
        <header className="course-content-header">
          <div>
            <p className="course-content-breadcrumb">{courseName}</p>
            <h2>{lesson.title}</h2>
          </div>
          {isCompleted ? (
            <div className="course-content-finished">
              <Award size={22} />
              <span>Curso finalizado</span>
              <Link to="/certificados" className="course-content-finished-link">
                Ver diploma
              </Link>
            </div>
          ) : (
            <button
              type="button"
              className="course-content-complete"
              title="Finalizar curso y obtener tu diploma"
              onClick={onFinishCourse}
              disabled={finishing}
            >
              {finishing ? (
                <>
                  <CheckCircle size={22} className="course-content-complete-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <PartyPopper size={22} />
                  <span>Finalizar curso</span>
                </>
              )}
            </button>
          )}
        </header>

        <div className="course-content-video">
          <div className="course-content-video-badge">
            <PlayCircle size={18} />
            Lección en video
          </div>
          <div className="course-content-video-frame">
            <iframe src={lesson.video} title={lesson.title} allowFullScreen />
          </div>
        </div>

        <div className="course-content-description">
          <h3>Acerca de esta lección</h3>
          <p>{lesson.description}</p>
          {!isCompleted && (
            <p className="course-content-finish-hint">
              Cuando termines de revisar el contenido, pulsa <strong>Finalizar curso</strong> para
              generar tu diploma acreditado Knowly.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
