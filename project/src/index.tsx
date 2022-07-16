import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app/app';
import { reviews, places } from './mocks/mocks';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App reviews={reviews} places={places} />
  </React.StrictMode>
);
