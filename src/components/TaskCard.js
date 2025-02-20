import React from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

const TaskCard = ({ task, onClose, onDescriptionChange }) => {

  const [{ isDragging }, dragRef] = useDrag({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Card
      ref={dragRef}
      sx={{
        marginBottom: '15px',
        borderRadius: '8px',
        position: 'relative',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <IconButton
        onClick={() => onClose(task.id)}
        sx={{
          position: 'absolute',
          top: '2px',
          right: '2px',
        }}
      >
        <CloseIcon />
      </IconButton>
      <CardContent>
        <TextField
          variant="standard"
          label="Task description"
          multiline
          maxRows={4}
          sx={{ marginTop: '0.5rem' }}
          value={task.description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </CardContent>
    </Card>
  );
};
export default TaskCard;