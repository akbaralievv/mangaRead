import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { links } from '../../service/links';

const url = links.PROFILE;

export const getUsers = createAsyncThunk('getUsers', async () => {
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

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(getUsers.pending, (state) => {
      state.data = [];
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.data = [];
      state.loading = false;
      state.error = action.message;
    });
  },
});

export const { clearData } = userSlice.actions;
export default userSlice.reducer;
