import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestore } from "../../Config/Firebase";
import { setMessages } from "./ChatSlice";

export const getMessagesAsync = createAsyncThunk(
    "getMessages",
    async (body, { getState, dispatch }) => {
        const { user1, user2 } = body
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
        const collectionRef = collection(firestore, "messages", id, "chat")
        const q = query(collectionRef, orderBy("createAt", "asc"), limit(50))
        onSnapshot(q, (snapshot) => {
            dispatch(setMessages(snapshot.docs.map((doc) => doc.data())))
        })
    }
)