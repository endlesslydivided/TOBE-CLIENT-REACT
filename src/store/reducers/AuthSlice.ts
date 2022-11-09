import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export const authSlice = createSlice({
  initialState : {user: null},
  name: 'authSlice',
  reducers: {
    setCredentials: (state,action) =>
    {
        const {user} = action.payload;
        state.user = user;
    },
    logOut: (state) =>
    {
        state.user = null;
    }
  },
});

export const { logOut, setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state : any) => state.auth.user
export const selectCurrentToken = (state : any) => state.auth.token