import React, { Fragment } from 'react';
import ReactDOM from "react-dom";
import App from './App.js';
import GlobalStyle from './assets/styles/GlobalStyle';

ReactDOM.render(
    <Fragment>
        <GlobalStyle />
        <App />
    </Fragment>
    ,document.getElementById('root'));