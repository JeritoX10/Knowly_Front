import { Link } from "react-router-dom";
import { Sparkles, ArrowUpCircle, BookOpen } from "lucide-react";

export default function UpgradeGate({ feature = "default", userRol = "estudiante", courseName }) {
  const target =
    userRol === "profesor"
      ? "/profesores"
      : "/estudiantes";

  const messages = {
    cursos: "el catálogo completo de cursos",
    certificados: "tus certificados acreditados",
    contacto: "la comunidad y las reseñas",
    vista: "las lecciones y videos de este curso",
    profesor: "el panel para publicar cursos",
    default: "esta sección premium",
  };

  const label = messages[feature] || messages.default;

  return (
    <div className="upgrade-gate">
      <div className="upgrade-gate-card">
        <div className="upgrade-gate-icon">
          <ArrowUpCircle size={40} />
        </div>
        <span className="upgrade-gate-badge">
          <Sparkles size={14} /> Plan gratuito
        </span>
        <h1>Mejora tu plan para continuar</h1>
        {courseName && feature === "vista" && (
          <p className="upgrade-gate-course">
            Quieres acceder a <strong>{courseName}</strong>
          </p>
        )}
        <p className="upgrade-gate-text">
          {feature === "vista" ? (
            <>
              Con el plan <strong>Gratuito</strong> puedes explorar el catálogo, pero para ver{" "}
              <strong>{label}</strong> necesitas adquirir una membresía de pago.
            </>
          ) : (
            <>
              Con el plan <strong>Gratuito</strong> puedes leer el blog y explorar cursos. Para
              acceder a <strong>{label}</strong>, elige una membresía de pago.
            </>
          )}
        </p>
        <div className="upgrade-gate-actions">
          <Link to={target} className="landing-btn landing-btn--primary">
            Ver planes y precios
          </Link>
          <Link to="/blogs" className="landing-btn landing-btn--outline">
            <BookOpen size={18} /> Ir al blog
          </Link>
        </div>
        <p className="upgrade-gate-hint">
          ¿Ya pagaste?{" "}
          <Link to={`/pago?tipo=${userRol}`}>Completar pago</Link>
        </p>
      </div>
    </div>
  );
}
