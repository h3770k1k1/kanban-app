import React, { useState } from 'react';
import { Container, Grid, Button,Box, TextField} from '@mui/material';
import TaskColumn from './TaskColumn';
import theme from '../styles/theme';
import CheckIcon from '@mui/icons-material/Check';

const Board = () => {
  const [tasks, setTasks] = useState({
    backlog: [],
    todo: [],
    inProgress: [],
    done: [],
  });

  const handleAddTask = (column) => {
    const newTask = {
      id: Math.random(),
      description: '', 
    };

    setTasks((prevState) => {
      const updatedTasks = Object.assign({}, prevState);
      updatedTasks[column] = updatedTasks[column].slice();
      updatedTasks[column].push(newTask);
      return updatedTasks;
    });
  };

  const handleTaskDescriptionChange = (column, taskId, newDescription) => {
    setTasks((prevState) => {
      const updatedTasks = Object.assign({}, prevState);
      updatedTasks[column] = updatedTasks[column].map((task) => {
        if (task.id === taskId) {
          const updatedTask = Object.assign({}, task);
          updatedTask.description = newDescription;
          return updatedTask;
        }
        return task;
      });
      return updatedTasks;
    });
  };

  const handleCloseTask = (column, taskId) => {
    setTasks((prevState) => {
      const updatedTasks = Object.assign({}, prevState);
      updatedTasks[column] = updatedTasks[column].filter((task) => task.id !== taskId);
      return updatedTasks;
    });
  };

  const handleDropTask = (taskId, column) => {
    let task = null;
    Object.keys(tasks).forEach((key) => {
      const foundTask = tasks[key].find((task) => task.id === taskId);
      if (foundTask) {
        task = foundTask;
      }
    });

    if (task) {
      setTasks((prevState) => {
        const updatedTasks = Object.assign({}, prevState);
        Object.keys(updatedTasks).forEach((key) => {
          updatedTasks[key] = updatedTasks[key].filter((t) => t.id !== taskId);
        });

        updatedTasks[column] = updatedTasks[column].slice();
        updatedTasks[column].push(task);
        return updatedTasks;
      });
    }
  };

  return (
    <Container sx={{ width: '70%', height: '100%', position: 'relative', padding: '20px' }}>
     <Box sx={{width:'100%', display:'flex', justifyContent:'flex-start',marginTop:'0.5vh'}}> <TextField
          id="standard-helperText"
          label=""
          defaultValue="My Board"
          helperText="Name your board"
          variant="standard"
        /></Box>
      <Grid container spacing={3} sx={{ marginTop: '0.5vh' }}>
        {Object.keys(tasks).map((columnKey) => (
          <Grid item xs={3} key={columnKey}>
            <TaskColumn
              title={columnKey.charAt(0).toUpperCase() + columnKey.slice(1)}
              tasks={tasks[columnKey]}
              onAddTask={() => handleAddTask(columnKey)}
              onCloseTask={(taskId) => handleCloseTask(columnKey, taskId)}
              bgColor={theme[columnKey]}
              onDropTask={handleDropTask}
              columnKey={columnKey}
              onTaskDescriptionChange={(taskId, newDescription) =>
                handleTaskDescriptionChange(columnKey, taskId, newDescription)
              }
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{width:'100%', display:'flex', justifyContent:'flex-end',}}>
      <Button sx={{ backgroundColor: theme.darkGreen, marginTop:'3vh',
    color: 'white',
    fontSize: '20px',       
    fontWeight: 'medium',     
    padding: '12px 24px',   
    borderRadius: '8px', justifyContent: 'space-between'}}><CheckIcon  sx={{ marginRight: '0.5rem' }}/>SAVE BOARD</Button>
    </Box></Container>
  );
};

export default Board;
