export const uiStateName = 'ui';

export type RequestState = 'idle' | 'pending' | 'fetched';

export type UIState = {
  requests: Record<string, RequestState>;
  activeTab: number;
};

export type StoreWithUIState = {
  [uiStateName]: UIState;
};
