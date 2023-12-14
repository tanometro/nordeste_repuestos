import { createSlice } from "@reduxjs/toolkit";

interface RootState {
    pagination: {
        currentPage: number;
        usersPerPage: number;
        nPage: any[];
      };
  }

const initialState = {
    currentPage: 1,
    usersPorPage: 9,
    nPage: [2, 5, 10, 20, 50],
}

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        nPage: (state, action) => {
            state.nPage = action.payload;
        },
        
    }
})

export default paginationSlice.reducer;

export const {
    setCurrentPage,
    nPage
} = paginationSlice.actions;


export const selectPagination = (state: RootState) => state.pagination.currentPage;
export const selectSearch = (state: RootState) => state.pagination.nPage;
export const selectUsersPerPage = (state: RootState) => state.pagination.usersPerPage;