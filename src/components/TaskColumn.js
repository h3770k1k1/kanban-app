import React from 'react';
import { useDrop } from 'react-dnd';
import { Box, Typography, Button, useTheme} from '@mui/material';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, onAddTask, bgColor, onCloseTask, onDropTask, columnKey, onTaskDescriptionChange }) => {
  const theme = useTheme();
  const [{ isOver }, dropRef] = useDrop({
    accept: 'TASK',
    drop: (item) => onDropTask(item.id, columnKey),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <Box
      ref={dropRef}
      sx={{
        backgroundColor: isOver ? theme.palette.teal.main : bgColor,
        borderRadius: '8px',
        padding: '10px',
        height: '65vh',
        overflowY: 'auto',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
        {title}
      </Typography>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onClose={onCloseTask}
          onDescriptionChange={(newDescription) => onTaskDescriptionChange(task.id, newDescription)}
        />
      ))}
      <Button
        variant="contained"
        sx={{
          marginTop: '10px',
          width: '100%',
          backgroundColor: theme.palette.darkGreen.main,
        }}
        onClick={onAddTask}
      >
        Add Task
      </Button>
    </Box>
  );
};


export default TaskColumn;
