import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "messages",
    initialState: {
        messages: []
    },
    reducers: {
        setMessages: (state, { payload }) => {
            state.messages = payload
        }
    }
})

export const { setMessages } = chatSlice.actions
export default chatSlice.reducer