
import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "task",
    initialState: {
        tasks: [],
    },
    reducers: {
        getTask1(state, action) {
            state.tasks = action.payload
        },
        createTask1(state, action) {
            state.tasks.push(action.payload)
        },
        updateTask1(state, action) {
            state.tasks= state.tasks.map(task => task._id === action.payload._id ? action.payload : task)
        },
        deleteTask1(state, action) {
            state.tasks= state.tasks.filter(task => task._id !== action.payload)
        },
    }
})
export const taskReducer = taskSlice.reducer
export const taskAction = taskSlice.actions