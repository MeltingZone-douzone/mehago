import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ChatNavber from '../../chat/ChatNavbar';
import ChatSection from '../../chat/ChatSection';
// import Chatting from '../../chat/Chatting';
import '../../assets/sass/chat/Chat.scss';
import ChattingList from '../../chat/ChattingList';
import CreateChatRoom from '../../chat/CreateChatRoom';


export default function ChatPage({userInfo,match}){
    // console.log(userInfo);
    return (
        <div className={"ChattingContainer"} >
            <ChatNavber/>
            <div className={"chattingRoom"}>
                <Switch>
                <Route exact path={match.path} component={ChattingList} />
                <Route exact path={`${match.path}/:no`} component={ChatSection} /> 
                {/* <Route exact path="/chat/c2" component={Chatting} /> */}
                <Route path={`${match.path}/chatroom/create`} component={CreateChatRoom} />
                </Switch>
            </div>
        </div>
    )
}