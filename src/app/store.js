import {
  configureStore
} from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import aboutUsInfoReducer from '../features/aboutUs/aboutUsInfoSlice';
import concatUsInfoReducer from '../features/concatUs/concatUsInfoSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    aboutUsInfo: aboutUsInfoReducer,
    concatUsInfo: concatUsInfoReducer
  },
});
export default store;