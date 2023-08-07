import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../helpers/interceptors';
import { links } from '../../service/links';
import { getRefreshToken } from '../../helpers/token';
import { removeAccessToken, removeRefreshToken, removeUser } from '../../helpers/token';

const url = links.LOGOUT;

export const postLogout = createAsyncThunk('postLogout', async () => {
  try {
    const refresh_token = getRefreshToken();
    const response = await api.post(url, { refresh: refresh_token });
    if (response.status === 204) {
      const data = await response.data;
      return data;
    } else {
      throw Error(`error ${response.status}`);
    }
  } catch (e) {
    throw e.response.status;
  }
});

const initialState = { data: '', loading: false, error: '', username: '', success: false };

const logoutSlice = createSlice({
  name: 'logoutSlice',
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLogout.fulfilled, (state, action) => {
      state.data = action.payload;
      state.username = '';
      state.loading = false;
      state.error = '';
      state.success = true;
      removeAccessToken();
      removeRefreshToken();
      removeUser();
    });
    builder.addCase(postLogout.pending, (state) => {
      state.data = '';
      state.loading = true;
      state.error = '';
      state.success = false;
    });
    builder.addCase(postLogout.rejected, (state, action) => {
      state.data = '';
      state.loading = false;
      state.error = action.message;
      state.success = false;
    });
  },
});

export const { clearData } = logoutSlice.actions;
export default logoutSlice.reducer;
