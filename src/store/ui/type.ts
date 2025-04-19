import { Equipment, EquipmentData } from '@type/common';

export const uiStateName = 'ui';

export type RequestState = 'idle' | 'pending' | 'fetched';

export type CSVFile = {
  name: string;
  file: File;
};

export type UIState = {
  requests: Record<string, RequestState>;
  activeTab: number;
  file: CSVFile | null;
  equipment?: Equipment[] | null;
  solve: EquipmentData[] | null;
};

export type StoreWithUIState = {
  [uiStateName]: UIState;
};
