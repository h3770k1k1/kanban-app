import React from 'react';
import { Box, Button, Container, TextField, Typography, useTheme } from '@mui/material';

const ForgotPassword = () => {
    const theme = useTheme();

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" sx={{textAlign:'center'}}>
                Enter your email to reset your password
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        color={theme.palette.teal.main}
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: theme.palette.darkGreen.main }}
                    >
                        Reset Password
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ForgotPassword;
