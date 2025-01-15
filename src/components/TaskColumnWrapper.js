import React from 'react';
import { Grid, useTheme } from '@mui/material';
import TaskColumn from './TaskColumn';

const TaskColumnWrapper = ({
  title,
  tasks,
  onAddTask,
  onCloseTask,
  onDropTask,
  onTaskDescriptionChange,
  columnKey,
}) => {
  const theme = useTheme();
  let bgColor;

  switch (columnKey) {
    case 'backlog':
      bgColor = theme.palette.lightGreen?.main || '#FFFFFF';
      break;
    case 'todo':
      bgColor = theme.palette.beige?.main || '#FFFFFF';
      break;
    case 'inProgress':
      bgColor = theme.palette.lightBlue?.main || '#FFFFFF';
      break;
    default:
      bgColor = theme.palette.grey?.main || '#FFFFFF';
      break;
  }
  

  return (
    <Grid item xs={3}>
      <TaskColumn
        title={title}
        tasks={tasks}
        onAddTask={onAddTask}
        onCloseTask={onCloseTask}
        bgColor={bgColor}
        onDropTask={onDropTask}
        columnKey={columnKey}
        onTaskDescriptionChange={onTaskDescriptionChange}
      />
    </Grid>
  );
};

export default TaskColumnWrapper;
