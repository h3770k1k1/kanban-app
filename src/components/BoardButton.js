import React from 'react';
import { Button, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const BoardButton = ({ board, onOpenBoard, onDeleteBoard }) => {
    return (
        <Button
            variant="contained"
            sx={{
                borderRadius: '16px',
                backgroundColor: '#008080',
                color: 'white',
                position: 'relative',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px 16px',
            }}
            onClick={() => onOpenBoard(board)}
        >
            {board.name}

            <IconButton
                size="small"
                sx={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    color: 'white',
                }}
                onClick={(e) => {
                    e.stopPropagation(); // Zapobiega otwieraniu tablicy przy kliknięciu na X
                    onDeleteBoard(board.id);
                }}
            >
                <ClearIcon fontSize="small" />
            </IconButton>
        </Button>
    );
};

export default BoardButton;
