import { Link } from "react-router-dom";
import logo from '../Assets/logo_knowly-removebg-preview.png';

const NavBar = function () {
  return (
    <aside>
      <nav className="NavBar">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/cursos">Cursos</Link>
        <Link to="/contacto">Nosotros</Link>
        <Link to="/administrador">Admin</Link>
        <Link to="/login" className="btn-acceder">Acceder</Link>
        
      </nav>
    </aside>
  );
};

export default NavBar;
