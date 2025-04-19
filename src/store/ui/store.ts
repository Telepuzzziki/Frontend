import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CSVFile, uiStateName } from './type';
import { uiInitialState } from './constants';
import { Equipment, EquipmentData } from '@type/common';

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
    setEquipment(state, { payload }: PayloadAction<Equipment[]>) {
      state.equipment = payload as Equipment[];
    },
    setSolve(state, { payload }: PayloadAction<EquipmentData[]>) {
      state.solve = payload as EquipmentData[];
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
