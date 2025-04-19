import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CSVFile, uiStateName } from './type';
import { uiInitialState } from './constants';

const uiSlice = createSlice({
  name: uiStateName,
  initialState: uiInitialState,
  reducers: {
    setActiveTab(state, { payload }: PayloadAction<number>) {
      state.activeTab = payload as number;
    },
    setFile(state, { payload }: PayloadAction<CSVFile | null>) {
      state.file = payload as CSVFile | null;
    },
    setRequestStarted(state, { payload }: PayloadAction<string>) {
      state.requests[payload] = 'pending';
    },
    setRequestFinished(state, { payload }: PayloadAction<string>) {
      state.requests[payload] = 'fetched';
    },
    resetRequest(state, { payload }: PayloadAction<string>) {
      state.requests[payload] = 'idle';
    },
  },
});

export const { name, reducer, actions } = uiSlice;
