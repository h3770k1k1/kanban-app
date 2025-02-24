import React from 'react';
import { Button, IconButton, Box } from '@mui/material';
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
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                position: "relative",
                '@media (max-width: 600px)': {
                    width: "90%",
                    height: "10vh",
                    fontSize: "1rem",
                },
            }}
            onClick={() => onOpenBoard(board)}
        >
            <Box
                sx={{
                    flexGrow: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                }}
            >
                {board.name}
            </Box>

            <IconButton
                size="small"
                sx={{
                    ...iconButtonStyle,
                    fontSize: { xs: "1rem", sm: "1.5rem" },
                    padding: { xs: "4px", sm: "8px" },
                    flexShrink: 0,
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
