import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { auth, firestore } from "../../Config/Firebase";
import { setFriends, setCurrentUser, setLoading } from "./UserSlice";

export const setCurrentUserAsync = createAsyncThunk(
    "getUser",
    async (_, { dispatch, getState }) => {
        try {
            const collectionRef = collection(firestore, "users")
            const q = query(collectionRef, where("uid", "in", [auth.currentUser.uid]))
            onSnapshot(q, (snapshot) => {
                dispatch(setCurrentUser(snapshot.docs.map((doc) => doc.data())))
            })
        } catch (error) {
            console.log(error.message);
        }
    }
)

export const setFriendsAsync = createAsyncThunk(
    "getUser",
    async (_, { dispatch, getState }) => {
        try {
            const collectionRef = collection(firestore, "users")
            const q = query(collectionRef, where("uid", "not-in", [auth.currentUser.uid]))
            onSnapshot(q, collectionRef, (snapshot) => {
                dispatch(setFriends(snapshot.docs.map((doc) => doc.data())))
            })
        } catch (error) {
            console.log(error);
        }
    }
)