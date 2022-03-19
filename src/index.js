import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './redux/store';
import App from './App';
import './styles/bootstrap.min.css';
import './styles/main.scss';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />{' '}
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
