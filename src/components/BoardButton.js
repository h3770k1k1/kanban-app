import React from 'react';
import { Button, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { buttonStyle, iconButtonStyle } from '../styles/boardButtonStyles';

const BoardButton = ({ board, onOpenBoard, onDeleteBoard, backgroundColor }) => {
    return (
        <Button
            variant="contained"
            sx={{
                ...buttonStyle,
                backgroundColor: backgroundColor,
                width: "80%",
                height: "15vh",
                fontSize: "1.5rem",
                '@media (max-width: 600px)': {
                    width: "90%",
                    height: "10vh",
                    fontSize: "1rem",
                },
            }}
            onClick={() => onOpenBoard(board)}
        >
            {board.name}

            <IconButton
                size="small"
                sx={{
                    ...iconButtonStyle,
                    fontSize: { xs: "1rem", sm: "1.5rem" },
                    padding: { xs: "4px", sm: "8px" },
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    onDeleteBoard(board.id);
                }}
            >
                <ClearIcon fontSize="inherit" />
            </IconButton>
        </Button>
    );
};

export default BoardButton;
