import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center 
                     bg-gradient-to-r from-purple-800 via-purple-500 to-purple-300 
                     text-white p-10">
      <div >
        <h1>Bienvenido a Knowly</h1>
        <p >
          Esta es la página de inicio. Usa la barra de navegación para ir a otras secciones.
        </p>

      </div>

  
    </main>
  );
}

export default Home;
