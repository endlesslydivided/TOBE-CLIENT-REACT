import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export const fileSlice = createSlice({
  initialState : {files: null},
  name: 'fileSlice',
  reducers: {
    setFiles: (state,action) =>
    {
        state.files = action.payload;
    },
    clearFiles: (state) =>
    {
        state.files = null;
    }
  },
});

export const { setFiles, clearFiles } = fileSlice.actions;

export default fileSlice.reducer;
