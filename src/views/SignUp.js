import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Alert,
    Grid,
    Link,
    CircularProgress,
    useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AccountManager } from "../lib/AccountManager";
import { SignUpValidator } from '../helpers/validateSignUpForm';

const SignUp = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);

        const validation = SignUpValidator.validate({ email, password, confirmedPassword });

        if (!validation.isValid) {
            const errorMessages = Object.values(validation.errors).join(' ');
            setError(errorMessages);
            setLoading(false);
            return;
        }

        try {
            // Instantiate AccountManager here
            const accountManager = new AccountManager();
            await accountManager.signUp(email, password, email.split('@')[0]);
            setSuccess(true);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

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
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                {success && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        Account created successfully! Redirecting...
                    </Alert>
                )}
                <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 1 }}>
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
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmedPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmedPassword"
                        autoComplete="new-password"
                        value={confirmedPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            backgroundColor: theme.palette.darkGreen.main,
                        }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link sx={{ color: theme.palette.darkGreen.main }} href="/sign-in" variant="body2">
                                {"Already have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignUp;
