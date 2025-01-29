import React, { useState } from "react";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { Box, Button, Container, TextField, Typography, Alert, useTheme } from "@mui/material";

const ForgotPassword = () => {
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const auth = getAuth();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!email) {
            setError("Please enter your email address.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("A password reset email has been sent.");
        } catch (err) {
            setError("Error: " + err.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
                    Forgot Password?
                </Typography>
                <Typography variant="body2" sx={{ textAlign: "center", mt: 1, color: theme.palette.text.secondary }}>
                    Enter your email address to reset your password. We will send you a link to create a new one.
                </Typography>
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
                <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleResetPassword}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
