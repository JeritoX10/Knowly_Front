import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = function () {
  const [open, setOpen] = useState(false);

  return (
    <aside>
      <nav className="NavBar">
        <Link to="/home">
          <img src="/src/Assets/logo_knowly-removebg-preview.png" alt="logo" />
        </Link>

        <Link to="/cursos">cursos</Link>
        <Link to="/contacto">comunidad</Link>
        <Link to="/blogs">blogs</Link>
        <Link to="/certificados">certificado</Link>
        {/* Tarjeta Membresía */}
        <div onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
          Membresía
        </div>
        <Link to="/login"className="btn-acceder">Acceder</Link>


        

        {/* Subtarjeta Estudiantes */}
        {open && (
          <div style={{ marginLeft: "5px" }}>
            <Link to="/estudiantes">Estudiantes</Link>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default NavBar;
