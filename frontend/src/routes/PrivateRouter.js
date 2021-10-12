import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRouter({component: Component, restricted, authentication, handleAuthentication, reloadUser, reloadHeaderAlarm, userInfo, ...rest}) {

    return(
        <Route {...rest} render={props =>(
            authentication ? 
            <Component handleAuthentication={handleAuthentication} reloadUser={reloadUser} userInfo={userInfo} reloadHeaderAlarm={reloadHeaderAlarm} {...props} />
            : <Redirect to="/" /> )} />
    );
}