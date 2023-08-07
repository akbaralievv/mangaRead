import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { links } from '../../service/links';

const url = links.SIGNUP;

export const postSignUp = createAsyncThunk('postSignUp', async (data) => {
  try {
    const response = await axios.post(url, data);
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

const initialState = { data: '', loading: false, error: '' };

const signUpSlice = createSlice({
  name: 'signUpSlice',
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postSignUp.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(postSignUp.pending, (state) => {
      state.data = '';
      state.loading = true;
      state.error = '';
    });
    builder.addCase(postSignUp.rejected, (state, action) => {
      state.data = '';
      state.loading = false;
      state.error = action.message;
    });
  },
});

export const { clearData } = signUpSlice.actions;
export default signUpSlice.reducer;
