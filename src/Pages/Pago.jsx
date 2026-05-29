import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams, Navigate } from "react-router-dom";
import {
  CreditCard,
  Check,
  Shield,
  ArrowLeft,
  Lock,
  User,
  Mail,
} from "lucide-react";
import { getPlanById } from "../data/memberships";
import { getLocalStorage, saveLocalStorage } from "../Helpers/local-storage";
import { updateUserMembership } from "../Helpers/auth-service";
import { redirect } from "../Helpers/alerts";
import { buildLoginForPlan } from "../Helpers/checkout-flow";

const STEPS = ["Resumen", "Pago", "Confirmación"];

export default function Pago() {
  const [searchParams] = useSearchParams();
  const planId = searchParams.get("plan");
  const tipo = searchParams.get("tipo") || "estudiante";

  const plan = useMemo(() => getPlanById(planId, tipo), [planId, tipo]);
  const usuario = getLocalStorage("Usuario");

  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [cardName, setCardName] = useState(usuario?.nombre || "");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [email, setEmail] = useState(usuario?.correo || "");

  useEffect(() => {
    if (usuario?.nombre) setCardName(usuario.nombre);
    if (usuario?.correo) setEmail(usuario.correo);
  }, [usuario?.nombre, usuario?.correo]);

  if (!plan || plan.isFree) {
    return (
      <div className="payment-page">
        <div className="payment-empty">
          <h1>Selecciona un plan de pago</h1>
          <p>El plan gratuito no requiere pago. Elige un plan con precio para continuar.</p>
          <Link
            to={tipo === "profesor" ? "/profesores" : "/estudiantes"}
            className="landing-btn landing-btn--primary"
          >
            Ver planes
          </Link>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to={buildLoginForPlan(plan.id, tipo)} replace />;
  }

  const formatCard = (value) => {
    const v = value.replace(/\D/g, "").slice(0, 16);
    return v.replace(/(.{4})/g, "$1 ").trim();
  };

  const applyMembership = async () => {
    await updateUserMembership(usuario.correo, { planId: plan.id, rol: tipo });
    const updated = { ...usuario, planId: plan.id, rol: tipo };
    saveLocalStorage("Usuario", updated);
  };

  const handlePay = async (e) => {
    e.preventDefault();
    if (step === 0) {
      setStep(1);
      return;
    }
    if (step === 1) {
      setProcessing(true);
      setTimeout(async () => {
        await applyMembership();
        setProcessing(false);
        setStep(2);
      }, 1800);
    }
  };

  const finish = () => {
    const dest = tipo === "profesor" ? "/profesor" : "/cursos";
    redirect(`¡Plan ${plan.title} activado en tu cuenta!`, dest, "success");
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <Link
          to={tipo === "profesor" ? "/profesores" : "/estudiantes"}
          className="payment-back"
        >
          <ArrowLeft size={18} /> Volver a planes
        </Link>

        <div className="payment-steps">
          {STEPS.map((label, i) => (
            <div
              key={label}
              className={`payment-step${i <= step ? " payment-step--active" : ""}${i < step ? " payment-step--done" : ""}`}
            >
              <span className="payment-step-num">{i < step ? <Check size={14} /> : i + 1}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="payment-layout">
          <aside className="payment-summary-card">
            <h2>Resumen del pedido</h2>
            <p className="payment-account-line">
              Cuenta: <strong>{usuario.nombre}</strong> · {usuario.correo}
            </p>
            <div className="payment-plan-box">
              <span className="payment-plan-type">{tipo === "profesor" ? "Profesor" : "Estudiante"}</span>
              <strong>{plan.title}</strong>
              <p>{plan.desc}</p>
            </div>
            <ul className="payment-benefits-mini">
              {plan.benefits.slice(0, 4).map((b) => (
                <li key={b}>
                  <Check size={14} /> {b}
                </li>
              ))}
            </ul>
            <div className="payment-total">
              <span>Total</span>
              <strong>
                {plan.price}
                <small>/{plan.period}</small>
              </strong>
            </div>
            <p className="payment-secure">
              <Shield size={16} /> Pago simulado seguro · Knowly
            </p>
          </aside>

          <div className="payment-form-card">
            {step === 0 && (
              <>
                <h2>Confirma tu plan</h2>
                <p>
                  Al completar el pago, el plan <strong>{plan.title}</strong> quedará asociado de
                  forma permanente a tu cuenta.
                </p>
                <ul className="payment-benefits-full">
                  {plan.benefits.map((b) => (
                    <li key={b}>
                      <Check size={16} /> {b}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="landing-btn landing-btn--primary payment-submit"
                  onClick={() => setStep(1)}
                >
                  Continuar al pago
                </button>
              </>
            )}

            {step === 1 && (
              <form onSubmit={handlePay}>
                <h2>
                  <CreditCard size={22} /> Datos de pago
                </h2>
                <p className="payment-form-hint">Simulación educativa — no se realizará un cargo real.</p>

                <label className="payment-field">
                  <Mail size={16} />
                  <input
                    type="email"
                    placeholder="Correo de facturación"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <label className="payment-field">
                  <User size={16} />
                  <input
                    type="text"
                    placeholder="Nombre en la tarjeta"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                  />
                </label>
                <label className="payment-field">
                  <CreditCard size={16} />
                  <input
                    type="text"
                    placeholder="Número de tarjeta"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCard(e.target.value))}
                    maxLength={19}
                    required
                  />
                </label>
                <div className="payment-field-row">
                  <label className="payment-field">
                    <input
                      type="text"
                      placeholder="MM/AA"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      maxLength={5}
                      required
                    />
                  </label>
                  <label className="payment-field">
                    <Lock size={16} />
                    <input
                      type="text"
                      placeholder="CVC"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      required
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="landing-btn landing-btn--primary payment-submit"
                  disabled={processing}
                >
                  {processing ? "Procesando..." : `Pagar ${plan.price}`}
                </button>
                <button type="button" className="payment-back-btn" onClick={() => setStep(0)}>
                  Atrás
                </button>
              </form>
            )}

            {step === 2 && (
              <div className="payment-success">
                <div className="payment-success-icon">
                  <Check size={48} />
                </div>
                <h2>¡Pago completado!</h2>
                <p>
                  Tu plan <strong>{plan.title}</strong> está activo para{" "}
                  <strong>{usuario.nombre}</strong>. La membresía se guardó en tu cuenta y se
                  mantendrá al volver a iniciar sesión.
                </p>
                <button
                  type="button"
                  className="landing-btn landing-btn--primary payment-submit"
                  onClick={finish}
                >
                  Empezar a usar Knowly
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
