import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Header from './components/Header';
import homePicture from './components/homePicture.png'
import leaf from './components/leaf.svg'

function App() {
  return (
    <Container 
      sx={{
        height: '100vh',
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
          top: '25vh',
          left: '40vw',
          objectFit: 'cover', 
          zIndex: -1,  
        }}
      />
      <Container 
        sx={{
          width: '70%',
          height: '100%',
          position: 'relative',  
        }}
      >
        <Header />
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
            >
              GET STARTED
            </Button>
          </Box>
          <Box 
            sx={{
              width: '75%',
              color: '#fff',
              marginLeft: '30%',
              display: 'flex',
              justifyContent: 'center',
              marginBottom:'35%',
            }}
          >
            <img 
              src={homePicture} 
              alt="Home" 
              style={{
                width: '100%', 
                height: 'auto', 
                objectFit: 'contain', 
              }}
            />
          </Box>
        </Container>
      </Container>
    </Container>
  );
}

export default App;
