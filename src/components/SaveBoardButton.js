import React from 'react';
import { Button, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom'; // If you're using react-router for navigation
import createBoard from '../scripts/createBoard';
import updateBoard from '../scripts/updateBoard';

const SaveBoardButton = ({ boardId, boardName, tasks, user, theme }) => {
    const navigate = useNavigate();

    const handleSaveBoard = async () => {
        if (!user) {
            return;
        }

        try {
            if (boardId && boardId !== "new") {
                await updateBoard(boardId, boardName, tasks);
            } else {
                await createBoard(user, boardName, tasks);
            }

            navigate("/");
        } catch (error) {
            console.error("Error saving board:", error);
            alert("Error saving board: " + error.message);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleSaveBoard} sx={{ backgroundColor: theme.palette.darkGreen.main, color: 'white' }}>
                <CheckIcon sx={{ marginRight: '0.5rem' }} />
                SAVE BOARD
            </Button>
        </Box>
    );
};

export default SaveBoardButton;
