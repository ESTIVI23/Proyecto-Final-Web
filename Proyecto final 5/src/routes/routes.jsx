import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Login from "../pages/Login";
import Juego1 from "../pages/Juego1";
import Juego2 from "../pages/Juego2";
import Resultados from "../pages/Resultados";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
      }
    ]
  }
]);