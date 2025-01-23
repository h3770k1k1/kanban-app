import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Grid,
    Link,
    useTheme,
    Alert,
} from '@mui/material';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import SignInInfo from './SignInInfo';
import { validateForm } from './formValidation';

const SignUp = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { user } = useAuth();

    const { isValid, isEmailValid, isPasswordValid, isPasswordsMatch } = validateForm(email, password, confirmPassword);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: email.split('@')[0],
            });

            setSuccess(true);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return user ? (
        <SignInInfo />
    ) : (
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
                {success && <Alert severity="success" sx={{ mt: 2 }}>Account created successfully!</Alert>}
                <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        color="primary"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!isEmailValid}
                        helperText={!isEmailValid ? 'Enter a valid email' : ''}
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
                        color="primary"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!isPasswordValid}
                        helperText={!isPasswordValid ? 'Password must be at least 6 characters' : ''}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        color="primary"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={!isPasswordsMatch}
                        helperText={!isPasswordsMatch ? 'Passwords do not match' : ''}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3, mb: 2,
                            backgroundColor: isValid
                                ? theme.palette.darkGreen.main
                                : theme.palette.grey[400],
                        }}
                        disabled={!isValid}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/sign-in" variant="body2" sx={{ color: theme.palette.teal.main }}>
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
