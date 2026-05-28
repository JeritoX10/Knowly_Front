import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { GraduationCap, UserRound, UserPlus, LogIn, Sparkles } from "lucide-react";
import { redirect } from "../Helpers/alerts";
import { saveLocalStorage, getLocalStorage } from "../Helpers/local-storage";
import { findUserForLogin, registerUser, persistLocalUser } from "../Helpers/auth-service";
import { FREE_PLAN_ID } from "../Helpers/plan-access";
import { parseCheckoutParams, buildPagoUrl } from "../Helpers/checkout-flow";
import { getPlanById } from "../data/memberships";
import Footer from "../Components/Footer";
import { KNOWLY_LOGO } from "../Helpers/branding";

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const checkout = parseCheckoutParams(searchParams);
  const pendingPlan = checkout ? getPlanById(checkout.planId, checkout.tipo) : null;

  const initialModo = searchParams.get("modo") === "login" ? "login" : "register";
  const initialRol = checkout?.tipo === "profesor" ? "profesor" : "estudiante";

  const [modo, setModo] = useState(initialModo);
  const [rol, setRol] = useState(initialRol);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasea, setContrasea] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [apiOk, setApiOk] = useState(null);

  useEffect(() => {
    const sesion = getLocalStorage("Usuario");
    if (sesion && checkout) {
      navigate(buildPagoUrl(checkout.planId, checkout.tipo), { replace: true });
    }
  }, [checkout, navigate]);

  function afterAuthSuccess(user) {
    if (checkout && pendingPlan) {
      redirect(
        `Cuenta lista. Continúa con el pago del plan ${pendingPlan.title}.`,
        buildPagoUrl(checkout.planId, checkout.tipo),
        "success"
      );
      return;
    }
    if (user.rol === "profesor") {
      redirect(`${user.nombre}, bienvenido`, "/profesor", "success");
    } else {
      redirect(`${user.nombre}, bienvenido a Knowly`, "/home", "success");
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setCargando(true);
    setError(null);
    try {
      const usuario = await findUserForLogin(correo, contrasea);
      if (usuario) {
        const sesion = {
          ...usuario,
          rol: usuario.rol || rol,
        };
        persistLocalUser(sesion);
        saveLocalStorage("Usuario", sesion);
        setApiOk(true);
        afterAuthSuccess(sesion);
      } else {
        setError("Correo o contraseña incorrectos.");
      }
    } catch (err) {
      setApiOk(false);
      setError(`No se pudo conectar con la API: ${err.message}`);
    } finally {
      setCargando(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (contrasea !== confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (contrasea.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setCargando(true);
    setError(null);
    try {
      const user = await registerUser({
        nombre,
        correo,
        contrasea,
        rol,
        planId: FREE_PLAN_ID,
      });
      saveLocalStorage("Usuario", user);
      setApiOk(true);
      if (checkout && pendingPlan) {
        afterAuthSuccess(user);
      } else {
        redirect(
          `Cuenta creada. Plan gratuito activo — puedes leer el blog y explorar cursos.`,
          "/blogs",
          "success"
        );
      }
    } catch (err) {
      setApiOk(false);
      setError(`Error al registrar: ${err.message}`);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="app login-page">
      <header className="login-topbar">
        <Link to="/" className="login-logo-link" title="Volver al inicio">
          <img src={KNOWLY_LOGO} alt="Knowly" />
        </Link>
      </header>
      <section className="Login">
        <div className="login-container login-container--wide">
          {pendingPlan && (
            <div className="login-checkout-banner">
              <Sparkles size={18} />
              <div>
                <strong>Plan seleccionado: {pendingPlan.title}</strong>
                <p>
                  {modo === "register"
                    ? "Crea tu cuenta para continuar al pago. La membresía quedará vinculada a tu perfil."
                    : "Inicia sesión para continuar al pago de tu membresía."}
                </p>
              </div>
            </div>
          )}

          <div className="login-mode-tabs">
            <button
              type="button"
              className={`login-mode-tab${modo === "login" ? " login-mode-tab--active" : ""}`}
              onClick={() => {
                setModo("login");
                setError(null);
              }}
            >
              <LogIn size={18} /> Iniciar sesión
            </button>
            <button
              type="button"
              className={`login-mode-tab${modo === "register" ? " login-mode-tab--active" : ""}`}
              onClick={() => {
                setModo("register");
                setError(null);
              }}
            >
              <UserPlus size={18} /> Registrarse
            </button>
          </div>

          <div className="login-role-tabs">
            <button
              type="button"
              className={`login-role-tab${rol === "estudiante" ? " login-role-tab--active" : ""}`}
              onClick={() => setRol("estudiante")}
              disabled={Boolean(checkout)}
            >
              <GraduationCap size={20} /> Estudiante
            </button>
            <button
              type="button"
              className={`login-role-tab${rol === "profesor" ? " login-role-tab--active" : ""}`}
              onClick={() => setRol("profesor")}
              disabled={Boolean(checkout)}
            >
              <UserRound size={20} /> Profesor
            </button>
          </div>

          <p className="login-role-hint">
            {pendingPlan
              ? modo === "register"
                ? `Regístrate como ${checkout.tipo === "profesor" ? "profesor" : "estudiante"} y luego completa el pago.`
                : "Si ya tienes cuenta, inicia sesión para pagar tu plan."
              : modo === "register"
                ? "Al registrarte obtienes el plan Gratuito. Puedes mejorar tu membresía cuando quieras."
                : rol === "profesor"
                  ? "Accede al panel docente con tu membresía."
                  : "Accede a cursos según tu plan activo."}
          </p>

          {apiOk === false && (
            <div className="login-api-warn">
              La API MockAPI no respondió; se usó respaldo local si aplica.
            </div>
          )}

          {error && <div className="login-error">⚠️ {error}</div>}

          {modo === "login" ? (
            <form className="login-form" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Correo"
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                required
                value={contrasea}
                onChange={(e) => setContrasea(e.target.value)}
              />
              <button className="btn-primary" type="submit" disabled={cargando}>
                {cargando
                  ? "Conectando..."
                  : pendingPlan
                    ? "Iniciar sesión y continuar al pago"
                    : "Entrar"}
              </button>
            </form>
          ) : (
            <form className="login-form" onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Nombre completo"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                type="email"
                placeholder="Correo"
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña (mín. 6 caracteres)"
                required
                value={contrasea}
                onChange={(e) => setContrasea(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirmar contraseña"
                required
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
              />
              <button className="btn-primary" type="submit" disabled={cargando}>
                {cargando
                  ? "Creando cuenta..."
                  : pendingPlan
                    ? "Crear cuenta y continuar al pago"
                    : "Crear cuenta gratis"}
              </button>
            </form>
          )}

          {!pendingPlan && (
            <p className="login-free-note">
              Plan gratuito: <Link to="/blogs">blog</Link> y explorar{" "}
              <Link to="/cursos">cursos</Link> (las lecciones requieren plan de pago).{" "}
              <Link to="/estudiantes">Ver planes de pago</Link>
            </p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Login;
