import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import homePicture from './homePicture.png';
import leaf from './leaf.svg';
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
  const navigate = useNavigate(); 

  const handleGetStarted = () => {
    navigate('/users-boards'); 
  };

  return (
    <Container
      sx={{
        height: '90vh',
        overflow: 'hidden',
        padding: 0,
        position: 'relative',
      }}
    >
      <img
        src={leaf}
        alt="Leaf"
        style={{
          position: 'absolute',
          left: '35vw',
          objectFit: 'cover',
          zIndex: -1,
        }}
      />
      <Container
        sx={{
          width: '90%',
          height: '100%',
          position: 'relative',
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'space-between',
            justifyContent: 'space-between',
            width: '100%',
            position: 'relative',
            height: '100%',
          }}
        >
          <Box
            sx={{
              textAlign: 'left',
              width: '75%',
              marginTop: '7vh',
            }}
          >
            <Typography
              sx={{
                fontSize: '26px',
                lineHeight: '1.8',
              }}
            >
              Create an account or log in to create your first Kanban board and manage your tasks easily! Organize your projects, achieve goals, and have full control over your work.
            </Typography>
            <Button
              variant="contained"
              sx={{
                marginTop: '5vh',
                textAlign: 'left',
                backgroundColor: '#1B4F50',
                color: '#fff',
                fontSize: '20px',
                padding: '12px 24px',
                width: '200px',
                height: '55px',
                borderRadius: '20px',
              }}
              onClick={handleGetStarted} // Wywołujemy funkcję nawigacyjną
            >
              GET STARTED
            </Button>
          </Box>
          <Box
            sx={{
              width: '70%',
              color: '#fff',
              marginLeft: '30%',
              display: 'flex',
              justifyContent: 'center',
              marginBottom:'35%',
            }}
          >
            
          </Box>
        </Container>
      </Container>
    </Container>
  );
};

export default Home;
