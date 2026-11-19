import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDatosJuego } from '../hooks/useDatosJuegos';
import { Container, Typography, Button, Paper,Box, Table,  TableBody, 
TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Docente = () => {

  const navigate = useNavigate();
  //  Estado para guardar la lista de alumnos que jugaron 
  const [historial, setHistorial] = useState([]);

  const { setNombre, reiniciarJuego } = useDatosJuego();

// Inicializa vacío o como 'Docente' mientras carga el JSON 
   const [nombreDocente, setNombreDocente] = useState('Docente');
   //  Al cargar la pantalla, leemos el localStorage 

 useEffect(() => {
   const datosGuardados = JSON.parse(localStorage.getItem('historialJuegos')) || [];
    setHistorial(datosGuardados);
  
  }, []);

useEffect(() => {
  const obtenerDocente = async () => {
    try {
      const respuesta = await axios.get('/data/docentes.json');

      if (respuesta.data && respuesta.data.length > 0) {
        setNombreDocente(respuesta.data[0].usuario);
      }   

    } catch (error) {
      console.error("Error al leer docentes.json con axios:", error);
    }
  };

  obtenerDocente();

}, []);

//  Función para borrar todo el historial si el profe quiere reiniciar
const borrarHistorial = ()=> {
   localStorage.removeItem('historialJuegos');
    setHistorial([]); };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
        
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Panel del Docente 👩‍🏫
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Alumnos que jugaron hasta el momento: <strong>{historial.length}</strong>
        </Typography>

        {/* Si no hay datos cargados en el localStorage */}
        {historial.length === 0 ? (
          <Box sx={{ p: 3, my: 2, backgroundColor: '#fff8e1', borderRadius: 2 }}>
            <Typography variant="h6" color="warning.main">
              Aún no hay partidas registradas. 🌾
            </Typography>
          </Box>
        ) : (
          /* Tabla con la lista de alumnos */
          <TableContainer component={Paper} variant="outlined" sx={{ my: 3, borderRadius: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#e3f2fd' }}>
                <TableRow>
                  <TableCell><strong>Alumno</strong></TableCell>
                  <TableCell align="center"><strong>Juego 1</strong></TableCell>
                  <TableCell align="center"><strong>Juego 2</strong></TableCell>
                  <TableCell align="center"><strong>Total</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historial.map((jugador, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{jugador.nombre}</TableCell>
                    <TableCell align="center">{jugador.puntajeJ1 || 0} pts</TableCell>
                    <TableCell align="center">{jugador.puntajeJ2 || 0} pts</TableCell>
                    <TableCell align="center">
                      <strong>{(jugador.puntajeJ1 || 0) + (jugador.puntajeJ2 || 0)} pts</strong>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Botones de acción */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3, flexWrap: 'wrap' }}>
          {historial.length > 0 && (
            <Button 
              variant="outlined" 
              color="error" 
              onClick={borrarHistorial}
              sx={{ borderRadius: 3 }}
            >
              🗑️ Borrar Historial
            </Button>
          )}

          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/')}
            sx={{ borderRadius: 3 }}
          >
            🏠 Volver al Inicio
          </Button>


          <Button
            variant="contained"
            color="success"
            onClick={() => {
              reiniciarJuego();
              setNombre(nombreDocente); // Establece el nombre del docente antes de navegar
              navigate('/juego1');
            }}
            sx={{ borderRadius: 3, fontWeight: 'bold' }}
          >
            🎮 Jugar como Docente
          </Button>
          
        </Box>

      </Paper>
    </Container>
  );
};

export default Docente;