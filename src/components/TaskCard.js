import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export const TaskCard = ({ task }) => {
  return (
    <Card key={task.id} sx={{ marginBottom: '15px', borderRadius: '8px' }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2" color="textSecondary">{task.description}</Typography>
      </CardContent>
    </Card>
  );
};
