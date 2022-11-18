import { combineReducers,configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../services/ApiSlice";
import authReducer from "./reducers/AuthSlice";
import userReducer from "./reducers/UserSlice";
import friendReducer from "./reducers/FriendSlice";
import albumReducer from "./reducers/AlbumSlice";
import photoReducer from "./reducers/PhotoSlice";



export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        user: userReducer,
        friend: friendReducer,
        album: albumReducer,
        photo: photoReducer
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
  