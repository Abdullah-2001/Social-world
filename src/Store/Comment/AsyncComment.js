import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../../Config/Firebase";
import { setComments } from "./CommentSlice";

export const setCommentsAsync = createAsyncThunk(
    "getUser",
    async (_, { dispatch, getState }) => {
        try {
            const collectionRef = collection(firestore, "comments")
            onSnapshot(collectionRef, (snapshot) => {
                dispatch(setComments(snapshot.docs.map((doc) => doc.data())))
            })
        } catch (error) {
            console.log(error.message);
        }
    }
)