import React from 'react';
import { Container, Grid, useTheme, Box } from '@mui/material';
import TaskColumnWrapper from '../components/TaskColumnWrapper';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SaveBoardButton from "../components/SaveBoardButton";
import BoardNameField from '../components/BoardNameField';
import useBoard from '../helpers/useBoard';
import { handleDropTask, handleAddTask, handleCloseTask, handleTaskDescriptionChange } from '../helpers/taskHandlers';
import columnsConfig from '../lib/columnsConfig';

const Board = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { user } = useAuth();
    const { boardId, boardName, setBoardName, tasks, setTasks } = useBoard();  // Include boardId

    return (
        <Container sx={{ width: { xs: '100%', sm: '70%' }, height: '100%', padding: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: '0.5vh' }}>
                <BoardNameField boardName={boardName} setBoardName={setBoardName} />
            </Box>
            <Grid container spacing={3} sx={{ marginTop: '1vh' }}>
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
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2vh' }}>
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
