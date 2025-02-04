import React, { useEffect, useState } from "react";
import { Container, Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom"; // ✅ Dodano import
import NewBoardButton from "../components/NewBoardButton";
import BoardButton from "../components/BoardButton";
import { useAuth } from "../context/AuthContext";
import { db } from "../lib/FirebaseConfig";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

const UsersBoards = ({ onOpenBoard }) => {
    const theme = useTheme();
    const navigate = useNavigate(); // ✅ Dodano useNavigate()
    const { user } = useAuth();
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        const fetchBoards = async () => {
            if (!user) return;

            const q = query(collection(db, "boards"), where("userId", "==", user.uid));
            const querySnapshot = await getDocs(q);

            const userBoards = querySnapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                tasks: doc.data().tasks,
                userId: doc.data().userId,
                createdAt: doc.data().createdAt
            }));

            setBoards(userBoards);
        };

        fetchBoards();
    }, [user]);

    const handleDeleteBoard = async (boardId) => {
        await deleteDoc(doc(db, "boards", boardId));
        setBoards((prevBoards) => prevBoards.filter((board) => board.id !== boardId));
    };

    return user ? (
        <Container sx={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <NewBoardButton buttonColor={theme.palette.darkGreen.main} buttonText="Create new board" />
            </Box>

            <Box sx={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "5vh", paddingLeft: "5vw" }}>
                {boards.map((board) => (
                    <BoardButton
                        key={board.id}
                        board={board}
                        onOpenBoard={() => {
                            navigate(`/board/${board.id}`); // ✅ Teraz działa poprawnie!
                            onOpenBoard(board); // Opcjonalnie, jeśli chcesz ustawić wybraną tablicę w stanie
                        }}
                        onDeleteBoard={handleDeleteBoard}
                    />
                ))}
            </Box>
        </Container>
    ) : (
        <Container sx={{ width: "100%", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h5" color="textSecondary" align="center">
                Please log in to view your boards.
            </Typography>
        </Container>
    );
};

export default UsersBoards;
