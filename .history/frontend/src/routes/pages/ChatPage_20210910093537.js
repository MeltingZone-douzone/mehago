import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import ChatNavber from '../../chat/ChatNavbar';
import ChatSection from '../../chat/ChatSection';
// import Chatting from '../../chat/Chatting';
import '../../assets/sass/chat/Chat.scss';
import ChattingList from '../../chat/ChattingList';
import CreateChatRoom from '../../chat/CreateChatRoom';


<<<<<<< HEAD
export default function ChatPage({match}){

    const [currentParticipants, setCurrentParticipants] = useState([]);

=======
export default function ChatPage({userInfo,match}){
    // console.log(userInfo);
>>>>>>> 4ce4d7760db1005b2779ca4d2033a711eca17858
    return (
        <div className={"ChattingContainer"} >
            <ChatNavber currentParticipants={currentParticipants}/>
            <div className={"chattingRoom"}>
                <Switch>
                <Route exact path={match.path} component={ChattingList} />
                <Route exact path={`${match.path}/:no`} render={(props)=> <ChatSection {...props} setCurrentParticipants={setCurrentParticipants} />} /> 
                <Route path={`${match.path}/chatroom/create`} component={CreateChatRoom} />
                </Switch>
            </div>
        </div>
    )
}