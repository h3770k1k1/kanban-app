import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Alert, CircularProgress, useTheme } from '@mui/material';
import { AccountManager } from "../lib/AccountManager"; // Import the AccountManager
import DeleteAccountInfo from "../components/DeleteAccountInfo";
import { useAuth } from "../context/AuthContext";

const DeleteAccount = () => {
    const theme = useTheme();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);

        if (!user) {
            setError("User not logged in.");
            setLoading(false);
            return;
        }

        if (!password) {
            setError("Please enter your password.");
            setLoading(false);
            return;
        }

        try {
            const accountManager = new AccountManager();
            await accountManager.deleteAccount(password);
            setSuccess(true);
        } catch (err) {
            setError(err.message || 'An error occurred while deleting the account.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return <DeleteAccountInfo />;
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
                <Box component="form" noValidate onSubmit={handleDeleteAccount} sx={{ mt: 1 }}>
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
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Delete Account'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default DeleteAccount;
