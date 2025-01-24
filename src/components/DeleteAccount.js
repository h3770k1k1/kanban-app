import React from 'react';
import { Box, Button, Container, TextField, Typography, useTheme } from '@mui/material';

const DeleteAccount = () => {
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
                To delete your account, please enter your password
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        color={theme.palette.darkGreen.main}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: theme.palette.darkGreen.main }}
                    >
                        Delete Account
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default DeleteAccount;