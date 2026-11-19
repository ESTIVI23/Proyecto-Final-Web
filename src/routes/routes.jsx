import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Login from "../pages/Login";
import Juego1 from "../pages/Juego1";
import Juego2 from "../pages/Juego2";
import Resultados from "../pages/Resultados";
import Docente from "../pages/Docente"; //  Importás el componente acá
//  //routes es el objeto que creamos 
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />, // aqui es donde defino como padre a App.jsx 
    // y los hijos son los demas componentes
    children: [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "/juego1",
        element: <Juego1 />
      },
      {
        path: "/juego2",
        element: <Juego2 />
      },
      {
        path: "/resultados",
        element: <Resultados />
      },
      {
        path: "/docente",
        element: <Docente />


      }

    ]
  }
]);