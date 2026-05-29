import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import logo from "../Assets/logo_knowly-removebg-preview.png"

const Home = () => {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState({})
  const sectionRefs = useRef({})

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.15 }
    )
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })
    return () => observer.disconnect()
  }, [])

  const registerRef = (id) => (el) => {
    sectionRefs.current[id] = el
  }

  const stats = [
    { value: "12K+", label: "Estudiantes activos" },
    { value: "340+", label: "Cursos disponibles" },
    { value: "98%", label: "Tasa de satisfacción" },
    { value: "180+", label: "Instructores expertos" },
  ]
  const pillars = [
    {
      num: "01",
      title: "Misión",
      desc: "Democratizar la educación técnica, permitiendo que expertos compartan su saber y estudiantes se certifiquen.",
      icon: "🎯",
    },
    {
      num: "02",
      title: "Visión",
      desc: "Ser la plataforma líder de habla hispana, el puente principal entre el aprendizaje y el éxito profesional.",
      icon: "🚀",
    },
    {
      num: "03",
      title: "Propósito",
      desc: "Impulsar el crecimiento personal a través de la educación accesible, transformando pasiones en carreras.",
      icon: "✨",
    },
  ]

  return (
    <div style={{ 
      fontFamily: "'Outfit', 'Segoe UI', sans-serif", 
      background: "linear-gradient(90deg, rgb(165, 110, 245) 0%, rgb(180, 130, 250) 25%, rgb(220, 195, 255) 50%, rgb(180, 130, 250) 75%, rgb(165, 110, 245) 100%)", 
      color: "#18181B", 
      overflowX: "hidden" 
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.4; }
          100% { transform: scale(1.6); opacity: 0;   }
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .nav-link {
          color: #4B5563;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #000000; }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #000000;
          color: #fff;
          border: none;
          padding: 14px 32px;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
          text-decoration: none;
          width: fit-content;
        }
        .btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 12px 30px rgba(29, 78, 216, 0.3);
          background: #1e40af;
        }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.3);
          color: #18181B;
          border: 1.5px solid rgba(0,0,0,0.1);
          padding: 13px 26px;
          border-radius: 16px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          width: fit-content;
          backdrop-filter: blur(4px);
        }
        .btn-ghost:hover {
          background: rgba(255, 255, 255, 0.5);
          border-color: #18181B;
        }

        .course-card, .pillar-card {
          background: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 24px;
          padding: 28px;
          transition: all 0.3s ease;
          backdrop-filter: blur(12px);
        }
        .course-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.6);
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }

        .section-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .section-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .gradient-text {
          background: linear-gradient(135deg, #1e40af, #7C3AED, #1e40af);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 4s ease infinite;
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: "0 48px",
        height: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrollY > 40 ? "rgba(220, 195, 255, 0.7)" : "transparent",
        backdropFilter: scrollY > 40 ? "blur(20px)" : "none",
        transition: "all 0.3s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={logo} alt="Logo" style={{ height: 35 }} />
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#1D4ED8", letterSpacing: "-0.02em" }}>
            Knowly
          </span>
        </div>

        <div style={{ display: "flex", gap: 36 }}>
          <Link className="nav-link" to="/blogs">Blogs</Link>
          <Link className="nav-link" to="/cursos">Cursos</Link>
          <Link className="nav-link" to="/contacto">Nosotros</Link>
          <Link className="nav-link" to="/administrador">Administracion</Link>
        </div>

        <Link to="/login" className="btn-primary" style={{ padding: "8px 20px", fontSize: 14, borderRadius: 12 }}>
          Acceder
        </Link>
      </nav>

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
            src={logo} 
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
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D4ED8", display: "inline-block", animation: "pulse-ring 1.5s infinite" }} />
            Plataforma educativa #1 en LATAM
          </div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(40px, 7vw, 80px)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 24,
            maxWidth: 900,
            color: "#0f172a"
          }}>
            Aprende sin límites. <br/>
            <span className="gradient-text">Certifícate</span> sin fronteras.
          </h1>

          <p style={{
            fontSize: "clamp(17px, 2vw, 21px)",
            color: "#334155",
            maxWidth: 600,
            lineHeight: 1.6,
            marginBottom: 40,
            fontWeight: 500,
            marginRight: "auto",
            marginLeft: "auto"
          }}>
            La plataforma donde el conocimiento se comparte, los logros se certifican y las carreras se transforman.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", width: "100%" }}>
            <Link to="/login" className="btn-primary">
              Comenzar gratis →
            </Link>
            {/* Aquí se actualizó el enlace para redirigir al componente Cursos */}
            <Link to="/cursos" className="btn-ghost">
              Ver cursos
            </Link>
          </div>

          <div style={{ marginTop: 48, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: "#475569", fontSize: 14, fontWeight: 500 }}>
              <span style={{ color: "#0f172a", fontWeight: 700 }}>+12,000</span> estudiantes ya confían en nosotros
            </span>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div
        id="stats"
        ref={registerRef("stats")}
        className={`section-reveal ${isVisible.stats ? "visible" : ""}`}
        style={{ background: "rgba(255,255,255,0.3)", padding: "40px 0", borderY: "1px solid rgba(255,255,255,0.5)" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "20px" }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, color: "#000000" }}>{s.value}</p>
              <p style={{ color: "#475569", fontSize: 14, fontWeight: 600 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── PILLARS ── */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            id="pillars"
            ref={registerRef("pillars")}
            className={`section-reveal ${isVisible.pillars ? "visible" : ""}`}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}
          >
            {pillars.map((p, i) => (
              <div key={i} className="pillar-card">
                <div style={{ fontSize: 32, marginBottom: 15 }}>{p.icon}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 10 }}>{p.title}</h3>
                <p style={{ color: "#334155", fontSize: 15, lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{
        padding: "40px 48px",
        textAlign: "center",
        background: "rgba(0,0,0,0.05)",
        backdropFilter: "blur(10px)"
      }}>
        <p style={{ color: "#1e293b", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em" }}>
          © 2026 KNOWLY — POTENCIANDO EL FUTURO DIGITAL
        </p>
      </footer>
    </div>
  )
}

export default Home
