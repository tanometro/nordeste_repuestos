import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
}

export const setTokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        pushToken: (state, action) => {
            return {
                ...state,
                token: action.payload,
            }
            
        }
    }
})

export const {pushToken} = setTokenSlice.actions;
export default setTokenSlice.reducer;