import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/FirebaseConfig";
import { useParams } from "react-router-dom";
import columnsConfig from "../lib/columnsConfig";

const initializeTasks = () => {
    const initialTasks = {};
    for (let key in columnsConfig) {
        initialTasks[key] = [];
    }
    return initialTasks;
};

const useBoard = () => {
    const { boardId } = useParams();
    const [boardName, setBoardName] = useState("My Board");
    const [tasks, setTasks] = useState(initializeTasks);

    useEffect(() => {
        const fetchBoard = async () => {
            if (!boardId || boardId === "new") {
                return;
            }

            try {
                const boardData = await getBoardData(boardId);
                if (boardData) {
                    const loadedTasks = extractTasksFromBoard(boardData);
                    setBoardState(boardData.name || "My Board", loadedTasks);
                } else {
                    console.error("Board not found");
                }
            } catch (error) {
                console.error("Error fetching board data:", error);
            }
        };

        fetchBoard();
    }, [boardId]);

    const getBoardData = async (boardId) => {
        const boardRef = doc(db, "boards", boardId);
        const boardSnap = await getDoc(boardRef);

        if (boardSnap.exists()) {
            return boardSnap.data();
        }
        return null;
    };

    const extractTasksFromBoard = (boardData) => {
        const loadedTasks = {};
        for (let key in columnsConfig) {
            loadedTasks[key] = boardData.tasks && boardData.tasks[key] ? boardData.tasks[key] : [];
        }
        return loadedTasks;
    };

    const setBoardState = (boardName, loadedTasks) => {
        setBoardName(boardName);
        setTasks(loadedTasks);
    };


    return { boardId, boardName, setBoardName, tasks, setTasks };
};

export default useBoard;
