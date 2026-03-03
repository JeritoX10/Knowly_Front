import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = function () {
  const [open, setOpen] = useState(false);

  return (
    <aside>
      <nav className="NavBar">
        <img src="src/Assets/logo_knowly-removebg-preview.png" alt="logo" />

        <a href="#">cursos</a>
        <a href="#">contacto</a>
        <a href="#">redes</a>
        <a href="login.jsx">login</a>
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
