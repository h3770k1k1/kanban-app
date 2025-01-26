import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Alert, useTheme } from '@mui/material';
import { reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import DeleteAccountInfo from "./DeleteAccountInfo";
import { useAuth } from "./AuthContext";
import { firestore } from "../FirebaseConfig";

const DeleteAccount = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { user } = useAuth();
    const theme = useTheme();

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!user) {
            setError("User not logged in.");
            return;
        }

        try {
            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential);

            await deleteDoc(doc(firestore, "users", user.uid));

            await deleteUser(user);

            setSuccess(true);
        } catch (err) {
            setError(err.message);
        }
    };

    if (success) {
        return <DeleteAccountInfo />;
    }

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
                        sx={{ mt: 3, mb: 2, backgroundColor: theme.palette.darkGreen.main, color: 'white' }}
                    >
                        Delete Account
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default DeleteAccount;
