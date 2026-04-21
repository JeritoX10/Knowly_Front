import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="p-10" style={{ marginTop: "80px" }}>
      <h1>Bienvenido a Knowly</h1>
      <p>Esta es la página de inicio. Usa la barra de navegación para ir a otras secciones.</p>
      
      {/* Botón que redirige al login */}
      <Link 
        to="/" 
        className="mt-4 inline-block bg-primary text-white px-6 py-2 rounded-lg font-bold"
      >
        Cerrar sesión
      </Link>
    </main>
  );
}

export default Home;
