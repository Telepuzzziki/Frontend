import { StoreWithUIState, UIState, uiStateName } from './type';

const getState = (store: StoreWithUIState): UIState => store[uiStateName];

export const getActiveTab = (s: StoreWithUIState) => getState(s).activeTab;

// export const getRequests = (
//   s: StoreWithUIState,
// ): Record<string, RequestState> => getState(s).requests;
