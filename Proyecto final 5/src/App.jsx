import { Outlet } from "react-router-dom";
import {  CssBaseline  } from "@mui/material";



const App = () => {
  return (
    <>
    <CssBaseline /> {/* Limpia márgenes y bordes blancos del navegador */}
      <Outlet />     {/* Carga cada pantalla con libertad total de ancho */}
    </>
   
  );
};

export default App;