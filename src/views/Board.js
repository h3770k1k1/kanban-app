import React, { useEffect, useState } from 'react';
import { Container, Grid, useTheme, Box } from '@mui/material';
import TaskColumnWrapper from '../components/TaskColumnWrapper';
import { db } from "../lib/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import SaveBoardButton from "../components/SaveBoardButton";
import columnsConfig from '../lib/columnsConfig';
import BoardNameField from '../components/BoardNameField';


import { handleDropTask, handleAddTask, handleCloseTask, handleTaskDescriptionChange } from '../scripts/taskHandlers';

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

        let initialTasks = {};
        for (let key in columnsConfig) {
          initialTasks[key] = boardData.tasks && boardData.tasks[key] ? boardData.tasks[key] : [];
        }

        setTasks(initialTasks);
      } else {
        console.error("Board not found");
      }
    };

    fetchBoard();
  }, [boardId]);

  return (
      <Container sx={{ width: '70%', height: '100%', padding: '20px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: '0.5vh' }}>
          <BoardNameField
              boardName={boardName}
              setBoardName={setBoardName}
          />
        </Box>
        <Grid container spacing={3} sx={{ marginTop: '20px' }}>
          {Object.keys(tasks).map((columnKey) => (
              <TaskColumnWrapper
                  key={columnKey}
                  title={columnsConfig[columnKey]?.name || columnKey}
                  tasks={tasks[columnKey]}
                  onAddTask={() => handleAddTask(tasks, setTasks, columnKey)}
                  onCloseTask={(taskId) => handleCloseTask(tasks, setTasks, columnKey, taskId)}
                  onDropTask={(taskId) => handleDropTask(taskId, columnKey, tasks, setTasks)}
                  columnKey={columnKey}
                  onTaskDescriptionChange={(taskId, newDescription) =>
                      handleTaskDescriptionChange(tasks, setTasks, columnKey, taskId, newDescription)
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
