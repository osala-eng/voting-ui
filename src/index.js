import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App'
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

const container = document.getElementById('App');
const root = ReactDOMClient.createRoot(container);

root.render(

  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App

