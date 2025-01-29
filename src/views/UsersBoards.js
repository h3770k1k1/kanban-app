import React from 'react';
import { Container, Box, Typography, useTheme } from '@mui/material';
import NewBoardButton from '../components/NewBoardButton';
import { useAuth } from '../context/AuthContext';
// import BoardButton from './BoardButton';

const UsersBoards = () => {
    const theme = useTheme();
    const buttonColors = [theme.palette.darkGreen.main, theme.palette.teal.main];
    const buttonTexts = ['Create new board', 'Board Name'];
    const { user } = useAuth();

    return user ? (
        <Container
            sx={{
                width: '80%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: 'repeat(3, 1fr)',
                    gridRowGap: '5vh',
                    marginTop: '5vh',
                    paddingLeft: '5vw',
                }}
            >
                <NewBoardButton buttonColor={buttonColors[0]} buttonText={buttonTexts[0]} />
                {/* Uncomment and implement BoardButton if needed */}
                {/* <BoardButton buttonColor={buttonColors[1]} buttonText={buttonTexts[1]} /> */}
            </Box>
        </Container>
    ) : (
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
                Please log in to view your boards.
            </Typography>
        </Container>
    );
};

export default UsersBoards;
