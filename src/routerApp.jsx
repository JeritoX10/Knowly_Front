import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Cursos from "./Pages/Cursos";
import Contacto from "./Pages/Contacto";
import Estudiantes from "./Pages/Estudiantes";
import Certificados from "./Pages/Certificados";
import Blogs from "./Pages/Blogs";
import BlogDetalle from "./Pages/BlogDetalle";
import Profesores from "./Pages/Profesores";
import Vista from "./Pages/Vista";
import Profesor from "./Pages/Profesor";
import Pago from "./Pages/Pago";
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
      { path: "/", 
        element: <Home /> },
      { path: "/home", 
        element: <Home /> },
      { path: "/cursos", 
        element: <Cursos /> },
      { path: "/contacto", 
        element: <Contacto /> },
      { path: "/estudiantes",
        element: <Estudiantes /> },
      { path: "/certificados", 
        element: <Certificados /> },
      { path: "/blogs", 
        element: <Blogs /> },
      { path: "/blogs/:slug",
        element: <BlogDetalle /> },
      { path: "/profesores",
        element: <Profesores /> },
      { path: "/vista", 
        element: <Vista /> },
      { path: "/profesor",
        element: <Profesor /> },
      { path: "/pago",
        element: <Pago /> },
    ],
  },
];