import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./features/setTokenSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import thunk from "redux-thunk";

const persistConfig= {
    key: 'root',
    storage,
    whitelist: ['tokenSaver']
}

const rootReducer = combineReducers({
    tokenSaver: tokenReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer )

export const store = configureStore({
    reducer: {
        persistedReducer 
    },
    middleware: [thunk]
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;