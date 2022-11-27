import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export const postSlice = createSlice({
  initialState : {currentPost: null,posts: null,currentFeed: null,feed: null},
  name: 'postSlice',
  reducers: {
    setFeedCollection: (state,action) =>
    {
        const feed = action.payload;
        state.feed = feed;
    },
    setPostsCollection: (state,action) =>
    {
        const posts = action.payload;
        state.posts = posts;
    },
    setCurrentPost: (state,action) =>
    {
        const currentPost = action.payload;
        state.currentPost = currentPost;
    },
    setCurrentFeed: (state,action) =>
    {
        const currentFeed = action.payload;
        state.currentFeed = currentFeed;
    },
    clearPostsCollection: (state) =>
    {
        state.posts = null;
    },
    clearCurrentPost: (state) =>
    {
        state.currentPost = null;
    },
    clearCurrentFeed: (state) =>
    {
        state.currentFeed = null;
    }
  },
});

export const { setPostsCollection,
  setCurrentPost,
  clearPostsCollection,
  clearCurrentPost, 
  setFeedCollection,
setCurrentFeed,
clearCurrentFeed} = postSlice.actions;

export default postSlice.reducer;
