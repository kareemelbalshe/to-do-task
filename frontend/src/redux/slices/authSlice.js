import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: localStorage.getItem("userInfo") ?
            JSON.parse(localStorage.getItem("userInfo")) : null,
        registerMessage: null,
    },
    reducers: {
        login(state, action) {
            state.user = action.payload
            state.registerMessage = null
        },
        logout(state) {
            state.user = null
        },
        register(state, action) {
            state.registerMessage = action.payload
        },
        setUsername(state, action) {
            state.user.username = action.payload
        },
    }
})
export const authReducer = authSlice.reducer
export const authAction = authSlice.actions