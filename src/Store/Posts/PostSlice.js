import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        loadPosts: false
    },
    reducers: {
        getPosts: (state, { payload }) => {
            state.posts = payload
        },
        setLoadPosts: (state, { payload }) => {
            state.loadPosts = payload
        }
    }
})

export const { getPosts, setLoadPosts } = postSlice.actions
export default postSlice.reducer