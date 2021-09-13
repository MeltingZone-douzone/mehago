import React, { Fragment, useEffect, useState } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';

import ProfileSettingsPage from './pages/ProfileSettingsPage';
import AccountPage from './pages/AccountPage';
import Header from '../header/Header';
import ChatPage from './pages/ChatPage';

import { getUserInfoApi } from '../../api/AccountApi';

import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';
import HomePage from './pages/HomePage';


export default function MainRouter() {
    
    const [userInfo, setUserInfo] = useState({nickname:"", name:"", phoneNumber:"" , thumbnailUrl:"" });
    const [authentication, setAuthentication] = useState(false);

    const handleAuthentication = (result) => {
        setAuthentication(result);
    }

    useEffect(()=>{
        if(localStorage.getItem("token")) {
            setAuthentication(true);
        }
    },[])

    useEffect(()=>{
        if(authentication) {
            getUserInfo();
        }
    },[authentication])

    const getUserInfo = () => {
        getUserInfoApi().then(res =>{
            if(res.data.result === "fail") {
                alert(res.data.message);
                history.replace("/account/login");
            }
            setUserInfo(res.data.data);
        });
    }


    return (
        <Router>
            <Fragment>
                <Header handleAuthentication={handleAuthentication} authentication={authentication} userInfo={userInfo}/>
                <WebPage>
                    <Switch>
                            {/* 로그인(토큰이 존재)을 하고서도 들어올 수 있는 공용 라우터 => <PublicRouter restricted={false} */}
                        <PublicRouter authentication={authentication} restricted={false} exact path="/"  component={HomePage} /> 
                            {/* 로그인(토큰이 존재)을 하면 들어올 수 없는 공용 라우터 => <PublicRouter restricted={true} */}
                        <PublicRouter authentication={authentication} setAuthentication={handleAuthentication} restricted={true} path="/account" component={AccountPage} />
                            {/* 로그인(토큰이 존재)을 해야 들어올 수 있는 라우터 => <privateRouter */}
                        <PrivateRouter reloadUser={getUserInfo} authentication={authentication} userInfo={userInfo} path="/profile" component={ProfileSettingsPage} />
                        {/* <Route authentication={authentication} userInfo={userInfo} path="/chat" component={ChatPage} /> */}
                        <PrivateRouter authentication={authentication} userInfo={userInfo} path="/chat" component={ChatPage} />
                        {/* <PrivateRouter authentication={authentication} userInfo={userInfo} path="/chat" render={(props) => <ChatPage {...props} userInfo={userInfo} />}/> */}
                    </Switch>
                </WebPage>
            </Fragment>
        </Router>
    )
}

const WebPage = styled.div`
    margin-top:51px;
    padding:0 0em;
`