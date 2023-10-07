import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: 1,
    usersPorPage: 9,
}

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    }
})

export default paginationSlice.reducer;

export const {
    setCurrentPage,
} = paginationSlice.actions;