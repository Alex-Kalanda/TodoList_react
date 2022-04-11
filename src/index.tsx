import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'normalize.css/normalize.css';
import App from './App';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
const component = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
root.render(component);
