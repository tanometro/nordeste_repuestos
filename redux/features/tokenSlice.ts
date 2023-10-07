import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
}

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        pushToken: (state, action) => {
            return {
                ...state,
                token: action.payload,
            }
            
        },
        
    }
})

export default tokenSlice.reducer;

export const {
    pushToken,
} = tokenSlice.actions;