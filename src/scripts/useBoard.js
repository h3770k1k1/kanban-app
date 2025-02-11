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

            const boardRef = doc(db, "boards", boardId);
            const boardSnap = await getDoc(boardRef);

            if (boardSnap.exists()) {
                const boardData = boardSnap.data();
                setBoardName(boardData.name || "My Board");

                const loadedTasks = {};
                for (let key in columnsConfig) {
                    loadedTasks[key] = boardData.tasks && boardData.tasks[key] ? boardData.tasks[key] : [];
                }

                setTasks(loadedTasks);
            } else {
                console.error("Board not found");
            }
        };

        fetchBoard();
    }, [boardId]);

    return { boardId, boardName, setBoardName, tasks, setTasks };
};

export default useBoard;
