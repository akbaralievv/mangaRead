import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { links } from '../../service/links';
import { setAccessToken, setRefreshToken } from '../../helpers/token';

const url = links.SIGNIN;

const handleSuccessfulSignIn = (accessToken, refreshToken) => {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
};

export const postSignIn = createAsyncThunk('postSignIn', async ({ data, rememberMe }) => {
  try {
    const response = await axios.post(url, data);
    if (response.status === 200) {
      const responseData = await response.data;
      handleSuccessfulSignIn(responseData.access, responseData.refresh);
      if (rememberMe) {
        const formDataObject = {};
        for (const [key, value] of data.entries()) {
          formDataObject[key] = value;
        }
        localStorage.setItem('rememberedUser', JSON.stringify(formDataObject));
      } else {
        localStorage.removeItem('rememberedUser');
      }
      return responseData;
    } else {
      throw Error(`error ${response.status}`);
    }
  } catch (e) {
    throw e.response.status;
  }
});

const initialState = { data: '', loading: false, error: '', username: '', rememberMe: false };

const signInSlice = createSlice({
  name: 'signInSlice',
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = '';
    },
    clearUsername: (state) => {
      state.username = '';
    },
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postSignIn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.username = action.payload.user;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(postSignIn.pending, (state) => {
      state.data = '';
      state.loading = true;
      state.error = '';
    });
    builder.addCase(postSignIn.rejected, (state, action) => {
      state.data = '';
      state.loading = false;
      state.error = action.message;
    });
  },
});

export const { clearData, setRememberMe, clearUsername } = signInSlice.actions;
export default signInSlice.reducer;
