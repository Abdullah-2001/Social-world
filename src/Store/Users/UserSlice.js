import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: {
        currentUser: null,
        friends: null,
        token: null,
        loading: false,
    },
    reducers: {
        setCurrentUser: (state, { payload }) => {
            state.currentUser = payload
        },
        setFriends: (state, { payload }) => {
            state.users = payload
        },
        setToken: (state, { payload }) => {
            state.token = payload
        },
        setLoading: (state, { payload }) => {
            state.loading = payload
        }
    }
})

export const { setCurrentUser, setFriends, setToken, setLoading } = userSlice.actions;
export default userSlice.reducer;