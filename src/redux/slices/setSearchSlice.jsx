import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
};

const setSearchSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = setSearchSlice.actions;

export default setSearchSlice.reducer;
