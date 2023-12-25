import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';

// Opt-in to Webpack hot module replacement
if (module.hot) module.hot.accept()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);