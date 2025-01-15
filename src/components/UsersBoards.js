import React from 'react';
import { Container, Box, useTheme, Grid} from '@mui/material';
import NewBoardButton from './NewBoardButton';
import BoardButton from './BoardButton';

const UsersBoards = () => {
  const theme = useTheme();
  const buttonColors = [theme.palette.darkGreen.main,theme.palette.teal.main ] 
  const buttonTexts = ['Create new board','Board Name']

  return (
    <Container
      sx={{
        width: '80%',
        height: '100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
      }}
    >
        <Box sx={{
        width:'95%'
      }}      >
        <NewBoardButton buttonColor={buttonColors[0]} buttonText={buttonTexts[0]} />
        <BoardButton buttonColor={buttonColors[1]} buttonText={buttonTexts[1]}/>
        <BoardButton buttonColor={buttonColors[1]} buttonText={buttonTexts[1]}/>
        <BoardButton buttonColor={buttonColors[1]} buttonText={buttonTexts[1]}/>
        <BoardButton buttonColor={buttonColors[1]} buttonText={buttonTexts[1]}/>
        <BoardButton buttonColor={buttonColors[1]} buttonText={buttonTexts[1]}/>
        <BoardButton buttonColor={buttonColors[1]} buttonText={buttonTexts[1]}/>
      </Box>
    </Container>
  );
};

export default UsersBoards;
