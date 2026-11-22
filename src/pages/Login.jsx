import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDatosJuego } from '../hooks/useDatosJuegos';
import { Container, Box, Typography, TextField, Button, Paper, Alert} from '@mui/material';
import { validarDocente } from '../servicios/servicioPreguntas';
const Login = () => {
  // 1. Estado local para capturar el texto mientras el niño escribe
  const [nombreIngresado, setNombreIngresado] = useState('');
const [passwordDocente, setPasswordDocente] = useState('');
  const [esDocente, setEsDocente] = useState(false); // 👈 Esta es la variable que falta
const [error, setError] = useState('');
  //  Traemos la función setNombre de nuestro Contexto Global
  const { setNombre, reiniciarJuego } = useDatosJuego();

  //  Hook de React Router para cambiar de pantalla
  const navigate = useNavigate();




  // Función al presionar "Comenzar"
  const guardarNombreYComenzar = (e) => {   
    e.preventDefault();
     
    // Convertimos a minúsculas y quitamos espacios extra
     const nombreLimpio = nombreIngresado.trim().toLowerCase();

if (nombreLimpio === 'tanos') {

  // Cambia el formulario para pedir la contraseña
  setEsDocente(true);

  // Limpia cualquier mensaje de error anterior
  setError('');

} else{
//  Limpiamos puntajes y localStorage del jugador anterior
          reiniciarJuego();
        localStorage.removeItem('rondaJ1');


   
    // Guardamos el nombre en datosdeljuego.jsx para que esté disponible en toda la app
    setNombre(nombreIngresado);

    // Navegamos hacia el primer juego
    navigate('/juego1');

}
};


//  Función para validar la clave del docente
const manejarPasswordDocente = async (e) => {

  // Evita que el formulario se recargue
  e.preventDefault();

  // Validamos el usuario y la contraseña mediante Axios
  const docenteValido = await validarDocente(
    nombreIngresado.trim().toLowerCase(),
    passwordDocente.trim()
  );

  // Comprobamos si el docente es válido
  if (docenteValido) {

    // Si los datos son correctos, vamos al panel docente
    navigate('/docente');

  } else {

    // Si la contraseña es incorrecta, mostramos un error
    setError('Contraseña incorrecta');

  }
};





  return (

    <Box
  sx={{
    backgroundImage: 'url(/imagenes/GranjaLogin.png)',
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxSizing: 'border-box'
  }}
>
  <Container maxWidth="sm">
    {/* 2️⃣ LA TARJETA DEL FORMULARIO: Fondo blanco semitransparente */}
    <Paper
      elevation={4}
      sx={{
        p: 4,
        borderRadius: 6,
        background: 'linear-gradient(135deg, rgba(235, 75, 75, 0.95) 0%, rgba(12, 9, 193, 0.9) 100%)',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}
    >

      <Box
    component="img"
    src="/imagenes/GranjaLoginFormulario.png" // 👈 Poné la ruta de tu foto (granja, logo o animalitos)
    alt="Ilustración Granja"
    sx={{
      objectFit: 'contain',
      width: '100%',
      height:300,
      objectFit: 'cover',
      borderRadius: 4,
      mb: 3,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }}
  />
      {/* 1. TÍTULO Y SUBTÍTULO */}
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        fontWeight="bold"
      >
        {esDocente ? 'Acceso Docente 👩‍🏫' : '¡Bienvenido a la aventura! 🚜'}
      </Typography>

      <Typography
        variant="h5"
        align="center"
        component="h1"
        sx={{ mb: 1, color: '#0b0909' }}
      >
        {esDocente
          ? 'Hola Profe, ingresá tu contraseña para ver los puntajes.'
          : 'Escribí tu nombre para comenzar a jugar.'}
      </Typography>

      {/* 2. ALERTA DE ERROR */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!esDocente ? (
        /* FORMULARIO DEL ALUMNO */
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
            sx={{
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
          >
            EMPIEZA A JUGAR NIÑO
          </Button>
        </Box>
      ) : (
        /* FORMULARIO DEL DOCENTE */
        <Box component="form" onSubmit={manejarPasswordDocente}>
          <TextField
            label="Contraseña de Docente"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={passwordDocente}
            onChange={(e) => setPasswordDocente(e.target.value)}
            sx={{ mb: 3 }}
            autoFocus
          />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            size="large"
            sx={{
              py: 1.5,
              fontWeight: 'bold'
            }}
          >
            Ingresar al Panel
          </Button>

          <Button
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              textTransform: 'none'
            }}
            onClick={() => {
              setEsDocente(false);
              setPasswordDocente('');
              setError('');
            }}
          >
            ← Volver atrás
          </Button>
        </Box>
      )}
    </Paper>
  </Container>
</Box>








  );
};

export default Login;