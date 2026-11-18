
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Hook (para guardar los puntos del Juego 2)
import { useDatosJuego } from '../hooks/useDatosJuegos';

//  Servicio (para obtener las preguntas del Juego 2 mediante Axios)
import { obtenerPreguntasJuego2 } from '../servicios/servicioPreguntas';



import {Container, Box, Typography, Card, CardActionArea, CardMedia, CardContent} from '@mui/material';


const Juego2 = () =>{

     //el primer useeffect que se ejecuta al abrir la pantalla, para traer las preguntas del JSON

     
     //  Para guardar las preguntas que vienen del JSON
     const [preguntas, setPreguntas] = useState([]);

     // Para controlar en qué ronda va el juego y recordarla si se recarga la página
     const [rondaActual, setRondaActual] = useState(() => {
          return Number(localStorage.getItem('rondaJ2')) || 0;
     });
     //  Para saber si Axios todavía está descargando el JSON
     const [cargando, setCargando] = useState(true);

     // Guarda el mensaje que se mostrara en la pantalla cuando el alumno conteste mal o bien la pregunta
     const [mensaje, setMensaje] = useState('');

     //  Para bloquear los botones de respuesta mientras se muestra el mensaje
     const [bloqueado, setBloqueado] = useState(false);

     //  LAS HERRAMIENTAS (Hooks globales y Navegación)

     const {puntajeJ2, setPuntajeJ2 } = useDatosJuego(); // Para guardar los puntos del Juego 2
     const navigate = useNavigate(); // Para ir a la pantalla de /resultados






     //  Descarga las preguntas del JSON usando Axios al abrir la pantalla
     useEffect(() => { obtenerPreguntasJuego2().then((datos) => {

      // Guarda las preguntas descargadas en el estado
      setPreguntas(datos);

      // Avisa que terminó la carga
      setCargando(false);

    })

    .catch((error) => {

      // Muestra un error si no se pudieron cargar las preguntas
      console.error("Error al cargar las preguntas del Juego 2:", error);

      setCargando(false);

    });

}, []);


//  Guarda la ronda en localStorage por si el alumno presiona F5
useEffect(() => {

  localStorage.setItem('rondaJ2', rondaActual);

}, [rondaActual]);



// --- PASO B: LÓGICA DE SELECCIÓN DE ANIMAL ---
 const manejarRespuesta = (opcionSeleccionada) => {

      if (bloqueado) return; // Congela los clics durante el cartel de 1.5s

          setBloqueado(true); // Bloquea los botones de respuesta
          const rondaActualDatos = preguntas[rondaActual]; // Obtiene la pregunta actual

          // Verificamos si la opción elegida es el intruso
          const esCorrecta = opcionSeleccionada.esIntruso || opcionSeleccionada.nombre === rondaActualDatos.intrusoCorrecto;

          if (esCorrecta){
              setPuntajeJ2((prev) => prev + 10); // Suma 10 puntos en la mochila global
              setMensaje({ tipo: 'success', texto: '¡Correcto! Encontraste al intruso 👏' });
          } else {
               setMensaje({ tipo: 'error', texto: '¡Ups! Ese animal sí vive en la granja ❌' });
          }

          // Esperamos 1.5 segundos para que lea el mensaje y avanzamos
          setTimeout(()=>{

               setMensaje(null); // Limpiamos el cartel
               setBloqueado(false); // Desbloqueamos los clics
               if (rondaActual < preguntas.length - 1) {
                    setRondaActual((prev) => prev + 1); // Avanzamos a la siguiente ronda 
               } else{

                   localStorage.removeItem('rondaJ2'); // Limpiamos la ronda guardada de la memoria
                    navigate('/resultados'); // Vamos a la pantalla final
               }





          }, 1500);

 }


     const ronda = preguntas[rondaActual];



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
                    <Typography variant="h6" fontWeight="bold" color="primary">
                         ⭐ Puntos: {puntajeJ2}
                    </Typography>
               </Box>

               <Container maxWidth="md" sx={{ textAlign: 'center' }}>

                    {/* 1. Título principal */}
                    <Typography
                         variant="h4"
                         fontWeight="bold"
                         gutterBottom
                         sx={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}
                    >
                         Juego 2: El Intruso 🚜
                    </Typography>

                    {/* 2. Subtítulo indicando la ronda actual */}
                    <Typography
                         variant="h6"
                         sx={{ mb: 3, color: 'white', textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
                    >
                         Ronda {rondaActual + 1} de {preguntas.length} — ¿Cuál animal NO vive en la granja?
                    </Typography>


                    {/* Las 3 Tarjetas de animales */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap', my: 2 }}>
                         {ronda?.opciones?.map((opcion, index) => (
                              <Card key={index} sx={{ width: 200, borderRadius: 4, boxShadow: 5,
                                   opacity: bloqueado ? 0.6 : 1, // 👈 Si está bloqueado, se pone al 60% de opacidad
                                   
                               }}>
                                   <CardActionArea
                                        onClick={() => manejarRespuesta(opcion)}
                                        disabled={bloqueado}
                                   >
                                        <CardMedia
                                             component="img"
                                             height="140"
                                             image={opcion.imagen}
                                             alt={opcion.nombre}
                                             sx={{ objectFit: 'contain', p: 1 }}
                                        />
                                        <CardContent sx={{ textAlign: 'center', py: 1 }}>
                                             <Typography variant="h6" fontWeight="bold">
                                                  {opcion.nombre}
                                             </Typography>
                                        </CardContent>
                                   </CardActionArea>
                              </Card>
                         ))}
                    </Box>

                    {/* 4. Cartel de respuesta (Correcto / Incorrecto) */}
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

               </Container>


          </Box>



     );



};
export default Juego2;