import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filterSlice',
  initialState: {
    types: [],
    genres: [],
    fromYear: '',
    toYear: '',
    send: false,
  },
  reducers: {
    setTypeFilter: (state, action) => {
      state.types = action.payload;
    },
    setGenreFilter: (state, action) => {
      state.genres = action.payload;
    },
    setSend: (state, action) => {
      state.send = action.payload;
    },
    clearDataFilter: (state) => {
      state.types = [];
      state.genres = [];
      state.send = false;
      state.fromYear = '';
      state.toYear = '';
    },
    setFromYear: (state, action) => {
      state.fromYear = +action.payload;
    },
    setToYear: (state, action) => {
      state.toYear = +action.payload;
    },
  },
});

export const { setTypeFilter, setGenreFilter, setSend, clearDataFilter, setFromYear, setToYear } =
  filterSlice.actions;
export default filterSlice.reducer;
