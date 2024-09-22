
import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
    name: "list",
    initialState: {
        lists: [],
    },
    reducers: {
        getList1(state, action) {
            state.lists = action.payload
        },
        createList1(state, action) {
            state.lists.push(action.payload)
        },
        updateList1(state, action) {
            state.lists= state.lists.map(list => list._id === action.payload._id ? action.payload : list)
        },
        deleteList1(state, action) {
            state.lists = state.lists.filter(list => list._id !== action.payload._id);
        },        
    }
})
export const listReducer = listSlice.reducer
export const listAction = listSlice.actions