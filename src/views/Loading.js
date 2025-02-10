import React, { useState, useEffect } from 'react';
import { CircularProgress, Box, Typography, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Loading = ({ timeout = 5000, children }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

    useEffect(() => {
        let timeoutId;
        let locationDetected = false;

        if (location) {
            locationDetected = true;
            setTimeout(() => setIsLoading(false), 1000);
        }

        timeoutId = setTimeout(() => {
            if (!locationDetected) {
                console.warn("Location was not detected within the timeout.");
                setTimeout(() => setIsLoading(false), 1000);
            }
        }, timeout);

        return () => clearTimeout(timeoutId);
    }, [location, timeout]);


    if (isLoading) {
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
            color: theme.palette.customColors.darkYellow,
          }}
        />
        <Typography
          sx={{
            marginTop: '5vh',
            fontSize: '1.5rem',
            fontWeight: '500',
            color:theme.palette.customColors.darkYellow,
          }}
        >
          Loading...
        </Typography>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </Box>
    );
  }

  return children;
};

export default Loading;
