import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDatosJuego } from '../context/DatosDelJuego';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';

const Login = () => {
  // 1. Estado local para capturar el texto mientras el niño escribe
  const [nombreIngresado, setNombreIngresado] = useState('');

  // 2. Traemos la función setNombre de nuestro Contexto Global
  const { setNombre } = useDatosJuego();

  // 3. Hook de React Router para cambiar de pantalla
  const navigate = useNavigate();

  // Función al presionar "Comenzar"
  const guardarNombreYComenzar = (e) => {
    e.preventDefault();

   
    // Guardamos el nombre en el contexto global
    setNombre(nombreIngresado);

    // Navegamos hacia el primer juego
    navigate('/juego1');
  };

  return (
    <Container maxWidth="sm"> 
      <Paper elevation={1} sx={{ p: 4, mt: 6, borderRadius: 18 }}>

        <Typography variant="h4" component="h1" gutterBottom align="center">
          ¡Bienvenido a la aventura!
        </Typography>

        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          Escribe tu nombre para comenzar a jugar.
        </Typography>


        <Box component="form" onSubmit={guardarNombreYComenzar}>
          <TextField
            label="Tu nombre"
            variant="outlined"
            fullWidth
            required
            value={nombreIngresado}
            onChange={(e) => setNombreIngresado(e.target.value)}
            slotProps={{
              htmlInput: {
                pattern: "(?=.*\\S)[A-Za-záéíóúÁÉÍÓÚüÜñÑ ]+"
              }
            }}
            sx={{ mb: 3 }}


          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
          >
            EMPIEZA A JUGAR NIÑO
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;