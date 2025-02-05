import React, { useEffect, useState } from 'react';
import { Container, Grid, useTheme,  Box, TextField } from '@mui/material';
import TaskColumnWrapper from '../components/TaskColumnWrapper';
import { db } from "../lib/FirebaseConfig";
import { doc, getDoc, } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import SaveBoardButton from "../components/SaveBoardButton";
import columnsConfig from '../lib/columnsConfig';

const Board = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user } = useAuth();
  const { boardId } = useParams();

  const [boardName, setBoardName] = useState("My Board");
  const initialTasks = {};
  for (let key in columnsConfig) {
    initialTasks[key] = [];
  }
  const [tasks, setTasks] = useState(initialTasks);

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


  useEffect(() => {
    const fetchBoard = async () => {
      if (!boardId || boardId === "new") {
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
    };

    fetchBoard();
  }, [boardId]);


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
                  title={columnsConfig[columnKey]?.name || columnKey}
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
          <SaveBoardButton
              boardId={boardId}
              boardName={boardName}
              tasks={tasks}
              user={user}
              navigate={navigate}
              theme={theme}
          />
        </Box>
      </Container>
  );
};

export default Board;
