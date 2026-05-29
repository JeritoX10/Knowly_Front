import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Cursos from "./Pages/Cursos";
import Contacto from "./Pages/Contacto";
import Estudiantes from "./Pages/Estudiantes";
import Certificados from "./Pages/Certificados";
import Blogs from "./Pages/Blogs";
import Vista from "./Pages/Vista";
import Administrador from "./Pages/Administrador";
import App from "./App";

export const routerApp = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },

      {
        path: "/home",
        element: <Home />
      },

      {
        path: "/administrador",
        element: <Administrador />
      },

      {
        path: "/cursos",
        element: <Cursos />
      },

      {
        path: "/contacto",
        element: <Contacto />
      },

      {
        path: "/estudiantes",
        element: <Estudiantes />
      },

      {
        path: "/certificados",
        element: <Certificados />
      },

      {
        path: "/blogs",
        element: <Blogs />
      },

      {
        path: "/curso/:slug",
        element: <Vista />
      },
    ],
  },
];