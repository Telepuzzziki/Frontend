import MainLayout from '@layouts/MainLayout';
import { GlobalStyles } from '@lib/theme/globalStyles';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <MainLayout />
    </Provider>
  );
}

export default App;
