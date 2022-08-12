import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app/app';
import { places } from './mocks/places';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { checkAuthAction, loadFavorites, loadPlaces } from './store/api-actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(loadPlaces());
store.dispatch(checkAuthAction());
store.dispatch(loadFavorites());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App places={places} />
    </Provider>
  </React.StrictMode>
);
