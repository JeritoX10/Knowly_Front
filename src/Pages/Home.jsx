import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="p-10 text-center flex flex-col items-center justify-center" style={{ marginTop: "80px", minHeight: "calc(100vh - 80px)" }}>
      <img src="/src/Assets/logo_knowly-removebg-preview.png" alt="Knowly Logo" className="w-48 h-48 mb-2 drop-shadow-md" />
      <h1 className="text-6xl font-bold mb-2 -mt-6 text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Bienvenido a Knowly</h1>
      <p className="text-2xl mb-4 text-gray-200 italic">Descubre todo lo que Knowly tiene para ofrecer. Navega por las secciones usando la barra superior.</p>
      <Link to="/" className="mt-2 inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-opacity-80 transition duration-300">
        Ingresar
      </Link>
    </main>
  );
}
export default Home;