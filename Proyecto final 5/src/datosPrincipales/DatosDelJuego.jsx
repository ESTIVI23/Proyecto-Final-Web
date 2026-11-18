import { createContext, useState, useEffect } from 'react';

// 1. Creación del Contexto 
export const JuegoContext = createContext();

export const ProveedorDeDatosDelJuego = ({ children }) => {
  // Guardamos el nombre del jugador
  // Si existe en localStorage, lo recuperamos.
  // Si no existe, comenzamos con un texto vacío.
 const [nombre, setNombre] = useState(
  () => localStorage.getItem('nombreUsuario') || ''
  );
const [puntajeJ1, setPuntajeJ1] = useState(
 () => Number(localStorage.getItem('puntajeJ1')) || 0
  ); 
 const [puntajeJ2, setPuntajeJ2] = useState(
 () => Number(localStorage.getItem('puntajeJ2')) || 0
  );
 
  useEffect(() => {
    localStorage.setItem('nombreUsuario', nombre);
    localStorage.setItem('puntajeJ1', puntajeJ1);
    localStorage.setItem('puntajeJ2', puntajeJ2);
  },
  [nombre, puntajeJ1, puntajeJ2]);

  // con  esto limpiamos para que otro jugador carge sus datos funcion
  const reiniciarJuego = () => {
    setNombre('');
    setPuntajeJ1(0);
    setPuntajeJ2(0);

    // Eliminamos los datos guardados en localStorage
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('puntajeJ1');
    localStorage.removeItem('puntajeJ2');
  
  };

  return (
    //esto es una etiqueta 
    <JuegoContext.Provider
      value={{
        nombre,
        setNombre,
        puntajeJ1,
        setPuntajeJ1,
        puntajeJ2,
        setPuntajeJ2,
        reiniciarJuego,
      }}
    >
      {children} 
    </JuegoContext.Provider>
    // la etiqueta tiene se llamarse igual qe el objeto que tiene 
    //la funcion en este caso es ----createContext()-------------
  );
};

