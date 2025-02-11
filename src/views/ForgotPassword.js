import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Box, Button, Container, TextField, Typography, Alert, useTheme } from "@mui/material";
import textFieldStyles from '../styles/textFieldStyles';
import submitButtonStyles from '../styles/submitButtonStyles';
import typographyStyles from '../styles/typographyStyles';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const auth = getAuth();
    const theme = useTheme();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        const actionCodeSettings = {
            url: "http://localhost:3000/reset-password",
            handleCodeInApp: true,
        };

        try {
            await sendPasswordResetEmail(auth, email, actionCodeSettings);
            setMessage("We have sent you an email to reset your password.");
        } catch (err) {
            setError("Error: " + err.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography component="h1" variant="h5" sx={typographyStyles(theme)}>
                    Enter your email to reset your password
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                {message && <Alert severity="success">{message}</Alert>}
                <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleResetPassword}>
                    <TextField
                        sx={textFieldStyles(theme)}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={submitButtonStyles(theme)}>
                        Reset Password
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ForgotPassword;
