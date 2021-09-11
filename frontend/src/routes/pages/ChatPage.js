import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import ChatNavbar from '../../chat/ChatNavbar';
import ChatSection from '../../chat/ChatSection';
// import Chatting from '../../chat/Chatting';
import '../../assets/sass/chat/Chat.scss';
import ChattingList from '../../chat/ChattingList';
import CreateChatRoom from '../../chat/CreateChatRoom';
import SettingChatRoom from '../../chat/SettingChatRoom';
import { getParticipantsList } from '../../../api/ChatApi'


export default function ChatPage({ match, userInfo }) {

    const [participants, setParticipants] = useState([]);
    const [currentParticipants, setCurrentParticipants] = useState([]);

    const handleCurrentParticipants = (arrayOfNumbers) =>{
        setCurrentParticipants(arrayOfNumbers);
    }
    const handleParticipants = (chatRoomNo) => {
        try {
            getParticipantsList(chatRoomNo).then(res => {
                if(res.data.result == "fail") {
                    console.log('fail');
                    return;
                }
                setParticipants(res.data.data);
            })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={"ChattingContainer"} >
            <ChatNavbar currentParticipants={currentParticipants} userInfo={userInfo} participants={participants}/>
            <div className={"chattingRoom"}>
                <Switch>
                <Route exact path={match.path} component={ChattingList} />
                <Route exact path={`${match.path}/:no`} render={(props)=> <ChatSection {...props} handleCurrentParticipants={handleCurrentParticipants} handleParticipants={handleParticipants} />} /> 
                <Route path={`${match.path}/chatroom/create`} component={CreateChatRoom} />
                </Switch>
            </div>
        </div>
    )
}