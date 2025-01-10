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

  const bgColor =
    theme.palette[
      columnKey === 'backlog'
        ? 'lightGreen'
        : columnKey === 'todo'
        ? 'beige'
        : columnKey === 'inProgress'
        ? 'lightBlue'
        : 'grey'
    ]?.main || '#FFFFFF';

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
