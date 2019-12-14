import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import './app.scss';
import 'antd/dist/antd.css';

const rootEl = document.getElementById('root');

ReactDOM.render(<Provider store={store}><App/></Provider>, rootEl);