import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { routes } from './routes/routes';
import { ProveedorDeDatosDelJuego } from './context/DatosDelJuego';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProveedorDeDatosDelJuego>
      <RouterProvider router={routes} />
    </ProveedorDeDatosDelJuego>
  </StrictMode>
);