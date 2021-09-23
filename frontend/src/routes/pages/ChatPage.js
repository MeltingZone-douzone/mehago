import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import ChatNavbar from '../../chat/navigation/ChatNavbar';
import ChatSection from '../../chat/chatSection/ChatSection';
// import Chatting from '../../chat/Chatting';
import '../../assets/sass/chat/Chat.scss';
import ChatList from '../../chat/ChatList';
import CreateChatRoom from '../../chat/CreateChatRoom';
import SettingChatRoom from '../../chat/SettingChatRoom';
import { getParticipantsList, getMyChatListApi } from '../../../api/ChatApi'

import { io } from 'socket.io-client';

const socket = io('http://localhost:8888');
export default function ChatPage({ match, userInfo }) {

    const [participants, setParticipants] = useState([]);
    const [currentParticipants, setCurrentParticipants] = useState([]);
    const [participatingRoom, setParticipatingRoom] = useState([]);

    const handleCurrentParticipants = (arrayOfNumbers) => {
        setCurrentParticipants(arrayOfNumbers);
    }
    const handleParticipants = (chatRoomNo) => {
        try {
            getParticipantsList(chatRoomNo).then(res => {
                if (res.data.result == "fail") {
                    console.log('fail');
                    return;
                }
                setParticipants(res.data.data);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const fetchRooms = () => {
        try {
            getMyChatListApi().then(res => {
                if(res.data.result == "fail"){
                    return false;
                }
                // console.log(res.data.data);
                setParticipatingRoom(res.data.data);
            });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={"ChattingContainer"} >
            <ChatNavbar socket={socket} currentParticipants={currentParticipants} userInfo={userInfo} participants={participants} fetchRooms={fetchRooms} participatingRoom={participatingRoom} />
            <div className={"chattingRoom"}>
                <Switch>
                    <Route exact path={match.path} component={ChatList} />
                    <Route exact path={`${match.path}/:no`} render={(props) => <ChatSection {...props} socket={socket} handleCurrentParticipants={handleCurrentParticipants} handleParticipants={handleParticipants} userInfo={userInfo}/>} />
                    <Route path={`${match.path}/chatroom/create`} render={(props) => <CreateChatRoom {...props}  fetchRooms={fetchRooms} participatingRoom={participatingRoom} />}/>
                    <Route path={`${match.path}/setting/:no`} component={SettingChatRoom} />
                </Switch>
            </div>
        </div>
    )
}