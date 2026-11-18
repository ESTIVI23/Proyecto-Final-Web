// 1\. React (para manejar memoria y efectos) 
import { useState, useEffect } from 'react';

// 2\. React Router (para viajar de pantalla) 
import { useNavigate } from 'react-router-dom';

// 3\. Tu Hook (para guardar los puntos) 
import { useDatosJuego } from '../hooks/useDatosJuegos';

// 4\. Tu Servicio (para leer el JSON con Axios) 
import { obtenerPreguntasJuego1 } from '../servicios/servicioPreguntas';

// para los estilos de Material UI
import { Box } from '@mui/material';






const Juego1 = () => {
// estados 
//  Nace vacío [] al iniciar la pantalla
const [preguntas, setPreguntas] = useState([]);


const [rondaActual, setRondaActual] = useState(
  () => { return Number(localStorage.getItem('rondaJ1')) || 0; });    // xdxdxdxdxdxdxdxdxdxd

// Estado nuevo: para saber si Axios sigue descargando el JSON
const [cargando, setCargando] = useState(true);


//hooks globales y Rutas
const { setPuntajeJ1 } = useDatosJuego();

const navigate = useNavigate();


const { puntajeJ1 } = useDatosJuego(); // 👈 Extraés puntajeJ1 de tu mochila

// Se ejecuta automáticamente al abrir la pantalla
useEffect(() => {

  // Llama a la función que usa Axios para ir al JSON
  obtenerPreguntasJuego1()
    .then((datos) => {

      //  Guarda el arreglo completo en el estado
      setPreguntas(datos);
      setCargando(false);
      // 👈 Ya llegaron las preguntas, avisamos que terminó de cargar

    })
    .catch((error) => {
  console.error("Error al cargar:", error);
  setCargando(false);
    });
    
}, []); // Este [] hace que se guarde todo el arreglo de preguntas
  //  solo una vez al abrir la pantalla


// Este guarda la ronda en el navegador cada vez que avanza (0, 1, 2...)
useEffect(() => { localStorage.setItem('rondaJ1', rondaActual); }, [rondaActual]);






// --- PARTE 4: LÓGICA DE CLIC EN LA COMIDA ---
const manejarRespuesta = (opcionSeleccionada) => {

// 1\. Averiguamos si la opción elegida es la correcta
const textoOpcion = opcionSeleccionada.texto ? opcionSeleccionada.texto :
opcionSeleccionada;
     const esCorrecta = opcionSeleccionada.esCorrecta !== undefined
     ? opcionSeleccionada.esCorrecta
     : textoOpcion === ronda.correcta;

     // 2\. Si acertó, le sumamos 10 puntos en la mochila global
     if (esCorrecta) {
       setPuntajeJ1((puntajeAnterior) => puntajeAnterior + 10);
      }

    // 3\. Verificamos si quedan más rondas o si terminamos
    
   if (rondaActual < preguntas.length - 1) {

  setRondaActual(rondaActual + 1);

} else {
   localStorage.removeItem('rondaJ1');  
  navigate('/juego2');

}

   ////////////////////////// 

};




// 1. Si Axios todavía está buscando el JSON, mostramos este texto
if (cargando) {
  return <h2 style={{ textAlign: 'center' }} >Cargando juego...</h2>;
}

// 2. Si ocurrió un problema y el JSON vino vacío
if (!preguntas.length) {
  return <h2 style={{ textAlign: 'center' }} >No se encontraron preguntas.</h2>;
}

// 3. Extraemos el animal de la ronda actual
// Como rondaActual vale 0, saca la primera ronda.
const ronda = preguntas[rondaActual];

console.log("Ronda actual:", rondaActual);
console.log("Animal actual:", ronda.animal);

// --- PARTE DE PANTALLA DEL JUEGO (1. RONDA) ---

return (


  
  <Box
    sx={{
      backgroundImage: 'url(/imagenes/Granja.png)', // Ruta de la imagen en public/imagenes/granja.jpg
      backgroundSize: '100% 100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      width: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center'
    }}
  >

<Box
  sx={{
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: '#FFD700',
    color: '#333',
    padding: '8px 18px',
    borderRadius: '20px',
    fontSize: '20px',
    fontWeight: 'bold',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    border: '2px solid #FFF'
  }}
>
  ⭐ {puntajeJ1} pts
</Box>

    

 <h3>
  Ronda {rondaActual + 1} de {preguntas.length}
</h3>

<h2>
  {ronda.pregunta}
</h2>



    {/* Imagen del animal */}
    {ronda.imagen && (
      <img
        src={ronda.imagen}
        alt={ronda.animal}
        width="380"
        style={{ margin: '15px 0' }}
      />
    )}


        
    {/* Botones de las opciones */}
    <Box
  sx={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    maxWidth: '500px',
    width: '100%',
    margin: '0 auto'
  }}
>
  {ronda.opciones.map((opcion, index) => (
    <button
      key={index}
      onClick={() => manejarRespuesta(opcion)}
      style={{
        padding: '10px 20px',
        fontSize: '28px',
        cursor: 'pointer',
        borderRadius: '8px'
      }}
    >
      {opcion.texto ? opcion.texto : opcion}
    </button>
  ))}
</Box>

  </Box>
);




};

export default Juego1;