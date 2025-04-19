import MainLayout from '@layouts/MainLayout';
import { GlobalStyles } from '@lib/theme/globalStyles';
import { Provider } from 'react-redux';
import { store } from './store';
import { DefaultToastOptions, Toaster } from 'react-hot-toast';
const TOAST_OPTIONS: DefaultToastOptions = { style: { fontSize: 15 } };

function App() {
  return (
    <Provider store={store}>
      <Toaster position="top-right" toastOptions={TOAST_OPTIONS} />
      <GlobalStyles />
      <MainLayout />
    </Provider>
  );
}

export default App;
