import React, { useState } from 'react';
import { Container, Grid, useTheme, Button, Box, TextField } from '@mui/material';
import TaskColumnWrapper from '../components/TaskColumnWrapper';
import CheckIcon from '@mui/icons-material/Check';
import { db } from "../lib/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const Board = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [boardName, setBoardName] = useState("My Board");
  const [tasks, setTasks] = useState({
    backlog: [],
    todo: [],
    inProgress: [],
    done: [],
  });

  const handleAddTask = (column) => {
    const newTask = { id: Math.random(), description: "" };
    setTasks((prevState) => ({
      ...prevState,
      [column]: [...prevState[column], newTask],
    }));
  };

  const handleTaskDescriptionChange = (column, taskId, newDescription) => {
    setTasks((prevState) => ({
      ...prevState,
      [column]: prevState[column].map((task) =>
          task.id === taskId ? { ...task, description: newDescription } : task
      ),
    }));
  };

  const handleCloseTask = (column, taskId) => {
    setTasks((prevState) => ({
      ...prevState,
      [column]: prevState[column].filter((task) => task.id !== taskId),
    }));
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

  const handleSaveBoard = async () => {
    if (!user) {
      alert("You must be logged in to save the board.");
      return;
    }

    try {
      await addDoc(collection(db, "boards"), {
        userId: user.uid,
        name: boardName,
        tasks,
        createdAt: new Date(),
      });
      alert("Board saved successfully!");
    } catch (error) {
      console.error("Error saving board:", error);
      alert("Error saving board: " + error.message);
    }
  };

  return (
      <Container sx={{ width: '70%', height: '100%', position: 'relative', padding: '20px' }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginTop: '0.5vh' }}>
          <TextField
              id="board-name"
              label=""
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              helperText="Name your board"
              variant="standard"
          />
        </Box>
        <Grid container spacing={3} sx={{ marginTop: '20px' }}>
          {Object.keys(tasks).map((columnKey) => (
              <TaskColumnWrapper
                  key={columnKey}
                  title={columnKey.charAt(0).toUpperCase() + columnKey.slice(1)}
                  tasks={tasks[columnKey]}
                  onAddTask={() => handleAddTask(columnKey)}
                  onCloseTask={(taskId) => handleCloseTask(columnKey, taskId)}
                  onDropTask={handleDropTask}
                  columnKey={columnKey}
                  onTaskDescriptionChange={(taskId, newDescription) =>
                      handleTaskDescriptionChange(columnKey, taskId, newDescription)
                  }
              />
          ))}
        </Grid>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <Button
              onClick={handleSaveBoard}
              sx={{
                backgroundColor: theme.palette.darkGreen.main,
                marginTop: '3vh',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'medium',
                padding: '12px 24px',
                borderRadius: '8px',
              }}
          >
            <CheckIcon sx={{ marginRight: '0.5rem' }} />
            SAVE BOARD
          </Button>
        </Box>
      </Container>
  );
};

export default Board;
