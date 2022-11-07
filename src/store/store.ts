import { combineReducers,configureStore } from "@reduxjs/toolkit";
import { authAPI } from "../services/AuthService";
import { postAPI } from "../services/PostsService";
import { userApi as userAPI } from "../services/UserService";
import userReducer from './reducers/UserSlice';

const rootReducer = combineReducers({
    [postAPI.reducerPath] : postAPI.reducer,
    [authAPI.reducerPath] : authAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    userState: userReducer,

})

export const setupStore = () =>
{
    return configureStore({
        reducer: rootReducer,
        middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            postAPI.middleware,authAPI.middleware,
            userAPI.middleware
        ])
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']