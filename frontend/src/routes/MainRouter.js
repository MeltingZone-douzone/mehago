import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';

import ProfileSettingsPage from './pages/ProfileSettingsPage';
import AccountPage from './pages/AccountPage';
import SettingChatRoom from '../chat/SettingChatRoom';
import Header from '../components/Header';
import Chatting from '../chat/Chatting';

import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';


export default function MainRouter() {

    return (
        <Router>
            <Fragment>
                <Header />
                <WebPage>
                    <Switch>
                        <PublicRouter restricted={true} exact path="/" component={AccountPage} />
                        <PublicRouter restricted={false} path="/account" component={AccountPage} />
                        <PublicRouter path="/room" component={SettingChatRoom} />
                        <PrivateRouter path="/profile" component={ProfileSettingsPage} />
                        <PrivateRouter path="/chat" component={Chatting} />
                    </Switch>
                </WebPage>
            </Fragment>
        </Router>
    )
}

const WebPage = styled.div`
    margin-top:51px;
    padding:0 2em;
`