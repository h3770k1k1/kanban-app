import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { buttonStyle } from "../styles/boardButtonStyles";

const NewBoardButton = ({ buttonColor, buttonText }) => {
    const navigate = useNavigate();

    const handleCreateBoard = () => {
        navigate("/board/new");
    };

    const customStyle = Object.assign({}, buttonStyle);
    customStyle.backgroundColor = buttonColor;

    return (
        <Button
            variant="contained"
            sx={{
                ...customStyle,
                width: "80%",
                height: "15vh",
                fontSize: "1.5rem",
                '@media (max-width: 600px)': {
                    width: "90%",
                    height: "10vh",
                    fontSize: "1rem",
                },
            }}
            onClick={handleCreateBoard}
        >
            {buttonText}
        </Button>
    );
};

export default NewBoardButton;
