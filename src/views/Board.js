import React from 'react';
import { Container, Grid, useTheme, Box } from '@mui/material';
import TaskColumnWrapper from '../components/TaskColumnWrapper';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SaveBoardButton from "../components/SaveBoardButton";
import BoardNameField from '../components/BoardNameField';
import useBoard from '../scripts/useBoard';

const Board = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { user } = useAuth();
    const { boardId, boardName, setBoardName, tasks, setTasks } = useBoard();

    return (
        <Container sx={{ width: '70%', height: '100%', padding: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: '0.5vh' }}>
                <BoardNameField boardName={boardName} setBoardName={setBoardName} />
            </Box>
            <Grid container spacing={3} sx={{ marginTop: '20px' }}>
                {Object.keys(tasks).map((columnKey) => (
                    <TaskColumnWrapper
                        key={columnKey}
                        columnKey={columnKey}
                        tasks={tasks}
                        setTasks={setTasks}  // Pass these only once
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
