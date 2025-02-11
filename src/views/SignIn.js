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
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AccountManager } from '../lib/AccountManager';
import SignInInfo from '../components/SignInInfo';
import textFieldStyles from '../styles/textFieldStyles';
const SignIn = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { user } = useAuth();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const accountManager = new AccountManager();
            await accountManager.signIn(email, password);
            navigate('/');
        } catch (err) {
            console.error('Sign In Error:', err);
            setError('Incorrect email or password');
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
                <Typography component="h1" variant="h5" color={theme.palette.customColors.white}>
                    Sign In
                </Typography>
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                <Box component="form" noValidate onSubmit={handleSignIn} sx={{ mt: 1 }}>
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
                    <TextField
                        sx={textFieldStyles(theme)}
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
                        sx={{
                            mt: 3, mb: 2,
                            backgroundColor: theme.palette.customColors.darkYellow,
                            color: theme.palette.customColors.white,
                        }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/forgot-password" variant="body2" sx={{ color: theme.palette.customColors.brown }}>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/sign-up" variant="body2" sx={{ color: theme.palette.customColors.brown }}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignIn;
