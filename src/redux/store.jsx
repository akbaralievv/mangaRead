import { configureStore } from '@reduxjs/toolkit';

import GenreSlice from './slices/GenreSlice';
import MangaSlice from './slices/MangaSlice';
import currentPageSlice from './slices/currentPageSlice';
import InfoMangaSlice from './slices/InfoMangaSlice';

export const store = configureStore({
  reducer: {
    GenreSlice,
    MangaSlice,
    currentPageSlice,
    InfoMangaSlice,
  },
});
