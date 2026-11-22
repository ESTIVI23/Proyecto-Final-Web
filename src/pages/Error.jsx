import { Box, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();
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
                p: 2,
                boxSizing: 'border-box'
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    borderRadius: 6,
                    background: 'linear-gradient(135deg, rgba(236, 194, 26, 0.95) 0%, rgba(211, 26, 79, 0.9) 100%)',
                    backgroundColor: 'rgba(247, 12, 138, 0.95)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                    overflow: 'hidden'
                }}
            >
                {/* Ícono animado de la granja \*/}
                <Typography variant="h1" sx={{ textAlign: 'center', fontSize: '4rem', mb: 1 }}>🐮❓</Typography>
                <Typography variant="h4" sx={{ textAlign: 'center', color: '#160b0b', mb: 2 }}>¡Upps, Nombre no permitido!</Typography>
                <Typography variant="body1" sx={{ mb: 2, color: '#333', fontSize: '1.1rem', textAlign: 'center' }}>
                    Por favor ingresá <b>solo tu nombre con letras</b> (mayúsculas o minúsculas).
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: '#333', fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>
                    ❌ No se permiten <b>números</b> ni <b>símbolos (como @, #, $)</b>.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{ py: 1.5, fontSize: '1.2rem', fontWeight: 'bold', borderRadius: 4 }}
                    onClick={() => navigate('/')}
                >
                    🔄 Volver a intentar
                </Button>
            </Paper>
        </Box>
    );
};
export default Error;







