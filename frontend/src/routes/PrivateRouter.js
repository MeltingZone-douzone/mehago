import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkingAuthenticateApi } from '../../api/AccountApi';

export default function PrivateRouter({component: Component, restricted, ...rest}) {

    return(
        <Route {...rest} render={props =>(
            checkingAuthenticateApi().then(res => res) ? 
            <Component {...props} />
            : <Redirect to="/account/login" /> )} />
    );
}