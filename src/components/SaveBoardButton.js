import React from 'react';
import { Button, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { db } from "../lib/FirebaseConfig";
import { doc, updateDoc, addDoc, collection } from "firebase/firestore";

const SaveBoardButton = ({ boardId, boardName, tasks, user, navigate, theme }) => {

    const handleSaveBoard = async () => {
        if (!user) {
            return;
        }

        try {
            if (boardId && boardId !== "new") {
                await updateDoc(doc(db, "boards", boardId), { name: boardName, tasks });
            } else {
                await addDoc(collection(db, "boards"), {
                    userId: user.uid,
                    name: boardName,
                    tasks,
                    createdAt: new Date(),
                });
            }

            navigate("/");
        } catch (error) {
            console.error("Error saving board:", error);
            alert("Error saving board: " + error.message);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
            <Button onClick={handleSaveBoard} sx={{ backgroundColor: theme.palette.customColors.darkYellow, color: 'white', fontSize: '18px',  paddingLeft: '0.5em', paddingRight: '0.5em' }}>
                <CheckIcon sx={{ marginRight: '0.5rem' }} />
                SAVE BOARD
            </Button>
        </Box>
    );
};

export default SaveBoardButton;