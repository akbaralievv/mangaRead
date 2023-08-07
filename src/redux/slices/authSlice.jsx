import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
  refreshToken: '',
  user: '',
  loading: false,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearTokens: (state) => {
      state.accessToken = '';
      state.refreshToken = '';
    },
    clearUser: (state) => {
      state.user = '';
    },
  },
});

export const { setTokens, setUser, setLoading, setError, clearTokens, clearUser } =
  authSlice.actions;

export default authSlice.reducer;
