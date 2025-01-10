import React, { useState } from 'react';
import { Container, Grid, useTheme} from '@mui/material';
import TaskColumn from './TaskColumn';

const Board = () => {
      const theme = useTheme();
  
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
      <Grid container spacing={3} sx={{ marginTop: '20px' }}>
        {Object.keys(tasks).map((columnKey) => (
          <Grid item xs={3} key={columnKey}>
           <TaskColumn
              title={columnKey.charAt(0).toUpperCase() + columnKey.slice(1)}
              tasks={tasks[columnKey]}
              onAddTask={() => handleAddTask(columnKey)}
              onCloseTask={(taskId) => handleCloseTask(columnKey, taskId)}
              bgColor={
                theme.palette[
                  columnKey === 'backlog'
                    ? 'lightGreen'
                    : columnKey === 'todo'
                    ? 'beige'
                    : columnKey === 'inProgress'
                    ? 'lightBlue'
                    : 'grey'
                ]?.main || '#FFFFFF'
              }
              onDropTask={handleDropTask}
              columnKey={columnKey}
              onTaskDescriptionChange={(taskId, newDescription) =>
                handleTaskDescriptionChange(columnKey, taskId, newDescription)
              }
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Board;
