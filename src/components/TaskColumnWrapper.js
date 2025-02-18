import React from 'react';
import { Grid } from '@mui/material';
import TaskColumn from './TaskColumn';
import columnsConfig from '../lib/columnsConfig';

const TaskColumnWrapper = ({ title, tasks, onAddTask, onCloseTask, onDropTask, onTaskDescriptionChange, columnKey }) => {
  const columnData = columnsConfig[columnKey] || { name: "Unknown", color: "#FFFFFF" };

  return (
      <Grid item xs={3}>
        <TaskColumn
            title={columnData.name}
            tasks={tasks}
            onAddTask={onAddTask}
            onCloseTask={onCloseTask}
            bgColor={columnData.color}
            onDropTask={onDropTask}
            columnKey={columnKey}
            onTaskDescriptionChange={onTaskDescriptionChange}
        />
      </Grid>
  );
};

export default TaskColumnWrapper;
