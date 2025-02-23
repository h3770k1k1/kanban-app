import React, { useState } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import theme from "../styles/theme";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DropdownMenu from "./DropdownMenu";
import Logo from "./logo.svg";

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
        <Container sx={{ display: "flex", justifyContent: "center", px: 2 }}>
            <Box
                sx={{
                    top: 0,
                    height: "12vh",
                    width: "100%",
                    maxWidth: "1200px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: 2,
                    borderColor: theme.palette.customColors.darkYellow,
                    paddingY: "1vh",
                    px: 2,
                }}
            >
                {/* LOGO */}
                <Box onClick={handleLogoClick} sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                    <img
                        src={Logo}
                        alt="Logo"
                        style={{
                            height: "8vh", // Domyślnie większe
                            maxHeight: "50px",
                            width: "auto",
                        }}
                        className="responsive-logo"
                    />
                </Box>

                {/* USER MENU */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        mt: { xs: "8px", sm: "0px" }, // Przesunięcie przycisku w dół na mobilkach
                    }}
                >
                    {user ? (
                        <>
                            <Button
                                sx={{
                                    textTransform: "none",
                                    backgroundColor: theme.palette.customColors.lightYellow,
                                    color: theme.palette.customColors.white,
                                    fontSize: { xs: "12px", sm: "16px" },
                                    padding: { xs: "4px 8px", sm: "8px 16px" },
                                }}
                                onClick={handleClick}
                            >
                                {user.displayName}
                            </Button>
                            <DropdownMenu anchorEl={anchorEl} handleClose={handleClose} />
                        </>
                    ) : (
                        <Button
                            sx={{
                                backgroundColor: theme.palette.customColors.lightYellow,
                                color: theme.palette.customColors.white,
                                fontSize: { xs: "14px", sm: "16px" },
                                padding: { xs: "6px 14px", sm: "8px 16px" },
                                mt: { xs: "8px", sm: "0px" }, // Przesunięcie tylko na mobile
                            }}
                            onClick={handleSignIn}
                        >
                            Sign In
                        </Button>
                    )}
                </Box>
            </Box>

            {/* MEDIA QUERIES */}
            <style>
                {`
                    @media (max-width: 600px) {
                        .responsive-logo {
                            height: 5vh !important; /* Mniejsze logo na mobilkach */
                        }
                    }
                `}
            </style>
        </Container>
    );
};

export default Header;
