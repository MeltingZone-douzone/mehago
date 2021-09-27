import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PublicRouter({component: Component, handleAuthentication, authentication, setAuthentication, restricted,userInfo, ...rest}) {

    return(
        <Route {...rest} render={props =>(
            authentication && restricted? 
            <Redirect to="/" /> 
            : <Component setAuthentication={setAuthentication} userInfo={userInfo} handleAuthentication={handleAuthentication} {...props} /> )} />
    );
}