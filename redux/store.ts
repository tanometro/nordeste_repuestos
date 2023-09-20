import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./features/setTokenSlice";

export const store = configureStore({
    reducer: {
        tokenReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;