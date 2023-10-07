import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterface } from "@/components/interfaces";

interface UsersState {
    users: UserInterface[];
  }

const initialState = {
    users: [],
}
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        setUsers:(state, action) => {
            state.users = action.payload;
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter(user => user.id !== action.payload);
          },
        editUser: (state, action: PayloadAction<UserInterface>) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
              state.users[index] = action.payload;
            }
          },
        
    }
})

export default userSlice.reducer;

export const {
    setUsers,
} = userSlice.actions;