import { configureStore } from '@reduxjs/toolkit';

import GenreSlice from './slices/GenreSlice';
import MangaSlice from './slices/MangaSlice';
import currentPageSlice from './slices/currentPageSlice';
import InfoMangaSlice from './slices/InfoMangaSlice';
import openModalSlice from './slices/openModalSlice';
import SignUpSlice from './slices/SignUpSlice';
import SignInSlice from './slices/SignInSlice';
import authSlice from './slices/authSlice';
import GetCommentSLice from './slices/GetCommentSLice';
import PostCommentSlice from './slices/PostCommentSlice';
import PostLogoutSlice from './slices/PostLogoutSlice';
import GetUserSlice from './slices/GetUserSlice';
import setSearchSlice from './slices/setSearchSlice';
import filterSlice from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    GenreSlice,
    MangaSlice,
    currentPageSlice,
    InfoMangaSlice,
    openModalSlice,
    SignUpSlice,
    SignInSlice,
    authSlice,
    GetCommentSLice,
    PostCommentSlice,
    PostLogoutSlice,
    GetUserSlice,
    setSearchSlice,
    filterSlice,
  },
});
