import React, { useEffect, useState } from 'react';
import { Container, Grid, useTheme, Button, Box, TextField } from '@mui/material';
import TaskColumnWrapper from '../components/TaskColumnWrapper';
import CheckIcon from '@mui/icons-material/Check';
import { db } from "../lib/FirebaseConfig";
import { doc, getDoc, updateDoc, addDoc,collection } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const Board = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user } = useAuth();
  const { boardId } = useParams(); // Pobierz boardId z URL-a

  const [boardName, setBoardName] = useState("My Board");
  const [tasks, setTasks] = useState({
    backlog: [],
    todo: [],
    inProgress: [],
    done: [],
  });
  const [loading, setLoading] = useState(true);

  const handleAddTask = (column) => {
    const newTask = { id: Math.random(), description: "" };
    const updatedTasks = { ...tasks };
    updatedTasks[column] = [...tasks[column], newTask];
    setTasks(updatedTasks);
  };

  const handleCloseTask = (column, taskId) => {
    const updatedTasks = { ...tasks };
    updatedTasks[column] = tasks[column].filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
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
      const updatedTasks = { ...tasks };
      Object.keys(updatedTasks).forEach((key) => {
        updatedTasks[key] = updatedTasks[key].filter((t) => t.id !== taskId);
      });

      updatedTasks[column] = [...updatedTasks[column], task];
      setTasks(updatedTasks);
    }
  };

  const handleTaskDescriptionChange = (column, taskId, newDescription) => {
    const updatedTasks = { ...tasks };
    updatedTasks[column] = tasks[column].map((task) =>
        task.id === taskId ? { ...task, description: newDescription } : task
    );
    setTasks(updatedTasks);
  };

  // Pobierz tablicę z Firestore na podstawie boardId
  useEffect(() => {
    const fetchBoard = async () => {
      if (!boardId || boardId === "new") {
        setLoading(false);
        return;
      }

      const boardRef = doc(db, "boards", boardId);
      const boardSnap = await getDoc(boardRef);

      if (boardSnap.exists()) {
        const boardData = boardSnap.data();
        setBoardName(boardData.name || "My Board");
        setTasks(boardData.tasks || { backlog: [], todo: [], inProgress: [], done: [] });
      } else {
        console.error("Board not found");
      }
      setLoading(false);
    };

    fetchBoard();
  }, [boardId]);

  const handleSaveBoard = async () => {
    if (!user) {
      alert("You must be logged in to save the board.");
      return;
    }

    try {
      if (boardId && boardId !== "new") {
        await updateDoc(doc(db, "boards", boardId), { name: boardName, tasks });
      } else {
        await addDoc(collection(db, "boards"), {
          userId: user.uid,
          name: boardName,
          tasks,
          createdAt: new Date(),
        });
      }

      alert("Board saved successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error saving board:", error);
      alert("Error saving board: " + error.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
      <Container sx={{ width: '70%', height: '100%', padding: '20px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: '0.5vh' }}>
          <TextField
              id="board-name"
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleSaveBoard} sx={{ backgroundColor: theme.palette.darkGreen.main, color: 'white' }}>
            <CheckIcon sx={{ marginRight: '0.5rem' }} />
            SAVE BOARD
          </Button>
        </Box>
      </Container>
  );
};

export default Board;
