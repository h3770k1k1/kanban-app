import React from 'react';
import { Box, Typography } from '@mui/material';
import logo from './logo.svg'

const Header = () => {
  return (
    <Box
      sx={{
        top: 0,
        height: '12%',
        display: 'flex',
        justifyContent: 'flexStart',
        alignItems: 'center',
        borderBottom: 2,
        borderColor: 'black',
      }}
    >
     <Typography> <img src={logo} alt="Logo" /></Typography>
    </Box>
  );
};

export default Header;
