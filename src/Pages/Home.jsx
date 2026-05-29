import { Link } from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  Award,
  Upload,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Mail,
  Check, // Added Check icon for PlanCard
  Users,
} from "lucide-react";
import { studentMemberships, teacherMemberships } from "../data/memberships";
import { planCtaUrl } from "../Helpers/checkout-flow";
import { KNOWLY_LOGO } from "../Helpers/branding";

const studentPlans = studentMemberships;
const teacherPlans = teacherMemberships; // Define teacherPlans here

// Define PlanCard component outside Home
function PlanCard({ plan, tipo = "estudiante" }) {
  const ctaTo = planCtaUrl(plan, tipo);

  return (
    <article
      className="membership-plan-card" // Using a class from the inline style block
      style={{
        background: "rgba(255, 255, 255, 0.4)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        borderRadius: "24px",
        padding: "28px",
        transition: "all 0.3s ease",
        backdropFilter: "blur(12px)",
      }}
    >
      <h3 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "12px", color: "#18181B" }}>{plan.title}</h3>
      <div style={{ fontSize: "36px", fontWeight: "800", color: "#1D4ED8", marginBottom: "16px" }}>
        {plan.price}
        <small style={{ fontSize: "16px", fontWeight: "500", color: "#4B5563" }}>/{plan.period}</small>
      </div>
      <p style={{ fontSize: "15px", color: "#4B5563", marginBottom: "24px" }}>{plan.desc}</p>
      <ul style={{ listStyle: "none", padding: 0, marginBottom: "24px" }}>
        {plan.benefits.map((benefit, index) => (
          <li key={index} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#18181B", marginBottom: "8px" }}>
            <Check size={16} style={{ color: "#22c55e" }} /> {benefit}
          </li>
        ))}
      </ul>
      <Link to={ctaTo} className="btn-primary" style={{ width: "100%" }}>
        Elegir {plan.title}
      </Link>
    </article>
  );
}

