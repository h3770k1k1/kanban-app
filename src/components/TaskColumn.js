import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { TaskCard } from './TaskCard'; 
import theme from '../styles/theme';

const TaskColumn = ({ title, tasks, onAddTask, bgColor, onCloseTask }) => {
  return (
    <Box
      sx={{
        backgroundColor: bgColor,
        borderRadius: '8px',
        padding: '10px',
        height: '75vh',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
        {title}
      </Typography>
      {tasks.map((task) => (
        <TaskCard 
          key={task.id} 
          task={task} 
          onClose={onCloseTask} // Przekazujemy funkcję zamykania
        />
      ))}
      <Button 
        variant="contained" 
        sx={{ marginTop: '10px', width: '100%', backgroundColor: theme.darkGreen }}
        onClick={onAddTask}
      >
        Add Task
      </Button>
    </Box>
  );
};

export default TaskColumn;
