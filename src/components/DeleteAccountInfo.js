import React from 'react';
import { Container, Typography } from '@mui/material';

const DeleteAccountInfo = () => {
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
            <Typography variant="h5" color="textSecondary" align="center">
               Deleted account successfully
            </Typography>
        </Container>
    );
};

export default DeleteAccountInfo;