function Home() {
  const exploreLinks = [
    { to: "/cursos", label: "Explorar cursos", desc: "Mira el catálogo sin registrarte" },
    { to: "/blogs", label: "Leer blogs", desc: "Artículos y novedades educativas" },
    { to: "/contacto", label: "Comunidad", desc: "Reseñas y opiniones de usuarios" },
    { to: "/certificados", label: "Certificados", desc: "Conoce nuestro sistema de acreditación" },
  ];

  const developers = [
    { name: "Juan José Castrillón", role: "Desarrollo frontend" },
    { name: "Johan Cadavid", role: "Desarrollo backend" },
    { name: "Jerónimo Taborda", role: "Integración y UI" },
    { name: "Sebastián Herrera", role: "Arquitectura" },
    { name: "Sharon Asprilla", role: "Diseño y QA" },
  ];

  // Removed the inline <style> block and duplicate <nav> from Home component
  // The main App.jsx already renders NavBar and global styles should be in App.css or index.css

  // Use KNOWLY_LOGO instead of undefined 'logo'
  // Removed scrollY dependency as it's not defined in this scope and NavBar is handled by App.jsx

  return (
    <div className="main" style={{
      fontFamily: "'Outfit', 'Segoe UI', sans-serif",
      background: "linear-gradient(90deg, rgb(165, 110, 245) 0%, rgb(180, 130, 250) 25%, rgb(220, 195, 255) 50%, rgb(180, 130, 250) 75%, rgb(165, 110, 245) 100%)",
      color: "#18181B",
      overflowX: "hidden"
    }}>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "100px 24px",
        position: "relative",
      }}>
        <div style={{ animation: "fadeUp 1s ease forwards", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          <img
            src={KNOWLY_LOGO}
            alt="Knowly Logo"
            style={{ width: 180, height: 180, marginBottom: 20, filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.1))" }}
          />

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255, 255, 255, 0.5)",
            borderRadius: 999, padding: "6px 16px",
            fontSize: 13, fontWeight: 600, color: "#1e40af",
            marginBottom: 24,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8", display: "inline-block", /* animation: "pulse-ring 1.5s infinite" */ }} />
            Plataforma educativa #1 en LATAM
          </div>
          <p className="landing-subtitle">
            La plataforma donde profesores publican y venden cursos, y estudiantes acceden a
            contenido certificado con estándares rigurosos de calidad.
          </p>
          <div className="landing-hero-actions">
            <Link to="/cursos" className="landing-btn landing-btn--primary">
              Explorar cursos <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="landing-btn landing-btn--outline">Iniciar sesión</Link>
          </div>
        </div>
      </section>

      <section className="landing-section landing-about" id="nosotros">
        <div className="landing-container">
          <header className="landing-section-header">
            <h2>¿Qué es Knowly?</h2>
            <p>
              Knowly es una plataforma de compra y subida de cursos pensada para profesores y
              estudiantes. Los docentes crean, publican y monetizan su contenido; los estudiantes
              adquieren formación acreditada, evaluada y respaldada por un sello de calidad.
            </p>
          </header>
          <div className="landing-about-grid">
            <article className="landing-about-card">
              <div className="landing-icon-wrap"><Upload size={26} /></div>
              <h3>Para profesores</h3>
              <p>Sube tus cursos y llega a miles de estudiantes con una membresía docente. Knowly revisa la calidad para mantener estándares acreditados.</p>
            </article>
            <article className="landing-about-card">
              <div className="landing-icon-wrap"><BookOpen size={26} /></div>
              <h3>Para estudiantes</h3>
              <p>Compra cursos con confianza: contenido estructurado, evaluaciones claras y certificados que respaldan tu aprendizaje.</p>
            </article>
            <article className="landing-about-card">
              <div className="landing-icon-wrap"><Award size={26} /></div>
              <h3>Cursos acreditados</h3>
              <p>Cada curso pasa por un proceso de calidad. Solo se publica contenido que cumple criterios pedagógicos y técnicos de excelencia.</p>
            </article>
          </div>
          <div className="landing-trust">
            <ShieldCheck size={22} />
            <span>Certificación Knowly · Alta calidad · Comunidad verificada</span>
            <Sparkles size={20} className="landing-trust-spark" />
          </div>
        </div>
      </section>

      <section className="landing-section landing-explore">
        <div className="landing-container">
          <header className="landing-section-header landing-section-header--light">
            <h2>Explora sin registrarte</h2>
            <p>Navega por las secciones públicas y descubre todo lo que Knowly ofrece.</p>
          </header>
          <div className="landing-explore-grid">
            {exploreLinks.map((item) => (
              <Link key={item.to} to={item.to} className="landing-explore-card">
                <GraduationCap size={22} />
                <div>
                  <strong>{item.label}</strong>
                  <span>{item.desc}</span>
                </div>
                <ArrowRight size={18} className="landing-explore-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section landing-pricing" id="precios">
        <div className="landing-container">
          <header className="landing-section-header">
            <h2>Membresías para estudiantes</h2>
            <p>Elige el plan que mejor se adapte a tu ritmo de aprendizaje.</p>
          </header>
          <div className="landing-plans-grid">
            {studentPlans.map((plan) => (
              <PlanCard key={plan.title} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section landing-pricing landing-pricing--teachers">
        <div className="landing-container">
          <header className="landing-section-header">
            <h2>Membresías para profesores</h2>
            <p>Publica, vende y gestiona tus cursos con herramientas diseñadas para docentes.</p>
          </header>
          <div className="landing-plans-grid">
            {teacherPlans.map((plan) => (
              <PlanCard key={plan.title} plan={plan} tipo="profesor" />
            ))}
          </div>
          <p className="landing-pricing-note">
            ¿Ya tienes cuenta? <Link to="/estudiantes">Ver detalle de planes estudiantiles</Link> ·{" "}
            <Link to="/profesores">Ver membresías docentes</Link>
          </p>
        </div>
      </section>

      <section className="landing-cta">
        <div className="landing-container landing-cta-inner">
          <h2>¿Listo para empezar?</h2>
          <p>Únete a Knowly hoy: aprende con cursos acreditados o comparte tu conocimiento.</p>
          <div className="landing-hero-actions">
            <Link to="/login" className="landing-btn landing-btn--light">Crear cuenta / Acceder</Link>
            <Link to="/cursos" className="landing-btn landing-btn--ghost">Ver catálogo</Link>
          </div>
        </div>
      </section>

      <section className="landing-section landing-contact" id="contacto">
        <div className="landing-container">
          <header className="landing-section-header landing-section-header--light">
            <h2>Contacto y equipo</h2>
            <p>Conoce al equipo detrás de Knowly.</p>
          </header>
          <div className="landing-contact-grid">
            <div className="landing-contact-info">
              <h3><Mail size={20} /> Escríbenos</h3>
              <p>¿Dudas sobre membresías, cursos o certificaciones? Contáctanos.</p>
              <a href="mailto:contacto@knowly.edu" className="landing-contact-email">contacto@knowly.edu</a>
              <div className="landing-social">
                <a href="#facebook">Facebook</a>
                <a href="#instagram">Instagram</a>
                <a href="#twitter">Twitter</a>
              </div>
            </div>
            <div className="landing-devs">
              <h3><Users size={20} /> Equipo de desarrollo</h3>
              <ul className="landing-devs-list">
                {developers.map((dev) => (
                  <li key={dev.name}>
                    <span className="landing-dev-name">{dev.name}</span>
                    <span className="landing-dev-role">{dev.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
