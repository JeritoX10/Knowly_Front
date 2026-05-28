import { Link, useSearchParams } from "react-router-dom";
import { Check, GraduationCap } from "lucide-react";
import { studentMemberships } from "../data/memberships";
import { planCtaUrl } from "../Helpers/checkout-flow";

export default function Estudiantes() {
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get("plan");

  return (
    <div className="membership-page">
      <header className="membership-page-header">
        <GraduationCap size={36} className="membership-page-icon" />
        <h1>Membresías para estudiantes</h1>
        <p>
          Elige el plan que se adapte a tu ritmo. Todos incluyen certificación Knowly y acceso a
          nuestra comunidad de aprendizaje.
        </p>
        <p className="membership-page-note">
          Para contratar un plan de pago, primero crea tu cuenta. La membresía quedará asociada a
          tu perfil de forma permanente.
        </p>
      </header>

      <div className="membership-plans-grid">
        {studentMemberships.map((plan) => (
          <article
            key={plan.id}
            id={plan.id}
            className={`membership-plan-card${plan.highlighted ? " membership-plan-card--featured" : ""}${highlightId === plan.id ? " membership-plan-card--highlight" : ""}`}
          >
            {plan.highlighted && <span className="membership-plan-badge">Más popular</span>}
            <h2>{plan.title}</h2>
            <div className="membership-plan-price">
              <span className="amount">{plan.price}</span>
              <span className="period">/{plan.period}</span>
            </div>
            <p className="membership-plan-desc">{plan.desc}</p>
            <ul className="membership-benefits">
              {plan.benefits.map((b) => (
                <li key={b}>
                  <Check size={16} />
                  {b}
                </li>
              ))}
            </ul>
            <Link to={planCtaUrl(plan, "estudiante")} className="plan-cta">
              {plan.isFree ? "Registrarse gratis" : `Elegir ${plan.title}`}
            </Link>
          </article>
        ))}
      </div>

      <p className="membership-page-footer">
        ¿Eres profesor?{" "}
        <Link to="/profesores">Ver membresías docentes</Link>
      </p>
    </div>
  );
}
