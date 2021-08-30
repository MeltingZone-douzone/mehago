import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ChatNavber from '../../chat/ChatNavbar';
import ChatSection from '../../chat/ChatSection';
import Chatting from '../../chat/Chatting';
import Styles from '../../assets/sass/chat/Chat.scss';

export default function ChatPage(){
    return (
        <nav className={Styles.nav}>
            <ChatNavber />
            <Switch>
                <Route exact path="/chat/c1" component={ChatSection} />
                <Route exact path="/chat/c2" component={Chatting} />
            </Switch>
        </nav>
    )
}