import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from "./providers/AuthProvider";
import { Provider } from 'react-redux';
import { store } from './store/index'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </AuthProvider>
    </React.StrictMode>,
  document.getElementById('root')
);
