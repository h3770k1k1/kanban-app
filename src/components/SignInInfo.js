import React from 'react';
import {Container, Typography, useTheme} from '@mui/material';

const SignInInfo = () => {
    const theme = useTheme();
    return (
        <Container
            sx={{
                width: '100%',
                height: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Typography variant="h5" color= {theme.palette.customColors.darkYellow} align="center">
                Signed In successfully
            </Typography>
        </Container>
    );
};

export default SignInInfo;
