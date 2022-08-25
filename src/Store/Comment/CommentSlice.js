import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        comments: [],
    },
    reducers: {
        setComments: (state, { payload }) => {
            state.comments = payload
        },
    }
})

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;