import { useState, useEffect } from "react";
import { saveLocalStorage, getLocalStorage } from "../Helpers/local-storage";
import { redirect } from "../Helpers/alerts";
import PlanGuard from "../Components/PlanGuard";

function Contacto() {
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(5);
  const [resenas, setResenas] = useState([]);
  const [hoverStar, setHoverStar] = useState(0);

  // Cargar reseñas del localStorage
  useEffect(() => {
    const resenasSaved = getLocalStorage("Resenas");
    // Si no hay datos o no es un arreglo, inicializamos con un arreglo vacío para evitar errores
    setResenas(Array.isArray(resenasSaved) ? resenasSaved : []);
  }, []);

  const agregarResena = (e) => {
    e.preventDefault();

    if (comentario.trim().length === 0) {
      redirect("Por favor escribe un comentario", null, "warning");
      return;
    }

    const nuevaResena = {
      id: Date.now(),
      comentario,
      calificacion,
      fecha: new Date().toLocaleDateString("es-ES"),
      nombre: getLocalStorage("Usuario")?.nombre || "Usuario Anónimo",
    };

    const nuevasResenas = [nuevaResena, ...resenas];
    setResenas(nuevasResenas);
    saveLocalStorage("Resenas", nuevasResenas);

    setComentario("");
    setCalificacion(5);
  };

  const calcularPromedio = () => {
    if (resenas.length === 0) return 0;
    const suma = resenas.reduce((acc, r) => acc + r.calificacion, 0);
    return parseFloat((suma / resenas.length).toFixed(1));
  };

  const renderStars = (rating, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          if (interactive) {
            return (
              <button
                key={star}
                type="button"
                onClick={() => setCalificacion(star)}
                onMouseEnter={() => setHoverStar(star)}
                onMouseLeave={() => setHoverStar(0)}
                className={`text-2xl transition-all hover:scale-110 ${
                  star <= (hoverStar || calificacion)
                    ? "text-yellow-400"
                    : "text-gray-300"
                } cursor-pointer`}
              >
                ★
              </button>
            );
          }
          return (
            <span
              key={star}
              className={`text-2xl ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <PlanGuard access="premium" feature="contacto">
    <div className="main flex flex-col items-center pt-48 pb-12">
      <div className="w-full max-w-3xl px-4">
        <header className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white drop-shadow-md mb-2">Reseñas y Comentarios</h2>
          <p className="text-purple-100 text-lg opacity-90">Tu opinión nos ayuda a mejorar la experiencia Knowly</p>
        </header>

        <div className="grid gap-8">
          {/* Panel Principal: Stats + Formulario */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100">
            <div className="grid md:grid-cols-5">
              {/* Lado Izquierdo: Resumen rápido */}
              <div className="md:col-span-2 bg-purple-50 p-8 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-purple-100">
                <h3 className="text-purple-800 font-bold uppercase tracking-wider text-sm mb-4">Promedio Total</h3>
                <span className="text-6xl font-black text-purple-600 mb-2">{calcularPromedio()}</span>
                <div className="mb-2">{renderStars(Math.round(calcularPromedio()))}</div>
                <p className="text-purple-400 text-sm font-medium">{resenas.length} opiniones verificadas</p>
              </div>

              {/* Lado Derecho: Formulario */}
              <div className="md:col-span-3 p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Deja tu reseña</h3>
                <form onSubmit={agregarResena} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Calificación</label>
                    <div className="bg-gray-50 rounded-xl p-2 inline-block">
                      {renderStars(calificacion, true)}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Tu mensaje</label>
                    <textarea
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                      placeholder="¿Qué tal ha sido tu experiencia?"
                      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-purple-400 focus:bg-white rounded-2xl transition-all outline-none resize-none text-gray-700"
                      rows="4"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full py-4 rounded-xl font-bold shadow-lg shadow-purple-200 hover:scale-[1.02] active:scale-95 transition-transform">
                    Publicar Comentario
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Listado de reseñas */}
          <div className="mt-8">
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-xl font-bold text-white">Actividad Reciente</h3>
              <div className="h-px flex-1 bg-white/20"></div>
            </div>
            
            {resenas.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 text-center border border-white/20">
                <p className="text-white/70 text-lg">Aún no hay comentarios. ¡Inaugura la sección!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {resenas.map((resena) => (
                  <div
                    key={resena.id}
                    className="bg-white/95 rounded-2xl p-6 shadow-lg border-l-8 border-purple-500 flex flex-col gap-3 transition-all hover:bg-white"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold">
                          {resena.nombre.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 leading-none mb-1">{resena.nombre}</h4>
                          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{resena.fecha}</span>
                        </div>
                      </div>
                      <div className="scale-75 origin-right">
                        {renderStars(resena.calificacion)}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed italic">"{resena.comentario}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </PlanGuard>
  );
}

export default Contacto;