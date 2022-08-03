import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app/app';
import { places } from './mocks/places';
import { Provider } from 'react-redux';
import { api, store } from './store/store';
import { loadPlaces, injectAPI } from './store/api-actions';
injectAPI(api);

store.dispatch(loadPlaces());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App places={places} />
    </Provider>
  </React.StrictMode>
);
