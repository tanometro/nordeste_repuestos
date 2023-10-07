import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import paginationReducer from './features/paginationSlice';
import { userApi } from "./services/usersApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

// const persistConfig= {
//     key: 'root',
//     storage,
//     whitelist: ['tokenSaver']
// }

export const store = configureStore({
    reducer: {
       userReducer,
       paginationReducer,
       [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([userApi.middleware])
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

