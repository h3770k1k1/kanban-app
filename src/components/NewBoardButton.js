import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./BoardButton.css";

const NewBoardButton = ({ buttonColor, buttonText }) => {
    const navigate = useNavigate();

    const handleCreateBoard = () => {
        navigate("/board/new");
    };

    return (
        <Button
            className="board-button"
            variant="contained"
            sx={{
                backgroundColor: buttonColor,
                borderRadius: "16px",
                fontSize: "16px",
            }}
            onClick={handleCreateBoard}
        >
            {buttonText}
        </Button>
    );
};

export default NewBoardButton;
