import { combineReducers,configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../services/ApiSlice";
import authReducer from "./reducers/AuthSlice";



export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
  