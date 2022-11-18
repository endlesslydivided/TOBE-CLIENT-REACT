import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export const photoSlice = createSlice({
  initialState : {currentPhoto: null,photos: null},
  name: 'photoSlice',
  reducers: {
    setPhotosCollection: (state,action) =>
    {
        const photos = action.payload;
        state.photos = photos;
    },
    setCurrentPhoto: (state,action) =>
    {
        const currentPhoto = action.payload;
        state.currentPhoto = currentPhoto;
    },
    clearPhotosCollection: (state) =>
    {
        state.photos = null;
    },
    clearCurrentPhoto: (state) =>
    {
        state.currentPhoto = null;
    }
  },
});

export const { setPhotosCollection,
  setCurrentPhoto,
  clearPhotosCollection,
  clearCurrentPhoto, } = photoSlice.actions;

export default photoSlice.reducer;

export const selectCurrentPhoto = (state : any) => state.photo.currentPhoto
export const selectPhotosCollection = (state : any) => state.auth.photosCollection