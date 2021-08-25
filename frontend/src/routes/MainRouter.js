import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';

import ProfileSettingsPage from './pages/ProfileSettingsPage';
import AccountPage from './pages/AccountPage';
import SettingChatRoom from '../chat/SettingChatRoom';
import Header from '../components/Header';



export default function MainRouter() {

    return (
        <Router>
            <Fragment>
                <Header />
                <WebPage>
                    <Switch>
                        <Route exact path="/"><Redirect to="/account/login" /></Route>
                        <Route path="/profile" component={ProfileSettingsPage} />
                        <Route path="/account" component={AccountPage} />
                        <Route path="/room" component={SettingChatRoom} />
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