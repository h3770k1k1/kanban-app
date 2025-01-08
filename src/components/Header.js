import React from 'react';
import {Container, Box, Typography } from '@mui/material';
import logo from './logo.svg'

const Header = () => {
  return (
<Container sx={{display:'flex', justifyContent:'center'}}>
    <Box
      sx={{
        top: 0,
        height: '12vh',
        width:'75%',
        display: 'flex',
        justifyContent: 'flexStart',
        alignItems: 'center',
        borderBottom: 2,
        borderColor: 'black',
      }}
    >
     <Typography> <img src={logo} alt="Logo" /></Typography>
    </Box></Container>
  );
};

export default Header;
