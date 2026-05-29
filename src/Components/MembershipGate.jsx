import { Link } from "react-router-dom";
import {
  Lock,
  LogIn,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Award,
  MessageCircle,
  LayoutDashboard,
} from "lucide-react";

const GATE_CONTENT = {
  blogs: {
    badge: "Sesión requerida",
    title: "El blog no está disponible sin iniciar sesión",
    text: "Esta función requiere una cuenta. Inicia sesión o regístrate gratis para leer artículos, guías y novedades de Knowly.",
    primary: { to: "/login", label: "Iniciar sesión", icon: LogIn },
    back: { to: "/", label: "Volver al inicio" },
  },
  vista: {
    badge: "Acceso al curso",
    title: "Inicia sesión y adquiere una membresía",
    text: "El catálogo de cursos está disponible para todos. Para acceder a las lecciones, videos y certificación de este curso, inicia sesión y elige un plan de estudiante.",
    showCourse: true,
    primary: { to: "/login", label: "Iniciar sesión", icon: LogIn },
    secondary: { to: "/estudiantes", label: "Ver membresías", icon: GraduationCap, outline: true },
    back: { to: "/cursos", label: "Volver al catálogo" },
  },
  certificados: {
    badge: "Sesión requerida",
    title: "Los certificados requieren iniciar sesión",
    text: "Esta función no está disponible sin una cuenta. Inicia sesión para consultar y descargar tus certificados acreditados.",
    primary: { to: "/login", label: "Iniciar sesión", icon: LogIn },
    back: { to: "/home", label: "Volver al inicio" },
  },
  contacto: {
    badge: "Sesión requerida",
    title: "La comunidad requiere iniciar sesión",
    text: "Para participar en reseñas, contacto y la comunidad de Knowly, necesitas una cuenta activa.",
    primary: { to: "/login", label: "Iniciar sesión", icon: LogIn },
    back: { to: "/home", label: "Volver al inicio" },
  },
  profesor: {
    badge: "Sesión requerida",
    title: "El panel de profesor requiere iniciar sesión",
    text: "Accede con tu cuenta de profesor para gestionar y publicar cursos en la plataforma.",
    primary: { to: "/login", label: "Iniciar sesión como profesor", icon: LogIn },
    back: { to: "/home", label: "Volver al inicio" },
  },
  default: {
    badge: "Sesión requerida",
    title: "Esta sección requiere iniciar sesión",
    text: "Inicia sesión o crea una cuenta para continuar.",
    primary: { to: "/login", label: "Iniciar sesión", icon: LogIn },
    back: { to: "/home", label: "Volver al inicio" },
  },
};

const FEATURE_ICONS = {
  blogs: BookOpen,
  vista: GraduationCap,
  certificados: Award,
  contacto: MessageCircle,
  profesor: LayoutDashboard,
};

export default function MembershipGate({ feature = "default", courseName }) {
  const content = GATE_CONTENT[feature] || GATE_CONTENT.default;
  const PrimaryIcon = content.primary.icon;
  const SecondaryIcon = content.secondary?.icon;
  const HeaderIcon = FEATURE_ICONS[feature] || Lock;

  return (
    <div className="membership-gate">
      <div className="membership-gate-card">
        <div className="membership-gate-icon">
          <HeaderIcon size={36} />
        </div>
        <span className="membership-gate-badge">{content.badge}</span>
        <h1>{content.title}</h1>
        {content.showCourse && courseName && (
          <p className="membership-gate-course">
            Curso: <strong>{courseName}</strong>
          </p>
        )}
        <p className="membership-gate-text">{content.text}</p>
        <div className="membership-gate-actions">
          <Link to={content.primary.to} className="landing-btn landing-btn--primary">
            <PrimaryIcon size={18} />
            {content.primary.label}
          </Link>
          {content.secondary && (
            <Link
              to={content.secondary.to}
              className={`landing-btn${content.secondary.outline ? " landing-btn--outline" : ""}`}
            >
              {SecondaryIcon && <SecondaryIcon size={18} />}
              {content.secondary.label}
            </Link>
          )}
          {!content.secondary && (
            <Link to="/login" className="landing-btn landing-btn--outline">
              Crear cuenta gratis
            </Link>
          )}
          <Link to={content.back.to} className="membership-gate-back">
            <ArrowRight size={16} style={{ transform: "rotate(180deg)" }} />
            {content.back.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
