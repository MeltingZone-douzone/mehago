import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRouter({component: Component, restricted, authentication, handleAuthentication, reloadUser, userInfo, ...rest}) {

    return(
        <Route {...rest} render={props =>(
            authentication ? 
            <Component handleAuthentication={handleAuthentication} reloadUser={reloadUser} userInfo={userInfo} {...props} />
            : <Redirect to="/account/login" /> )} />
    );
}