
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProveedorDeDatosDelJuego } from './context/DatosDelJuego';
import Login from './pages/Login';
import Juego1 from './pages/Juego1';
import Juego2 from './pages/Juego2';
import Resultados from './pages/Resultados';

const App = () => {
  return (
    <ProveedorDeDatosDelJuego>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/juego1" element={<Juego1 />} />
          <Route path="/juego2" element={<Juego2 />} />
          <Route path="/resultados" element={<Resultados />} />
        </Routes>
      </BrowserRouter>
    </ProveedorDeDatosDelJuego>
  );
};

export default App;