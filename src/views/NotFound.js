import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Box, useTheme } from '@mui/material';

const NotFound = ({ isError = false }) => {
    const navigate = useNavigate();
    const theme = useTheme();

    const goHome = () => {
        navigate('/');
    };

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '10vh' }}>
            <Box>
                <Typography variant="h1" component="h1" color="error" gutterBottom>
                    {isError ? 'Something Went Wrong' : '404'}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {isError
                        ? 'An unexpected error occurred. Please try again later.'
                        : 'Oops! The page you are looking for does not exist.'}
                </Typography>
                <Typography variant="body1" paragraph>
                    {isError
                        ? "We're sorry for the inconvenience. You can go back to the home page or contact support if the issue persists."
                        : "It seems you may have taken a wrong turn. Don't worry, it happens to the best of us!"}
                </Typography>
                <Button
                    variant="contained"
                    onClick={goHome}
                    sx={{
                        backgroundColor: theme.palette.customColors.darkYellow,
                    }}
                >
                    Go Back to Home
                </Button>
            </Box>
        </Container>
    );
};

export default NotFound;
