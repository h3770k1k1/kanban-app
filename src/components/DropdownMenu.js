import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AccountManager } from "../lib/AccountManager";

const DropdownMenu = ({ anchorEl, handleClose }) => {
    const navigate = useNavigate();

    const handleSignOutClick = async () => {
        try {
            // Create an instance of AccountManager
            const accountManager = new AccountManager();
            await accountManager.signOut();
            handleClose();
            navigate("/sign-in");
        } catch (error) {
            console.error("Error during sign-out:", error.message);
        }
    };

    const handleDeleteAccountClick = () => {
        handleClose();
        navigate("/delete-account");
    };

    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{
                "aria-labelledby": "dropdown-button",
            }}
        >
            <MenuItem onClick={handleSignOutClick}>Sign Out</MenuItem>
            <MenuItem onClick={handleDeleteAccountClick}>Delete Account</MenuItem>
        </Menu>
    );
};

export default DropdownMenu;
