import React, { useState } from 'react';
import { Container, Grid, useTheme, Button, Box, TextField } from '@mui/material';
import TaskColumnWrapper from '../components/TaskColumnWrapper';
import CheckIcon from '@mui/icons-material/Check';
import { db } from "../lib/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Board = () => {
  const navigate = useNavigate();
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
    const updatedTasks = {};
    for (let key in tasks) {
      if (tasks.hasOwnProperty(key)) {
        if (key === column) {
          updatedTasks[key] = tasks[key].concat(newTask);
        } else {
          updatedTasks[key] = tasks[key];
        }
      }
    }
    setTasks(updatedTasks);
  };

  const handleTaskDescriptionChange = (column, taskId, newDescription) => {
    const updatedTasks = {};
    for (let key in tasks) {
      if (tasks.hasOwnProperty(key)) {
        if (key === column) {
          updatedTasks[key] = tasks[key].map((task) => {
            if (task.id === taskId) {
              task.description = newDescription;
            }
            return task;
          });
        } else {
          updatedTasks[key] = tasks[key];
        }
      }
    }
    setTasks(updatedTasks);
  };

  const handleCloseTask = (column, taskId) => {
    const updatedTasks = {};
    for (let key in tasks) {
      if (tasks.hasOwnProperty(key)) {
        if (key === column) {
          updatedTasks[key] = tasks[key].filter((task) => task.id !== taskId);
        } else {
          updatedTasks[key] = tasks[key];
        }
      }
    }
    setTasks(updatedTasks);
  };

  const handleDropTask = (taskId, column) => {
    let task = null;

    for (let key in tasks) {
      if (tasks.hasOwnProperty(key)) {
        const foundTask = tasks[key].find((task) => task.id === taskId);
        if (foundTask) {
          task = foundTask;
        }
      }
    }

    if (task) {
      const updatedTasks = {};
      for (let key in tasks) {
        if (tasks.hasOwnProperty(key)) {
          if (key === column) {
            updatedTasks[key] = tasks[key].concat(task);
          } else {
            updatedTasks[key] = tasks[key].filter((t) => t.id !== taskId);
          }
        }
      }
      setTasks(updatedTasks);
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
      navigate("/"); // Po zapisaniu przekierowuje do strony głównej
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
