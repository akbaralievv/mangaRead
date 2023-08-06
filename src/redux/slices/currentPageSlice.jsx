import { createSlice } from '@reduxjs/toolkit';

const currentPageSlice = createSlice({
  name: 'currentPageSlice',
  initialState: {
    page: '',
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.page = action.payload > 1 ? 12 * (action.payload - 1) : '';
    },
  },
});

export const { setCurrentPage } = currentPageSlice.actions;
export default currentPageSlice.reducer;
