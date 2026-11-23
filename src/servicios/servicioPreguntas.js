import axios from 'axios';

// Función asíncrona para traer las preguntas del Juego 1
export const obtenerPreguntasJuego1 = async () => {
  try {
    // 1. Axios busca el archivo JSON en la carpeta public
    const respuesta = await axios.get('/data/preguntasJuego1.json');
  
    // 2. Retornamos los datos del JSON
    return respuesta.data;  

  } catch (error) {
    console.error("Error al cargar las preguntas:", error);

    throw new Error("No se pudieron cargar las preguntas del juego.");
  }
};



export const obtenerPreguntasJuego2 = async () => {
  try {
    // 1. Axios busca el archivo JSON en la carpeta public
    const respuesta = await axios.get('/data/preguntasJuego2.json');

    // 2. Retornamos los datos del JSON
    return respuesta.data;

  } catch (error) {
    console.error("Error al cargar las preguntas:", error);

    throw new Error("No se pudieron cargar las preguntas del juego.");
  }
  
};





// Función para validar si el usuario es Docente
export const validarDocente = async (usuarioInput, passwordInput) => {
  try {

    // 1. Consultamos el archivo JSON de docentes
    const respuesta = await axios.get('/data/docentes.json');

    // 2. Guardamos los datos de los docentes
    const docentes = respuesta.data;

    // 3. Buscamos si coinciden el usuario y la contraseña
    // toLowerCase() permite comparar sin distinguir mayúsculas y minúsculas
    const encontrado = docentes.find(
      (d) =>
        d.usuario.toLowerCase() === usuarioInput.toLowerCase() &&
        d.password === passwordInput
    );

    // 4. Devolvemos el docente encontrado o null
    return encontrado || null;

  } catch (error) {

    // 5. Capturamos cualquier error
    console.error("Error al validar el docente:", error);

    return null;
  }
};