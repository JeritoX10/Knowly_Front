import { useState, useEffect } from "react";
import { saveLocalStorage, getLocalStorage } from "../Helpers/local-storage";

function Contacto() {
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(5);
  const [resenas, setResenas] = useState([]);
  const [hoverStar, setHoverStar] = useState(0);

  // Cargar reseñas del localStorage
  useEffect(() => {
    const resenasSaved = getLocalStorage("Resenas");
    if (resenasSaved) {
      setResenas(resenasSaved);
    }
  }, []);

  const agregarResena = (e) => {
    e.preventDefault();

    if (comentario.trim().length === 0) {
      alert("Por favor escribe un comentario");
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
    return (suma / resenas.length).toFixed(1);
  };

  const renderStars = (rating, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : "span"}
            onClick={interactive ? () => setCalificacion(star) : undefined}
            onMouseEnter={interactive ? () => setHoverStar(star) : undefined}
            onMouseLeave={interactive ? () => setHoverStar(0) : undefined}
            className={`text-2xl transition-colors ${
              star <= (interactive ? hoverStar || calificacion : rating)
                ? "text-yellow-400"
                : "text-gray-300"
            } ${interactive ? "cursor-pointer" : "cursor-default"}`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="main bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Reseñas y Comentarios</h2>
        <p className="text-gray-600 mb-8">Comparte tu experiencia y ayuda a otros usuarios</p>

        {/* Estadísticas */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-8">
            <div>
              <h3 className="text-gray-600 text-sm font-semibold mb-2">Calificación Promedio</h3>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-indigo-600">{calcularPromedio()}</span>
                <div>
                  {renderStars(Math.round(calcularPromedio()))}
                  <p className="text-sm text-gray-500 mt-1">({resenas.length} reseñas)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario para agregar reseña */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Deja tu Reseña</h3>
          <form onSubmit={agregarResena} className="space-y-6">
            {/* Selector de estrellas */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                ¿Qué calificación le das a Knowly?
              </label>
              {renderStars(calificacion, true)}
            </div>

            {/* Textarea para comentario */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Tu Comentario
              </label>
              <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Comparte tu experiencia con Knowly..."
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 resize-none"
                rows="5"
              />
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Enviar Reseña
            </button>
          </form>
        </div>

        {/* Listado de reseñas */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Reseñas Recientes ({resenas.length})
          </h3>
          {resenas.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500 text-lg">No hay reseñas aún. ¡Sé el primero en comentar!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {resenas.map((resena) => (
                <div
                  key={resena.id}
                  className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-gray-800">{resena.nombre}</h4>
                      <p className="text-sm text-gray-500">{resena.fecha}</p>
                    </div>
                    {renderStars(resena.calificacion)}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{resena.comentario}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contacto;