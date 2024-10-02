import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { store } from './common/state/store';
import './index.scss';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);

root.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
);