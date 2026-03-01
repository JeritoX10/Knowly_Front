const Login = () => {
  return (
    <section className="Login">
      <form>
        <input type="text" placeholder="Usuario" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="submit">Entrar</button>
      </form>
    </section>
  )
}

export default Login
