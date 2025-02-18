import React from 'react';
import { TextField } from '@mui/material';

const BoardNameField = ({ boardName, setBoardName }) => {
    const handleChange = (event) => {
        setBoardName(event.target.value);
    };

    return (
        <TextField
            id="board-name"
            value={boardName}
            onChange={handleChange}
            helperText="Name your board"
            variant="standard"
            InputProps={{
                style: { fontSize: '18px' },
            }}
            InputLabelProps={{
                style: { fontSize: '18px' },
            }}
        />
    );
};

export default BoardNameField;
