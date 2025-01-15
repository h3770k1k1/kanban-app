import React from 'react';
import { Container, Box, useTheme} from '@mui/material';
import NewBoardButton from './NewBoardButton';

const UsersBoards = () => {
  const theme = useTheme();
  const buttonColor = theme.palette.darkGreen.main; 
  const buttonText = 'Create new board'; 

  return (
    <Container
      sx={{
        width: '80%',
        height: '100%',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
        }}
      >
        <NewBoardButton buttonColor={buttonColor} buttonText={buttonText} />
      </Box>
    </Container>
  );
};

export default UsersBoards;
