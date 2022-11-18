import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export const userSlice = createSlice({
  initialState : {currentUser: null,users: null},
  name: 'userSlice',
  reducers: {
    setUsersCollection: (state,action) =>
    {
        const users = action.payload;
        state.users = users;
    },
    setCurrentUser: (state,action) =>
    {
        const currentUser = action.payload;
        state.currentUser = currentUser;
    },
    clearUsersCollection: (state) =>
    {
        state.users = null;
    },
    clearCurrentUser: (state) =>
    {
        state.currentUser = null;
    }
  },
});

export const { setUsersCollection,
  setCurrentUser,
  clearUsersCollection,
  clearCurrentUser, } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentuser = (state : any) => state.user.currentuser
export const selectusersCollection = (state : any) => state.auth.usersCollection