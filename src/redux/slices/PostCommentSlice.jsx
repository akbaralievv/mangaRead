import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { links } from '../../service/links';
import { api } from '../../helpers/interceptors';

const url = links.MANGA;

export const postComment = createAsyncThunk('postComment', async ({ id, value }) => {
  try {
    const response = await api.post(`${url}${id}/add-comment/`, { text: value });
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

const addCommentSlice = createSlice({
  name: 'addCommentSlice',
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(postComment.pending, (state) => {
      state.data = '';
      state.loading = true;
      state.error = '';
    });
    builder.addCase(postComment.rejected, (state, action) => {
      state.data = '';
      state.loading = false;
      state.error = action.message;
    });
  },
});

export const { clearData } = addCommentSlice.actions;
export default addCommentSlice.reducer;
