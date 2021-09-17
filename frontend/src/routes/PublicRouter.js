import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PublicRouter({component: Component, authentication, setAuthentication, restricted, ...rest}) {

    return(
        <Route {...rest} render={props =>(
            authentication && restricted? 
            <Redirect to="/" /> 
            : <Component setAuthentication={setAuthentication} {...props} /> )} />
    );
}