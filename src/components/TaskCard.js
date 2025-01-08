import React from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

const TaskCard = ({ task, onClose }) => {
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
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'baseline',marginTop:'1rem'}}>
          {task.title}
          <IconButton
            sx={{
              color: 'inherit', 
            }}
            size="small"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
        sx={{ display: 'flex', alignItems: 'baseline',}}
        >
          {task.description}
          <IconButton
            sx={{
              color: 'inherit', 
            }}
           
          >
            <EditIcon sx={{fontSize: '1rem'}} />
          </IconButton>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
