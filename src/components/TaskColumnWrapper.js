import React from 'react';
import { Grid } from '@mui/material';
import TaskColumn from './TaskColumn';
import columnsConfig from '../lib/columnsConfig';
import { handleDropTask, handleAddTask, handleCloseTask, handleTaskDescriptionChange } from '../scripts/taskHandlers';

const TaskColumnWrapper = ({ columnKey, tasks, setTasks }) => {
  const columnData = columnsConfig[columnKey] || { name: "Unknown", color: "#FFFFFF" };

  return (
      <Grid item xs={3}>
        <TaskColumn
            title={columnData.name}
            tasks={tasks[columnKey]}
            onAddTask={() => handleAddTask(tasks, setTasks, columnKey)}
            onCloseTask={(taskId) => handleCloseTask(tasks, setTasks, columnKey, taskId)}
            onDropTask={(taskId) => handleDropTask(taskId, columnKey, tasks, setTasks)}
            bgColor={columnData.color}
            columnKey={columnKey}
            onTaskDescriptionChange={(taskId, newDescription) =>
                handleTaskDescriptionChange(tasks, setTasks, columnKey, taskId, newDescription)
            }
        />
      </Grid>
  );
};

export default TaskColumnWrapper;
