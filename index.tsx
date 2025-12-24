import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
const loadingElement = document.getElementById('loading');

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Once the app is initialized (simple timer to simulate loading or handle initial render)
window.addEventListener('load', () => {
    if (loadingElement) loadingElement.style.display = 'none';
    if (rootElement) rootElement.style.display = 'flex';
});