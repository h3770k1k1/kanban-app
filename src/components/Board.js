// Board.js
import React, { useState } from 'react';
import { Container, Box, Grid, Typography, Button } from '@mui/material';
import Header from './Header';
import{ TaskCard } from './TaskCard';  // Import TaskCard

const Board = () => {
  const [tasks, setTasks] = useState({
    backlog: [
      // Initial tasks if any
    ],
    todo: [
      // Initial tasks if any
    ],
    inProgress: [
      // Initial tasks if any
    ],
    done: [
      // Initial tasks if any
    ]
  });

  const handleAddTask = (column) => {
    const newTask = {
      id: Math.random(),
      title: `New Task ${Math.floor(Math.random() * 100)}`,
      description: 'Description for new task'
    };

    setTasks((prevState) => {
      const updatedTasks = Object.assign({}, prevState);
      updatedTasks[column] = updatedTasks[column].concat(newTask);
      return updatedTasks;
    });
  };

  return (
    <Container
      sx={{
        width: '70%',
        height: '100%',
        position: 'relative',
        padding: '20px'
      }}
    >
      <Header />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Grid container spacing={3}>
          {/* Backlog Column */}
          <Grid item xs={3}>
            <Box
              sx={{
                backgroundColor: '#fff3e0',
                borderRadius: '8px',
                padding: '10px',
                height: '80vh',
                overflowY: 'auto'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>Backlog</Typography>
              {tasks.backlog.map((task) => (
                <TaskCard key={task.id} task={task} />  // Use TaskCard here
              ))}
              <Button 
                variant="contained" 
                sx={{ marginTop: '10px', width: '100%' }}
                onClick={() => handleAddTask('backlog')}
              >
                Add Task
              </Button>
            </Box>
          </Grid>

          {/* To Do Column */}
          <Grid item xs={3}>
            <Box
              sx={{
                backgroundColor: '#f4f6f8',
                borderRadius: '8px',
                padding: '10px',
                height: '80vh',
                overflowY: 'auto'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>To Do</Typography>
              {tasks.todo.map((task) => (
                <TaskCard key={task.id} task={task} />  // Use TaskCard here
              ))}
              <Button 
                variant="contained" 
                sx={{ marginTop: '10px', width: '100%' }}
                onClick={() => handleAddTask('todo')}
              >
                Add Task
              </Button>
            </Box>
          </Grid>

          {/* In Progress Column */}
          <Grid item xs={3}>
            <Box
              sx={{
                backgroundColor: '#e3f2fd',
                borderRadius: '8px',
                padding: '10px',
                height: '80vh',
                overflowY: 'auto'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>In Progress</Typography>
              {tasks.inProgress.map((task) => (
                <TaskCard key={task.id} task={task} />  
              ))}
              <Button 
                variant="contained" 
                sx={{ marginTop: '10px', width: '100%' }}
                onClick={() => handleAddTask('inProgress')}
              >
                Add Task
              </Button>
            </Box>
          </Grid>

          {/* Done Column */}
          <Grid item xs={3}>
            <Box
              sx={{
                backgroundColor: '#c8e6c9',
                borderRadius: '8px',
                padding: '10px',
                height: '80vh',
                overflowY: 'auto'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>Done</Typography>
              {tasks.done.map((task) => (
                <TaskCard key={task.id} task={task} />  // Use TaskCard here
              ))}
              <Button 
                variant="contained" 
                sx={{ marginTop: '10px', width: '100%' }}
                onClick={() => handleAddTask('done')}
              >
                Add Task
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Board;
