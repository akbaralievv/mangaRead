import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { links } from '../../service/links';

const url = links.MANGA;

export const getComment = createAsyncThunk('getComment', async (id) => {
  try {
    const response = await axios.get(`${url}${id}/comments`);
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

const commentSlice = createSlice({
  name: 'commentSlice',
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getComment.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(getComment.pending, (state) => {
      state.data = [];
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getComment.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.message;
    });
  },
});

export const { clearData } = commentSlice.actions;
export default commentSlice.reducer;
