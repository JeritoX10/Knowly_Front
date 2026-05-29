import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import PlanGuard from "../Components/PlanGuard";
import {
  Award,
  Download,
  ShieldCheck,
  Calendar,
  Star,
  Search,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Trophy,
} from "lucide-react";
import { getCurrentUser } from "../Helpers/plan-access";
import {
  getCertificatesForUser,
  getCompletionStats,
  COMPLETION_EVENT,
} from "../Helpers/course-completion";

function Certificados() {
  const userKey = getCurrentUser()?.correo ?? "";
  const [certificates, setCertificates] = useState(() =>
    getCertificatesForUser(getCurrentUser())
  );
  const [query, setQuery] = useState("");

  useEffect(() => {
    const refresh = () => setCertificates(getCertificatesForUser(getCurrentUser()));
    refresh();
    window.addEventListener(COMPLETION_EVENT, refresh);
    return () => window.removeEventListener(COMPLETION_EVENT, refresh);
  }, [userKey]);

  const stats = useMemo(() => getCompletionStats(certificates), [certificates]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return certificates;
    return certificates.filter(
      (c) =>
        (c.courseName ?? "").toLowerCase().includes(q) ||
        (c.code ?? "").toLowerCase().includes(q) ||
        (c.instructor ?? "").toLowerCase().includes(q)
    );
  }, [certificates, query]);

  const handleDownload = (cert) => {
    window.alert(
      `Descarga simulada del diploma:\n${cert.courseName}\nCódigo: ${cert.code}`
    );
  };

  const handleVerify = (cert) => {
    window.alert(`Diploma verificado ✓\nCódigo ${cert.code} es válido en Knowly.`);
  };

  return (
    <PlanGuard access="premium" feature="certificados">
      <div className="certificates-page">
        <header className="certificates-hero">
          <div className="certificates-hero-text">
            <span className="certificates-badge">
              <ShieldCheck size={16} /> Acreditación Knowly
            </span>
            <h1>Mis certificados</h1>
            <p>
              Credenciales digitales verificables que respaldan tu formación. Cada certificado
              incluye código único para que empleadores validen su autenticidad.
            </p>
          </div>
          <div className="certificates-stats">
            <div className="certificates-stat">
              <Award size={28} />
              <strong>{stats.count}</strong>
              <span>Obtenidos</span>
            </div>
            <div className="certificates-stat">
              <Star size={28} />
              <strong>{stats.average}</strong>
              <span>Promedio</span>
            </div>
            <div className="certificates-stat">
              <GraduationCap size={28} />
              <strong>{stats.totalHours}</strong>
              <span>Certificadas</span>
            </div>
          </div>
        </header>

        <div className="certificates-toolbar">
          <div className="certificates-search">
            <Search size={18} />
            <input
              type="search"
              placeholder="Buscar por curso o código..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={!certificates.length}
            />
          </div>
          <Link to="/cursos" className="landing-btn landing-btn--outline certificates-cta-link">
            Explorar cursos
          </Link>
        </div>

        {certificates.length === 0 ? (
          <div className="certificates-empty">
            <div className="certificates-empty-icon">
              <Trophy size={56} />
            </div>
            <span className="certificates-empty-badge">
              <Sparkles size={14} /> Tu primera meta te espera
            </span>
            <h2>Aún no has completado ningún curso</h2>
            <p>
              Cuando finalices un curso desde la vista de lecciones, tu diploma aparecerá aquí de
              forma automática. Cada certificado demuestra las horas que invertiste y valida tu
              aprendizaje ante empleadores.
            </p>
            <ul className="certificates-empty-tips">
              <li>Elige un curso que te inspire en el catálogo</li>
              <li>Revisa las lecciones a tu ritmo</li>
              <li>Pulsa <strong>Finalizar curso</strong> para obtener tu diploma</li>
            </ul>
            <Link to="/cursos" className="landing-btn landing-btn--primary certificates-empty-cta">
              Empezar un curso
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="certificates-empty certificates-empty--compact">
            <Search size={40} />
            <h3>Sin resultados para «{query}»</h3>
            <button type="button" className="landing-btn landing-btn--outline" onClick={() => setQuery("")}>
              Limpiar búsqueda
            </button>
          </div>
        ) : (
          <div className="certificates-grid">
            {filtered.map((cert) => (
              <article
                key={cert.id}
                className="certificate-card-v2 certificate-card-v2--interactive"
              >
                <div className="certificate-card-v2-seal">
                  <Award size={40} />
                </div>
                <div className="certificate-card-v2-body">
                  <h3>{cert.courseName}</h3>
                  <p className="certificate-card-v2-instructor">Profesor: {cert.instructor}</p>
                  <ul className="certificate-card-v2-meta">
                    <li>
                      <Calendar size={14} />
                      {cert.completionDate}
                    </li>
                    <li>
                      <Star size={14} />
                      Calificación: <strong>{cert.grade}</strong>
                    </li>
                    <li>
                      <GraduationCap size={14} />
                      {cert.hours} certificadas
                    </li>
                  </ul>
                  <div className="certificate-card-v2-code">
                    <span>Código de verificación</span>
                    <code>{cert.code}</code>
                  </div>
                </div>
                <div className="certificate-card-v2-actions">
                  <button
                    type="button"
                    className="certificate-download-btn"
                    onClick={() => handleDownload(cert)}
                  >
                    <Download size={16} /> Descargar PDF
                  </button>
                  <button
                    type="button"
                    className="certificate-verify-btn"
                    onClick={() => handleVerify(cert)}
                  >
                    <ShieldCheck size={16} /> Verificar
                  </button>
                  <Link
                    to={`/vista?curso=${cert.courseId}`}
                    className="certificate-course-link"
                  >
                    Ver curso <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <section className="certificates-info">
          <h2>¿Cómo obtener un certificado?</h2>
          <div className="certificates-steps">
            <div>
              <strong>1. Toma un curso</strong>
              <p>Entra al catálogo y elige la formación que quieras desarrollar.</p>
            </div>
            <div>
              <strong>2. Finaliza el curso</strong>
              <p>Al terminar las lecciones, pulsa el botón <strong>Finalizar curso</strong>.</p>
            </div>
            <div>
              <strong>3. Recibe tu credencial</strong>
              <p>Tu diploma aparecerá aquí al instante, listo para descargar y verificar.</p>
            </div>
          </div>
        </section>
      </div>
    </PlanGuard>
  );
}

export default Certificados;
