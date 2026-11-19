import { useContext } from 'react';

import { JuegoContext } from '../datosPrincipales/DatosDelJuego.jsx';

// Custom Hook creado para acceder a los datos del juego
//  desde cualquier componente funcional que lo necesite.
export const useDatosJuego = () => {
  return useContext(JuegoContext);
};