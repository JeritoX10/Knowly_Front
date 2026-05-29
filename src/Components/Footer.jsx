import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const developers = [
  "Juan José Castrillón",
  "Johan Cadavid",
  "Jerónimo Taborda",
  "Sebastián Herrera",
  "Sharon Asprilla",
];

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-col">
          <p className="site-footer-brand">Knowly</p>
          <p className="site-footer-copy">
            Todos los derechos reservados © {new Date().getFullYear()}
          </p>
          <p className="site-footer-tagline">
            Plataforma de cursos acreditados para profesores y estudiantes.
          </p>
        </div>

        <div className="site-footer-col">
          <p className="site-footer-heading">Contacto</p>
          <a href="mailto:contacto@knowly.edu" className="site-footer-email">
            <Mail size={16} />
            contacto@knowly.edu
          </a>
          <div className="site-footer-social">
            <a href="#facebook">Facebook</a>
            <a href="#instagram">Instagram</a>
            <a href="#twitter">Twitter</a>
          </div>
        </div>

        <div className="site-footer-col">
          <p className="site-footer-heading">Equipo de desarrollo</p>
          <ul className="site-footer-devs">
            {developers.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>

        <div className="site-footer-col site-footer-nav">
          <p className="site-footer-heading">Enlaces</p>
          <Link to="/">Inicio</Link>
          <Link to="/cursos">Cursos</Link>
          <Link to="/#precios">Membresías</Link>
          <Link to="/contacto">Comunidad</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
