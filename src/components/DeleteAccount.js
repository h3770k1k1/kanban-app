import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Alert, useTheme } from '@mui/material';
import { useAuth } from "./AuthContext";
import { AccountManager } from "../AccountManager";

const DeleteAccount = () => {
    const theme = useTheme();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { user } = useAuth();

    const onSubmit = (e) => {
        e.preventDefault();
        AccountManager.handleDeleteAccount(password, user, setError, setSuccess);
    };

    if (success) {
        return (
            <Container component="main" maxWidth="xs">
                <Box sx={{ mt: 8, textAlign: 'center' }}>
                    <Typography variant="h5" color="grey">
                        Your account has been deleted successfully.
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
                    To delete your account, please enter your password
                </Typography>
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
