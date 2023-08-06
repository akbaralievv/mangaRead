import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { links } from '../../service/links';

const url = links.GENRE;

export const getGenre = createAsyncThunk('getGenre', async () => {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const data = await response.data;
      return data;
    } else {
      throw Error(`error ${response.status}`);
    }
  } catch (e) {
    throw e.response.status;
  }
});

const initialState = { data: [], loading: false, error: '' };

const genreSlice = createSlice({
  name: 'genreSlice',
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGenre.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(getGenre.pending, (state) => {
      state.data = [];
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getGenre.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.message;
    });
  },
});

export const { clearData } = genreSlice.actions;
export default genreSlice.reducer;
