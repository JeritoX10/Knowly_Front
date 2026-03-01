


import React from "react"

/*
login de inicio para  que el usuario ingrese ala pagina principal
su primera vista es esta pagina por lo cual falta conectarla con el app.jsx  y el home.jsx con un layout 
para poder asi ver la pagina como tal, esta incorporado  el tailwind para los estilos, ya esta configurado solo es ver la documentacion 
*/

function Login() {
  return (

    

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-400 rounded-2xl flex items-center justify-center">
            <img src="src\Assets\logo_knowly.jpg" alt="logo" />
            
          </div>
        </div>

        
        
        <p className="text-center text-gray-500 text-sm mb-8">Ingresa a tu cuenta</p>

        <div className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Mínimo 8 caracteres"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition"
            />
          </div>

          
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 active:scale-95 shadow-lg"
            
          >
            Iniciar sesión
          </button >
        </div>

       
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t-2 border-gray-300"></div>
          <p className="px-3 text-gray-500 text-sm">o</p>
          <div className="flex-1 border-t-2 border-gray-300"></div>
        </div>

        
        <div className="flex justify-center gap-4 mb-6">
          <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition">
            f
          </a>
          <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition">
            𝕏
          </a>
          <a href="#" className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition">
            G
          </a>
        </div>

        
        <p className="text-center text-gray-600 text-sm">
          ¿No tienes cuenta?{' '}
          <a href="#" className="text-purple-600 font-bold hover:underline">
            Regístrate
          </a>
          <br />
          <br />

          <a href="#" className="text-purple-600 font-bold hover:underline">
            olvidaste la contraseña?
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login;

