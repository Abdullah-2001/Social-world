import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestore } from "../../Config/Firebase";
import { getPosts, setLoadPosts } from "./PostSlice";

export const getPostsAsync = createAsyncThunk(
    "getPosts",
    async (_, { getState, dispatch }) => {
        dispatch(setLoadPosts(true))
        const collectionRef = collection(firestore, "posts")
        onSnapshot(collectionRef, (snapshot) => {
            dispatch(getPosts(snapshot.docs.map(doc => {
                return { postId: doc.id, ...doc.data() }
            })))
            dispatch(setLoadPosts(false))
        })
    }
)