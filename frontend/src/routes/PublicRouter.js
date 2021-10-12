import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PublicRouter({ component: Component, handleAuthentication, authentication, setAuthentication, restricted, userInfo, setUserInfo, isExistToken, ...rest }) {
    
    return (
        <Route {...rest} render={props => (
            authentication && restricted ?
                <Redirect to="/" />
                : <Component setAuthentication={setAuthentication} userInfo={userInfo} setUserInfo={setUserInfo} handleAuthentication={handleAuthentication} authentication={authentication} isExistToken={isExistToken}{...props} />)} />
    );
}