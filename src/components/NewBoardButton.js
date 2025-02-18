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
        <Button variant="contained" sx={customStyle} onClick={handleCreateBoard}>
            {buttonText}
        </Button>
    );
};

export default NewBoardButton;
