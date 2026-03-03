import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = function () {
  const [open, setOpen] = useState(false);

  return (
    <aside>
      <nav className="NavBar">
        <img src="src/Assets/logo_knowly-removebg-preview.png" alt="logo" />

        <Link to="/cursos">cursos</Link>
        <Link to="/contacto">contacto</Link>
        <a href="#">redes</a>
        <Link to="/login">login</Link>
        <a href="#">certificado</a>

        {/* Tarjeta Membresía */}
        <div onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
          Membresía
        </div>

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
