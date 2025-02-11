import React, { useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import UsersBoards from "../views/UsersBoards";
import Board from "../views/Board";
import Header from "../components/Header";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import ForgotPassword from "../views/ForgotPassword";
import ResetPassword from "../views/ResetPassword";
import DeleteAccount from "../views/DeleteAccount";
import NotFound from "../views/NotFound";
import Loading from "../views/Loading";
import ErrorBoundary from "../scripts/ErrorBoundary";
import { AuthProvider } from "./AuthContext";

const ContextProviders = () => {
    const navigate = useNavigate();

    const handleOpenBoard = (board) => {
        navigate(`/board/${board.id}`);
    };
    return (
        <Loading timeout={5000}>
            <AuthProvider>
                <Header />
                <ErrorBoundary>
                    <Routes>
                        <Route path="/sign-in" element={<SignIn />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/delete-account" element={<DeleteAccount />} />
                        <Route path="/" element={<UsersBoards onOpenBoard={handleOpenBoard} />} />

                        <Route path="/board/new" element={<Board board={null} onClose={() => navigate("/")} />} />

                        <Route
                            path="/board/:boardId"
                            element=
                                <Board onClose={() => navigate("/")} />

                        />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </ErrorBoundary>
            </AuthProvider>
        </Loading>
    );
};

export default ContextProviders;
