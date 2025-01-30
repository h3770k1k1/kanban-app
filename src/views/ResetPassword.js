import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmPasswordReset, getAuth } from "firebase/auth";
import { Box, Button, Container, TextField, Typography, Alert, useTheme } from "@mui/material";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [oobCode, setOobCode] = useState(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const auth = getAuth();
    const theme = useTheme();

    useEffect(() => {
        const code = searchParams.get("oobCode");
        if (code) {
            setOobCode(code);
        } else {
            setError("Invalid reset link.");
        }
    }, [searchParams]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!newPassword) {
            setError("Password cannot be empty.");
            return;
        }

        try {
            await confirmPasswordReset(auth, oobCode, newPassword);
            setMessage("Your password has been updated! Redirecting to login...");
            setTimeout(() => navigate("/login"), 3000);
        } catch (err) {
            setError("Error resetting password: " + err.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
                    Reset Your Password
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                {message && <Alert severity="success">{message}</Alert>}
                <Box component="form" noValidate onSubmit={handleResetPassword} sx={{ mt: 2 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="New Password"
                        type="password"
                        autoComplete="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        autoFocus
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2,  backgroundColor: theme.palette.darkGreen.main, }}>
                        Change Password
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ResetPassword;
