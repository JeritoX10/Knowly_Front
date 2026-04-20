const MOCK_API_ID = "69e57d38ce4e908a155e1726";
const URL_BASE = `https://${MOCK_API_ID}.mockapi.io/`;
export let end_points = {
    usuario: URL_BASE + "usuario",
    certificados: URL_BASE + "certificado",
    cursos: URL_BASE + "cursos",
    inscripciones: URL_BASE + "inscripciones"
}