import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const DropdownMenu = ({ anchorEl, handleClose }) => {
    const navigate = useNavigate();
    const { handleSignOut } = useAuth();

    const handleSignOutClick = () => {
        handleSignOut();
        handleClose();
    };
    const handleDeleteAccountClick = () => {
        navigate("/delete-account");
        handleClose();
    };

    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleSignOutClick}>Sign Out</MenuItem>
            <MenuItem onClick={handleDeleteAccountClick}>Delete Account</MenuItem>
        </Menu>
    );
};

export default DropdownMenu;