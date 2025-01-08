import React from 'react';
import Header from './Header';
import { Container, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

const UsersBoards = () => {
  const navigate = useNavigate(); 

  const handleCreateBoard = () => {
    navigate('/board'); 
  };

  return (
    <Container
      sx={{
        width: '70%',
        height: '100%',
        position: 'relative',
      }}
    >
      <Header />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#1B4F50',
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
