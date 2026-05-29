import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { getLocalStorage, removeLocalStorage } from "../Helpers/local-storage";
import { navbarMembershipLinks } from "../data/memberships";
import { KNOWLY_LOGO } from "../Helpers/branding";

const NavBar = function () {
  const [membershipOpen, setMembershipOpen] = useState(false);
  const [usuario, setUsuario] = useState(() => getLocalStorage("Usuario"));
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMembershipOpen(false);
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") setMembershipOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const cerrarSesion = () => {
    removeLocalStorage("Usuario");
    setUsuario(null);
    window.location.href = "/";
  };

  const closeMembership = () => setMembershipOpen(false);

  return (
    <header className="navbar-wrap">
      <nav className="NavBar">
        <Link to="/" className="navbar-logo" onClick={closeMembership}>
          <img src={KNOWLY_LOGO} alt="Knowly" />
        </Link>

        <div className="navbar-links">
          <Link to="/cursos" onClick={closeMembership}>
            Cursos
          </Link>
          <Link to="/contacto" onClick={closeMembership}>
            Comunidad
          </Link>
          <Link to="/blogs" onClick={closeMembership}>
            Blogs
          </Link>
          <Link to="/certificados" onClick={closeMembership}>
            Certificado
          </Link>
          <Link to="/administrador" onClick={closeMembership}>
            Admin
          </Link>

          <div className="navbar-dropdown" ref={dropdownRef}>
            <button
              type="button"
              className={`navbar-dropdown-trigger${membershipOpen ? " navbar-dropdown-trigger--open" : ""}`}
              onClick={() => setMembershipOpen((prev) => !prev)}
              aria-expanded={membershipOpen}
              aria-haspopup="true"
            >
              Membresía
              <ChevronDown size={18} className="navbar-dropdown-chevron" />
            </button>

            {membershipOpen && (
              <div className="navbar-dropdown-panel navbar-dropdown-panel--wide" role="menu">
                {navbarMembershipLinks.map((group) => (
                  <div key={group.section} className="navbar-dropdown-group">
                    <p className="navbar-dropdown-group-title">{group.section}</p>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="navbar-dropdown-item"
                          role="menuitem"
                          onClick={closeMembership}
                        >
                          <span className="navbar-dropdown-item-icon">
                            <Icon size={18} />
                          </span>
                          <span className="navbar-dropdown-item-text">
                            <strong>{item.label}</strong>
                            <small>{item.desc}</small>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                ))}
                <Link
                  to="/estudiantes"
                  className="navbar-dropdown-footer-link"
                  onClick={closeMembership}
                >
                  Comparar todos los planes →
                </Link>
              </div>
            )}
          </div>

          {usuario?.rol === "profesor" && (
            <Link to="/profesor" className="navbar-link-highlight" onClick={closeMembership}>
              Subir curso
            </Link>
          )}
        </div>

        <div className="navbar-actions">
          {usuario ? (
            <>
              <span className="navbar-user">
                {usuario.nombre}
                <small>
                {usuario.rol === "profesor" ? "Profesor" : "Estudiante"}
                {usuario.planId && usuario.planId !== "gratuito" ? ` · ${usuario.planId}` : " · Gratuito"}
              </small>
              </span>
              <button type="button" className="btn-acceder btn-salir" onClick={cerrarSesion}>
                Salir
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-acceder" onClick={closeMembership}>
              Acceder
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
