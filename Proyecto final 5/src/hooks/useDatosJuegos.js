import { useContext } from 'react';

import { JuegoContext } from '../context/DatosDelJuego';

// Custom Hook
export const useDatosJuego = () => {
  return useContext(JuegoContext);
};