import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRouter({component: Component, restricted, authentication, reloadUser, userInfo, ...rest}) {

    return(
        <Route {...rest} render={props =>(
            authentication ? 
            <Component  reloadUser={reloadUser} userInfo={userInfo} {...props} />
            : <Redirect to="/account/login" /> )} />
    );
}