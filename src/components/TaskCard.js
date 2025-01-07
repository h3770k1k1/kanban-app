import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const TaskCard = ({ task, onClose }) => {
  return (
    <Card
      key={task.id}
      sx={{
        marginBottom: '15px',
        borderRadius: '8px',
        position: 'relative', // Pozycjonowanie absolutne dla przycisku zamykania
      }}
    >
      <IconButton
        onClick={() => onClose(task.id)} // Wywołanie funkcji onClose z id zadania
        sx={{
          position: 'absolute',
          top: '8px',
          right: '8px',
        }}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>

      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {task.description}
        </Typography>
      </CardContent>
    </Card>
  );
};
