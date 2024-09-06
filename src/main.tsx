
import { createRoot } from 'react-dom/client'

import './index.css'
import AppRouter from './router.tsx'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/index.ts';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <AppRouter/>
    </PersistGate>
    </Provider>,
  
)
