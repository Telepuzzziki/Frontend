import { configureStore } from '@reduxjs/toolkit';
import { uiReducer, uiStoreName } from './ui';

export const reducers = {
  [uiStoreName]: uiReducer,
};
export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
