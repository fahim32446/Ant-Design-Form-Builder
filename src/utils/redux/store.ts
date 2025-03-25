import { configureStore } from '@reduxjs/toolkit';
import filedReducer from './slice/formInformation.slice';

export const store = configureStore({
  reducer: {
    filed: filedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
