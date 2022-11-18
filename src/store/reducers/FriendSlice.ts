import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export const friendSlice = createSlice({
  initialState : {currentFriend: null,friends: null},
  name: 'friendSlice',
  reducers: {
    setFriendsCollection: (state,action) =>
    {
        const friends = action.payload;
        state.friends = friends;
    },
    setCurrentFriend: (state,action) =>
    {
        const currentFriend = action.payload;
        state.currentFriend = currentFriend;
    },
    clearFriendsCollection: (state) =>
    {
        state.friends = null;
    },
    clearCurrentFriend: (state) =>
    {
        state.currentFriend = null;
    }
  },
});

export const { setFriendsCollection,
  setCurrentFriend,
  clearFriendsCollection,
  clearCurrentFriend, } = friendSlice.actions;

export default friendSlice.reducer;

export const selectCurrentfriend = (state : any) => state.friend.currentfriend
export const selectfriendsCollection = (state : any) => state.auth.friendsCollection