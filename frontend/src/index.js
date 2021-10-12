import React, { Fragment } from 'react';
import ReactDOM from "react-dom";
import { ThemeProvider } from 'styled-components';
import { device } from './assets/styles/properties/Device.js';
import App from './App.js';
import GlobalStyle from './assets/styles/GlobalStyle';

ReactDOM.render(
    <Fragment>
        <ThemeProvider theme={device}>
            <GlobalStyle />
            <App />
        </ThemeProvider>
    </Fragment>
    ,document.getElementById('root'));