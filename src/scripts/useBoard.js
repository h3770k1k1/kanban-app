import { useEffect, useState } from 'react';
import { db } from "../lib/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import columnsConfig from '../lib/columnsConfig';

const useBoard = (boardId) => {
    const [boardName, setBoardName] = useState("My Board");
    const initialTasks = {};
    for (let key in columnsConfig) {
        initialTasks[key] = [];
    }
    const [tasks, setTasks] = useState(initialTasks);

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

                let initialTasks = {};
                for (let key in columnsConfig) {
                    initialTasks[key] = boardData.tasks && boardData.tasks[key] ? boardData.tasks[key] : [];
                }

                setTasks(initialTasks);
            } else {
                console.error("Board not found");
            }
        };

        fetchBoard();
    }, [boardId]);

    return { boardName, setBoardName, tasks, setTasks };
};

export default useBoard;