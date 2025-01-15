import React from 'react';
import { Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import './BoardButton.css';

const BoardButton = ({ buttonColor, buttonText }) => {
  return (
    <Button
      className="board-button"
      variant="contained"
      sx={{
        backgroundColor: buttonColor,
        position: 'relative', 
      }}
    >
      {buttonText}
      <ClearIcon
        sx={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          fontSize: '1.5rem',
          color: 'white',
          cursor: 'pointer',
        }}
      />
    </Button>
  );
};

export default BoardButton;
