import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ChatNavber from '../../chat/ChatNavbar';
import ChatSection from '../../chat/ChatSection';
// import Chatting from '../../chat/Chatting';
import styles from '../../assets/sass/chat/Chat.scss';
import ChattingList from '../../chat/ChattingList';
import CreateChatRoom from '../../chat/CreateChatRoom';


export default function ChatPage({match}){
    return (
        <div className={styles.ChattingContainer} >
            <ChatNavber/>
            <div className={styles.chattingRoom}>
                <Switch>
                <Route exact path={match.path} component={ChattingList} />
                <Route exact path="/chat/c1" component={ChatSection} />
                {/* <Route exact path="/chat/c2" component={Chatting} /> */}
                {/* <Route exact path="/chat/:no" component={ChatSection} /> */} 
                <Route path={`${match.path}/chatroom/create`} component={CreateChatRoom} />
                </Switch>
            </div>
        </div>
    )
}