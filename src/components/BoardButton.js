import React from 'react';
import { Button, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { buttonStyle, iconButtonStyle } from '../styles/boardButtonStyles';

const BoardButton = ({ board, onOpenBoard, onDeleteBoard, backgroundColor }) => {
    return (
        <Button
            variant="contained"
            sx={{ ...buttonStyle, backgroundColor: backgroundColor }}
            onClick={() => onOpenBoard(board)}
        >
            {board.name}

            <IconButton
                size="small"
                sx={iconButtonStyle}
                onClick={(e) => {
                    e.stopPropagation();
                    onDeleteBoard(board.id);
                }}
            >
                <ClearIcon fontSize="small" />
            </IconButton>
        </Button>
    );
};

export default BoardButton;
