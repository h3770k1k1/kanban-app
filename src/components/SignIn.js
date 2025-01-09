import React from 'react';
import { Box, Button, Container, TextField, Typography, CssBaseline, Grid, Link } from '@mui/material';
import theme from '../styles/theme';


const SignIn = () => {
   
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
                Sign In
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    color='theme.link'
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    color='theme.link'
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor:theme.darkGreen}}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link sx={{color:theme.link}} href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link sx={{color:theme.link}}href="#" variant="body2">
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
