import { db } from "../lib/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const createBoard = async (user, boardName, tasks) => {
    try {
        await addDoc(collection(db, "boards"), {
            userId: user.uid,
            name: boardName,
            tasks,
            createdAt: new Date(),
        });
    } catch (error) {
        console.error("Error creating board:", error);
        alert("Error creating board: " + error.message);
    }
};

export default createBoard;
