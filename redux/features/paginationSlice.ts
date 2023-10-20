import { createSlice } from "@reduxjs/toolkit";

interface RootState {
    pagination: {
        currentPage: number;
        usersPerPage: number;
        searchResults: any[];
      };
  }

const initialState = {
    currentPage: 1,
    usersPorPage: 9,
    searchResults: [],
}

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        },
        
    }
})

export default paginationSlice.reducer;

export const {
    setCurrentPage,
    setSearchResults
} = paginationSlice.actions;


export const selectPagination = (state: RootState) => state.pagination.currentPage;
export const selectSearch = (state: RootState) => state.pagination.searchResults;
export const selectUsersPerPage = (state: RootState) => state.pagination.usersPerPage;