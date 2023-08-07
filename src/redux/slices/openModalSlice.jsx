import { createSlice } from '@reduxjs/toolkit';

const openModalSlice = createSlice({
  name: 'openModalSlice',
  initialState: {
    open: false,
    active: false,
    visible: false,
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setVisible: (state, action) => {
      state.visible = action.payload;
    },
  },
});

export const { setOpen, setActive, setVisible } = openModalSlice.actions;
export default openModalSlice.reducer;
