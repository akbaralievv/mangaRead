import { createSlice } from '@reduxjs/toolkit';

const openModalSlice = createSlice({
  name: 'openModalSlice',
  initialState: {
    open: false,
    active: false,
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setOpen, setActive } = openModalSlice.actions;
export default openModalSlice.reducer;
