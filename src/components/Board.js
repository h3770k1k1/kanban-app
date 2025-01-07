import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import Header from './Header';
import TaskColumn from './TaskColumn'; // Import TaskColumn
import theme from '../styles/theme';

const Board = () => {
  const [tasks, setTasks] = useState({
    backlog: [],
    todo: [],
    inProgress: [],
    done: []
  });

  const handleAddTask = (column) => {
    const newTask = {
      id: Math.random(),
      title: `New Task`,
      description: 'Description for new task'
    };

    setTasks((prevState) => {
      const updatedTasks = { ...prevState };
      updatedTasks[column] = updatedTasks[column].concat(newTask);
      return updatedTasks;
    });
  };

  const handleCloseTask = (column, taskId) => {
    setTasks((prevState) => {
      const updatedTasks = { ...prevState };
      updatedTasks[column] = updatedTasks[column].filter(task => task.id !== taskId);
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
      <Grid container spacing={3} sx={{ marginTop: '20px' }}>
        <Grid item xs={3}>
          <TaskColumn 
            title="Backlog" 
            tasks={tasks.backlog} 
            onAddTask={() => handleAddTask('backlog')} 
            onCloseTask={(taskId) => handleCloseTask('backlog', taskId)} 
            bgColor={theme.teal} 
          />
        </Grid>
        <Grid item xs={3}>
          <TaskColumn 
            title="To Do" 
            tasks={tasks.todo} 
            onAddTask={() => handleAddTask('todo')} 
            onCloseTask={(taskId) => handleCloseTask('todo', taskId)} 
            bgColor={theme.sand} 
          />
        </Grid>
        <Grid item xs={3}>
          <TaskColumn 
            title="In Progress" 
            tasks={tasks.inProgress} 
            onAddTask={() => handleAddTask('inProgress')} 
            onCloseTask={(taskId) => handleCloseTask('inProgress', taskId)} 
            bgColor={theme.lightTeal} 
          />
        </Grid>
        <Grid item xs={3}>
          <TaskColumn 
            title="Done" 
            tasks={tasks.done} 
            onAddTask={() => handleAddTask('done')} 
            onCloseTask={(taskId) => handleCloseTask('done', taskId)} 
            bgColor={theme.darkSlate} 
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Board;
