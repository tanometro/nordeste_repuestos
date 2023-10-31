import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "@/app/components/interfaces";

interface UsersState {
    users: UserInterface[];
  }

  interface RootState {
    commission: {
      defaultCommission: number;
    };
  }
  
const initialState = { 
    defaultCommission: 5,
}
export const commissionSlice = createSlice({
    name: "commission",
    initialState,
    reducers: {
        setCommission: (state, action) => {
          state.defaultCommission = action.payload.defaultCommission;
        }
    }
})

export default commissionSlice.reducer;

export const { setCommission } = commissionSlice.actions;

export const selectCommission = (state: RootState) => state.commission.defaultCommission;



