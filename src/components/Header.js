import React, { useState } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import logo from "./logo.svg";
import theme from "../styles/theme";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignIn = () => {
        navigate("/sign-in");
    };

    const handleLogoClick = () => {
        navigate("/");
    };

    return (
        <Container sx={{ display: "flex", justifyContent: "center" }}>
            <Box
                sx={{
                    top: 0,
                    height: "12vh",
                    width: "75%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    borderBottom: 2,
                    borderColor: "black",
                }}
            >
                <Typography>
                    <Box onClick={handleLogoClick} sx={{ cursor: 'pointer' }}>
                        <img src={logo} alt="Logo" />
                    </Box>
                </Typography>
                {user ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Button
                            sx={{
                                textTransform: "none",
                                backgroundColor: "none",
                                color: theme.palette.darkGreen.main,
                                marginBottom: "1vh",
                                marginRight: "1vh",
                            }}
                            onClick={handleClick}
                        >
                            Signed in as {user.displayName}
                        </Button>
                        <DropdownMenu
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                        />
                    </Box>
                ) : (
                    <Button
                        sx={{
                            backgroundColor: "none",
                            color: theme.palette.customColors.brown,
                            marginBottom: "1vh",
                            marginRight: "1vh",
                        }}
                        onClick={handleSignIn}
                    >
                        Sign In
                    </Button>
                )}
            </Box>
        </Container>
    );
};

export default Header;
