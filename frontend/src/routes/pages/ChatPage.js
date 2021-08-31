import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ChatNavber from '../../chat/ChatNavbar';
import ChatSection from '../../chat/ChatSection';
// import Chatting from '../../chat/Chatting';
import styles from '../../assets/sass/chat/Chat.scss';
import ChattingList from '../../chat/ChattingList';


export default function ChatPage(){
    return (
        <nav className={styles.nav} >
            <ChatNavber/>
            <div className={styles.chattingRoom}>
                <Route exact path="/chat" component={ChattingList} />
                <Route exact path="/chat/c1" component={ChatSection} />
                {/* <Route exact path="/chat/c2" component={Chatting} /> */}
            </div>
        </nav>
    )
}