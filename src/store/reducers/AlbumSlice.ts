import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export const albumSlice = createSlice({
  initialState : {currentAlbum: null,albums: null},
  name: 'albumSlice',
  reducers: {
    setAlbumsCollection: (state,action) =>
    {
        const albums = action.payload;
        state.albums = albums;
    },
    setCurrentAlbum: (state,action) =>
    {
        const currentAlbum = action.payload;
        state.currentAlbum = currentAlbum;
    },
    clearAlbumsCollection: (state) =>
    {
        state.albums = null;
    },
    clearCurrentAlbum: (state) =>
    {
        state.currentAlbum = null;
    }
  },
});

export const { setAlbumsCollection,
  setCurrentAlbum,
  clearAlbumsCollection,
  clearCurrentAlbum, } = albumSlice.actions;

export default albumSlice.reducer;

export const selectCurrentAlbum = (state : any) => state.album.currentalbum
export const selectalbumsCollection = (state : any) => state.auth.albumsCollection