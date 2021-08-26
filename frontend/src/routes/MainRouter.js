import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

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
                        <Route exact path="/" component={AccountPage} />
                        <Route  path="/account" component={AccountPage} />
                        <Route path="/room" component={SettingChatRoom} />
                        <Route path="/profile" component={ProfileSettingsPage} />
                        <Route path="/chat" component={Chatting} />
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