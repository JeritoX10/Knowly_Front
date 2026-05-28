import { Link, useSearchParams } from "react-router-dom";
import { Check, UserRound, Upload, Clock } from "lucide-react";
import { teacherMemberships } from "../data/memberships";
import { planCtaUrl } from "../Helpers/checkout-flow";

export default function Profesores() {
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get("plan");

  return (
    <div className="membership-page membership-page--teachers">
      <header className="membership-page-header">
        <UserRound size={36} className="membership-page-icon" />
        <h1>Membresías para profesores</h1>
        <p>
          Publica y vende tus cursos en Knowly. El límite de publicación depende de cuántos cursos
          y horas de video puedes subir cada mes.
        </p>
        <p className="membership-page-note">
          Crea tu cuenta de profesor antes de elegir un plan. Tras el pago, tu membresía queda
          guardada en tu perfil.
        </p>
      </header>

      <div className="membership-limits-banner">
        <Upload size={22} />
        <p>
          <strong>¿Cómo funcionan los límites?</strong> Cada mes puedes publicar hasta X cursos
          nuevos y un total de Y horas de contenido en video. Los cursos ya publicados no cuentan
          contra el límite al actualizarlos.
        </p>
      </div>

      <div className="membership-plans-grid membership-plans-grid--two">
        {teacherMemberships.map((plan) => (
          <article
            key={plan.id}
            id={plan.id}
            className={`membership-plan-card${plan.highlighted ? " membership-plan-card--featured" : ""}${highlightId === plan.id ? " membership-plan-card--highlight" : ""}`}
          >
            {plan.highlighted && <span className="membership-plan-badge">Recomendado</span>}
            <h2>{plan.title}</h2>
            <div className="membership-plan-price">
              <span className="amount">{plan.price}</span>
              <span className="period">/{plan.period}</span>
            </div>
            <p className="membership-plan-desc">{plan.desc}</p>

            <div className="membership-limits-pills">
              <span>
                <Upload size={14} /> {plan.coursesPerMonth} cursos/mes
              </span>
              <span>
                <Clock size={14} /> {plan.hoursPerMonth} h de video/mes
              </span>
            </div>

            <ul className="membership-benefits">
              {plan.benefits.map((b) => (
                <li key={b}>
                  <Check size={16} />
                  {b}
                </li>
              ))}
            </ul>
            <Link to={planCtaUrl(plan, "profesor")} className="plan-cta">
              Elegir {plan.title}
            </Link>
          </article>
        ))}
      </div>

      <p className="membership-page-footer">
        ¿Quieres aprender? <Link to="/estudiantes">Ver membresías de estudiantes</Link>
      </p>
    </div>
  );
}
