// React (para manejar memoria y efectos) 
import { useState, useEffect, useRef } from 'react';
// React Router (para viajar de pantalla) 
import { useNavigate } from 'react-router-dom';
//Tu Hook (para guardar los puntos) 
import { useDatosJuego } from '../hooks/useDatosJuegos';
import { obtenerPreguntasJuego1 } from '../servicios/servicioPreguntas';
import { Box, Typography } from '@mui/material';

const Juego1 = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [rondaActual, setRondaActual] = useState(
    () => { return Number(localStorage.getItem('rondaJ1')) || 0; });

  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState(null);
  const [bloqueado, setBloqueado] = useState(false);
  const audioRef = useRef(null);
  //hooks globales y Rutas
  const { puntajeJ1, setPuntajeJ1 } = useDatosJuego();
  const navigate = useNavigate();
  const ronda = preguntas[rondaActual];
  //  NUEVO LUGAR Modificás tu función reproducirSonido
  const reproducirSonido = () => {
    if (!ronda?.sonido) return;
    // Si ya había un audio sonando, lo apaga primero
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const nuevoAudio = new Audio(ronda.sonido);
    audioRef.current = nuevoAudio; // Guarda el audio en la memoria
    nuevoAudio.play().catch(() => { });
  };
  // Se ejecuta automáticamente al abrir la pantalla
  useEffect(() => {
    // Llama a la función que usa Axios para ir al JSON
    obtenerPreguntasJuego1()
      .then((datos) => {
        //  Guarda el arreglo completo en el estado
        setPreguntas(datos);
        console.log("¡Preguntas recibidas con éxito del JSON!:", datos);
        setCargando(false);
        //  Ya llegaron las preguntas, avisamos que terminó de cargar
      })
      .catch((error) => {
        console.error("Error al cargar:", error);
        setCargando(false);
      });
  }, []); // Este [] hace que se guarde todo el arreglo de preguntas}

  //  solo una vez al abrir la pantalla
  // Este guarda la ronda en el navegador cada vez que avanza (0, 1, 2...)
  useEffect(() => { localStorage.setItem('rondaJ1', rondaActual); }, [rondaActual]);
  //  LÓGICA DE CLIC EN LA COMIDA ---
  const manejarRespuesta = (opcionSeleccionada) => {
    // 1. Evitamos que vuelva a hacer clic si ya está bloqueado
    if (bloqueado) return;
    setBloqueado(true);
    // 2. Averiguamos si la opción elegida es la correcta
    const textoOpcion = opcionSeleccionada.texto
      ? opcionSeleccionada.texto
      : opcionSeleccionada;
    const esCorrecta =
      opcionSeleccionada.esCorrecta !== undefined
        ? opcionSeleccionada.esCorrecta
        : textoOpcion === ronda.correcta;

    // 3. Guardamos el mensaje y sumamos puntos si acertó
    if (esCorrecta) {
      setPuntajeJ1((puntajeAnterior) => puntajeAnterior + 10);
      setMensaje({
        tipo: 'success',
        texto: '¡Correcto! Le diste su comida favorita 🌽'
      });
    } else {
      setMensaje({
        tipo: 'error',
        texto: '¡Ups! Esa no es su comida ❌'
      });
    }
    // 4. Esperamos 1.5 segundos antes de avanzar de ronda
    setTimeout(() => {
      setMensaje(null);
      setBloqueado(false);

      if (rondaActual < preguntas.length - 1) {
        setRondaActual((prev) => prev + 1);
      } else {
        localStorage.removeItem('rondaJ1');
        navigate('/juego2');
      }
    }, 1500);
  };

  // Si Axios todavía está buscando el JSON, mostramos este texto
  if (cargando) {
    return <h2 style={{ textAlign: 'center' }} >Cargando juego...</h2>;
  }
  //  Si ocurrió un problema y el JSON vino vacío
  if (!preguntas.length) {
    return <h2 style={{ textAlign: 'center' }} >No se encontraron preguntas.</h2>;
  }
  console.log("Ronda actual:", rondaActual);
  console.log("Animal actual:", ronda.animal);

  return (
    <Box
      sx={{
        backgroundImage: 'url(/imagenes/Granja.png)', // Ruta de la imagen en public/imagenes/granja.jpg
        backgroundSize: 'cover',
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
          position: { xs: 'relative', sm: 'absolute' },
          top:{ sm: '20px' },
          right: { sm: '20px' },
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
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          backgroundColor: 'rgba(104, 100, 211, 0.95)',
          color: '#daecdb',
          px: 5,
          py: 1.5,
          borderRadius: 4,
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          mb: 3
        }}
      >
        Ronda {rondaActual + 1} de {preguntas.length}
      </Typography>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          backgroundColor: 'rgba(104, 100, 211, 0.95)',
          color: '#021203',
          px: 5,
          py: 1.5,
          borderRadius: 4,
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          mb: 3
        }}
      >
        {ronda.pregunta}
      </Typography>
      <Typography
        sx={{
          backgroundColor: 'rgba(104, 100, 211, 0.95)',
          color: '#ffffff', //   blanco suele resaltar mejor con fondos violetas/azules
          px: 5,
          py: 1.5,
          borderRadius: 4,
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          mb: 3,
          cursor: 'pointer', //  Para que se note que se puede hacer clic
          fontWeight: 'bold',
          fontSize: '1.2rem',
          display: 'inline-block' //  Para que el fondo violeta envuelva solo el texto y no toda la pantalla
        }}
      >
        🔊 ¡Tocá la foto para escuchar a la {ronda.animal}!
      </Typography>
      {/* Imagen del animal */}
      {ronda.imagen && (
        <img
          src={ronda.imagen}
          alt={ronda.animal}
          width="380"
          onClick={reproducirSonido} // ¡ACÁ SE CONECTA EL CLIC!
          style={{ cursor: 'pointer', margin: '15px 0' }}
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
            disabled={bloqueado}
            style={{
              padding: '10px 20px',
              fontSize: '28px',
              cursor: bloqueado ? 'not-allowed' : 'pointer', //  Manito normal o ícono de bloqueado 
              opacity: bloqueado ? 0.6 : 1, // Transparencia mientras espera
              borderRadius: '8px'
            }}
          >
            {opcion.texto ? opcion.texto : opcion}
          </button>
        ))}
      </Box>
      {/* Mensaje de acierto o error */}
      {mensaje && (
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="h5"
            color={mensaje.tipo === 'success' ? 'success.main' : 'error.main'}
            fontWeight="bold"
            sx={{
              backgroundColor: 'white',
              display: 'inline-block',
              px: 3,
              py: 1.5,
              borderRadius: 3,
              boxShadow: 3
            }}
          >
            {mensaje.texto}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
export default Juego1;