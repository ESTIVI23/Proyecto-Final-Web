import { createContext, useState, useContext } from 'react';

// 1. Creación del Contexto
const JuegoContext = createContext();

// 2. Componente Proveedor (Provider) que envuelve la app es un
//  componente funcional
export const ProveedorDeDatosDelJuego = ({ children }) => {
  const [nombre, setNombre] = useState('');
  const [puntajeJ1, setPuntajeJ1] = useState(0);
  const [puntajeJ2, setPuntajeJ2] = useState(0);


  // con  esto limpiamos para que otro jugador carge sus datos 
  const reiniciarJuego = () => {
    setNombre('');
    setPuntajeJ1(0);
    setPuntajeJ2(0);
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

// 3. Hook personalizado para usar el contexto fácilmente en las pantallas
export const useDatosJuego = () => useContext(JuegoContext);