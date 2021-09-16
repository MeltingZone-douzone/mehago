import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PublicRouter({ component: Component, authentication, setAuthentication, isExistToken, restricted, ...rest }) {

    return (
        <Route {...rest} render={props => (
            authentication && restricted ?
                <Redirect to="/profile" />
                : <Component isExistToken={isExistToken} setAuthentication={setAuthentication} {...props} />)} />
    );
}