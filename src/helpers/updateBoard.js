import { db } from "../lib/FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const updateBoard = async (boardId, boardName, tasks) => {
    try {
        await updateDoc(doc(db, "boards", boardId), { name: boardName, tasks });
    } catch (error) {
        console.error("Error updating board:", error);
        alert("Error updating board: " + error.message);
    }
};

export default updateBoard;
