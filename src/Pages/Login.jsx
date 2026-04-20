import { useState, useEffect } from "react"
import { end_points } from "../Services/api"
import { redirect } from "../Helpers/alerts"
import { saveLocalStorage } from "../Helpers/local-storage"
// mockapi de validacion en react
// temporal 
// coloque que "contraseña" es contrasea porque en mokapi no deja poner la ñ  y es una simulacion mientras tanto 

const Login = () => {
  const [getCorreo, setCorreo] = useState("")
  const [getContraseña, setContrasea] = useState("")
  const [getUsuario, setUsuario] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  function fetchUsuario() {
    setCargando(true)
    fetch(end_points.usuario)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        console.log("Usuarios obtenidos de mokapi:", data)
        setUsuario(data)
        setError(null)
        setCargando(false)
      })
      .catch((error) => {
        console.error("Error al obtener usuarios:", error)
        setError(`No se pudo conectar a mokapi: ${error.message}`)
        setCargando(false)
      })
  }

  useEffect(() => {
    fetchUsuario()
  }, [])

  const findUsuario = () => {
    console.log("Correo ingresado:", getCorreo)
    console.log("Contraseña ingresada:", getContraseña)
    console.log("Todos los usuarios:", JSON.stringify(getUsuario, null, 2))
    
    // Búsqueda simple sin normalizaciones complicadas
    let usuario = getUsuario.find((item) => 
      item.correo === getCorreo && item.contrasea === getContraseña
    )
    
    console.log("¿Usuario encontrado?:", usuario)
    return usuario
  }


  function signIn(e) {
    e.preventDefault()

    const usuarioEncontrado = findUsuario()
    console.log("Usuario encontrado:", usuarioEncontrado)
    
    if (usuarioEncontrado) {
      saveLocalStorage("Usuario", usuarioEncontrado)
      redirect(usuarioEncontrado.nombre + " Bienvenido al sistema...", "/home", "success")
    } else {
      redirect("El correo o la contraseña son incorrectos...", "/", "error")
    }
  }

  return (
    <section className="Login">
      <div className="login-container">
        <h2>Iniciar sesión</h2>
        {error && <div style={{color: "red", marginBottom: "10px"}}>⚠️ {error}</div>}
        <form className="login-form" onSubmit={signIn}>
          <input 
            type="text" 
            placeholder="Correo" 
            required 
            disabled={cargando}
            onChange={(e) => setCorreo(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            required 
            disabled={cargando}
            onChange={(e) => setContrasea(e.target.value)} 
          />
          <button className="btn-primary" type="submit" disabled={cargando}>
            {cargando ? "Cargando..." : "Entrar"}
          </button>
        </form>

        <div className="divider">
          <span>o</span>
        </div>

        <div className="social-buttons">
          <button className="btn-social google" type="button">
            <svg width="20" height="20" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M533.5 278.4c0-17.8-1.6-35-4.6-51.7H272v98h146.9c-6.3 34-25 62.7-53 82v68h85.5c50-46 81-114 81-196.3z"/>
              <path fill="#34A853" d="M272 544.3c72.7 0 133.8-24.1 178.5-65.4l-85.5-68c-23.8 16-54.4 25.6-93 25.6-71 0-131.1-48-152.5-112.3h-89.8v70.7c44.5 88 135.3 150.4 242.3 150.4z"/>
              <path fill="#FBBC05" d="M119.5 323.9c-10.6-31.3-10.6-64.9 0-96.2v-70.7h-89.8c-38.7 77.3-38.7 168.5 0 245.8l89.8-79z"/>
              <path fill="#EA4335" d="M272 107.1c39.6 0 75 13.6 102.9 40.4l77.1-77.1C405.8 24 345.4 0 272 0 164.9 0 74.1 62.4 29.6 150.4l89.8 70.7C140.9 155.1 201 107.1 272 107.1z"/>
            </svg>
            Continuar con Google
          </button>
          <button className="btn-social facebook" type="button">
            <svg width="20" height="20" viewBox="0 0 96.1 96.1" xmlns="http://www.w3.org/2000/svg">
              <path fill="#3B5998" d="M72.1 0H24C10.8 0 0 10.8 0 24v48.1c0 13.3 10.8 24 24 24h25.9V58.9h-8.8V46.6h8.8v-9.9c0-8.7 5.3-13.5 13-13.5 3.7 0 6.8.3 7.7.5v8.9h-5.3c-4.2 0-5 2-5 5v6.4h10l-1.3 12.3h-8.7V96h17.1c13.3 0 24-10.8 24-24V24c0-13.2-10.7-24-24-24z"/>
            </svg>
            Continuar con Facebook
          </button>
        </div>
      </div>
    </section>
  )
}
export default Login;
