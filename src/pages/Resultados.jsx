import { useEffect } from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDatosJuego } from '../hooks/useDatosJuegos';

const Resultados = () => {
  const { nombre, puntajeJ1, puntajeJ2, reiniciarJuego } = useDatosJuego();
  const navigate = useNavigate();
  // Suma total de los puntos acumulados 
  const puntajeTotal = (puntajeJ1 || 0) + (puntajeJ2 || 0);
  // Guardar automáticamente la partida al llegar a Resultados (Evitando duplicados)
  useEffect(() => {
    if (nombre) {

      // 1. Leemos lo que había guardado
      const historialPrevio =
        JSON.parse(localStorage.getItem('historialJuegos')) || [];

      //  Nos fijamos cuál fue la última partida registrada
      const ultimaPartida =
        historialPrevio[historialPrevio.length - 1];

      //  Verificamos si este mismo jugador ya se guardó recién
      const yaSeGuardo =
        ultimaPartida &&
        ultimaPartida.nombre === nombre &&
        ultimaPartida.puntajeJ1 === (puntajeJ1 || 0) &&
        ultimaPartida.puntajeJ2 === (puntajeJ2 || 0);

      //  Si NO está guardado todavía, lo agregamos
      if (!yaSeGuardo) {
        const nuevaPartida = {
          nombre: nombre,
          puntajeJ1: puntajeJ1 || 0,
          puntajeJ2: puntajeJ2 || 0,
        };
        const historialActualizado = [
          ...historialPrevio,
          nuevaPartida
        ];
        localStorage.setItem(
          'historialJuegos',
          JSON.stringify(historialActualizado)
        );
      }
    }
  }, [nombre, puntajeJ1, puntajeJ2]);
  // Función para volver a jugar
  const volverAJugar = () => {
    reiniciarJuego();
    navigate('/');
  };
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
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 5,
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.95)'
          }}
        >

          {/* 1. Título de felicitaciones */}
          <Typography variant="h4" component="h1" gutterBottom>
            ¡Felicitaciones! 🎉
          </Typography>

          {/* 2. Nombre del alumno */}
          <Typography variant="h6" sx={{ mb: 3 }}>
            ¡Buen trabajo, {nombre}!
          </Typography>

          {/* 3. Puntaje del Juego 1 */}
          <Typography variant="h6" sx={{ mb: 1 }}>
            Juego 1: {puntajeJ1 || 0} puntos
          </Typography>

          {/* 4. Puntaje del Juego 2 */}
          <Typography variant="h6" sx={{ mb: 2 }}>
            Juego 2: {puntajeJ2 || 0} puntos
          </Typography>

          {/* 5. Puntaje total */}
          <Paper
            elevation={3}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 3,
              backgroundColor: '#e8f5e9'
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              Puntaje total
            </Typography>

            <Typography variant="h3" color="success.main" fontWeight="bold">
              {puntajeTotal}
            </Typography>

            <Typography variant="body1">
              ¡Puntos conseguidos! ⭐
            </Typography>
          </Paper>

          {/* 6. Botón para volver a jugar */}
          <Button
            variant="contained"
            color="success"
            fullWidth
            size="large"
            onClick={volverAJugar}
          >
            Volver a jugar
          </Button>

        </Paper>
      </Container>
    </Box>
  );
};

export default Resultados;