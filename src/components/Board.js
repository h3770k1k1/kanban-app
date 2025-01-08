import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import TaskColumn from './TaskColumn';  
import theme from '../styles/theme';    

const Board = () => {
  const [tasks, setTasks] = useState({
    backlog: [
    ],
    todo: [],
    inProgress: [],
    done: [],
  });

  const handleAddTask = (column) => {
    const newTask = {
      id: Math.random(),
      title: `New Task`,
      description: 'Description for new task',
    };

    setTasks((prevState) => {
        const updatedTasks = Object.assign({}, prevState); 
        updatedTasks[column] = updatedTasks[column].concat(newTask); 
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
        const task = Object.values(tasks)
          .flat()
          .find((task) => task.id === taskId);
      
        if (task) {
          setTasks((prevState) => {
            const updatedTasks = Object.assign({}, prevState); 
            Object.keys(updatedTasks).forEach((key) => {
              updatedTasks[key] = updatedTasks[key].filter((t) => t.id !== taskId); 
            });
      
            updatedTasks[column].push(task);
            return updatedTasks; 
          });
        }
      };
      

  return (
    <Container
      sx={{
        width: '70%',
        height: '100%',
        position: 'relative',
        padding: '20px',
      }}
    >
      <Grid container spacing={3} sx={{ marginTop: '20px' }}>
        <Grid item xs={3}>
          <TaskColumn
            title="Backlog"
            tasks={tasks.backlog}
            onAddTask={() => handleAddTask('backlog')}
            onCloseTask={(taskId) => handleCloseTask('backlog', taskId)}
            bgColor={theme.teal}
            onDropTask={handleDropTask}
            columnKey="backlog"
          />
        </Grid>
        <Grid item xs={3}>
          <TaskColumn
            title="To Do"
            tasks={tasks.todo}
            onAddTask={() => handleAddTask('todo')}
            onCloseTask={(taskId) => handleCloseTask('todo', taskId)}
            bgColor={theme.sand}
            onDropTask={handleDropTask}
            columnKey="todo"
          />
        </Grid>
        <Grid item xs={3}>
          <TaskColumn
            title="In Progress"
            tasks={tasks.inProgress}
            onAddTask={() => handleAddTask('inProgress')}
            onCloseTask={(taskId) => handleCloseTask('inProgress', taskId)}
            bgColor={theme.lightTeal}
            onDropTask={handleDropTask}
            columnKey="inProgress"
          />
        </Grid>
        <Grid item xs={3}>
          <TaskColumn
            title="Done"
            tasks={tasks.done}
            onAddTask={() => handleAddTask('done')}
            onCloseTask={(taskId) => handleCloseTask('done', taskId)}
            bgColor={theme.darkSlate}
            onDropTask={handleDropTask}
            columnKey="done"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Board;
