// Usamos "/api/" para que Vite actúe como puente y evitemos el error de CORS.
// Si cambias este archivo, recuerda reiniciar el comando "npm run dev".
const URL_BASE = "/api/";
//url https://knowly-back-10.onrender.com dela api 

export let end_points = {
    usuario: URL_BASE + "usuario",
    certificados: URL_BASE + "certificados",
    cursos: URL_BASE + "cursos",
    inscripciones: URL_BASE + "inscripciones"
}