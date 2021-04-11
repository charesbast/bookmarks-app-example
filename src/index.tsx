import { StylesProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import App from 'src/containers/App';

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
