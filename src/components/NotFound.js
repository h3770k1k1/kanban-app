import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Box, useTheme } from '@mui/material';

const NotFound = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/'); // Przenosi użytkownika na stronę główną
    };
    const theme = useTheme();

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '10vh' }}>
            <Box>
                <Typography variant="h1" component="h1" color="error" gutterBottom>
                    404
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Oops! The page you are looking for does not exist.
                </Typography>
                <Typography variant="body1" paragraph>
                    It seems you may have taken a wrong turn. Don't worry, it happens to the best of us!
                </Typography>
                <Button variant="contained" onClick={goHome} sx={{ 
                        backgroundColor: theme.palette.darkGreen.main,
                    }}>
                    Go Back to Home
                </Button>
            </Box>
        </Container>
    );
};

export default NotFound;
