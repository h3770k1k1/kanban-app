import React from 'react';
import { Container, Box, Button,useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

const UsersBoards = () => {
  const theme = useTheme();
  const navigate = useNavigate(); 

  const handleCreateBoard = () => {
    navigate('/board'); 
  };

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
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.darkGreen.main,
            color: '#fff',
            width: '25%',
            height: '15vh',
            borderRadius: '16px',
            margin: '5vh 0 5vh 5vh',
            fontSize: '1.2rem',
            textTransform: 'none',
          }}
          onClick={handleCreateBoard} 
        >
          Create new board
        </Button>
      </Box>
    </Container>
  );
};

export default UsersBoards;
