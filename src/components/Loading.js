import React, { useState, useEffect } from 'react';
import { CircularProgress, Box, Typography, useTheme } from '@mui/material';

const Loading = ({ delay = 1000, onComplete }) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, onComplete]);

  if (!isVisible) {
    return null; 
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        flexDirection: 'column',
      }}
    >
      <CircularProgress
        size={80}
        sx={{
          animation: 'spin 1.5s infinite linear',
          color: theme.palette.darkGreen.main,
        }}
      />
      <Typography
        sx={{
          marginTop: '5vh',
          fontSize: '1.5rem',
          fontWeight: '500',
          color: theme.palette.darkGreen.main,
        }}
      >
        Loading...
      </Typography>
      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Loading;
