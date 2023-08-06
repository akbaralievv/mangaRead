import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { links } from '../../service/links';

const url = links.MANGA;

export const getManga = createAsyncThunk('getManga', async ({ page }) => {
  try {
    const response = await axios.get(url, {
      params: {
        limit: '12',
        offset: page,
      },
    });
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

const mangaSlice = createSlice({
  name: 'mangaSlice',
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getManga.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(getManga.pending, (state) => {
      state.data = [];
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getManga.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.message;
    });
  },
});

export const { clearData } = mangaSlice.actions;
export default mangaSlice.reducer;
