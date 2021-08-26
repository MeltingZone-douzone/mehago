import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkingAuthenticateApi } from '../../api/AccountApi';

export default function PublicRouter({component: Component, restricted, ...rest}) {

    return(
        <Route {...rest} render={props =>(
            checkingAuthenticateApi().then(res => res) && restricted? 
            <Redirect to="/profile" /> 
            : <Component {...props} /> )} />
    );
}