import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import ChatNavbar from '../../chat/navigation/ChatNavbar';
import ChatSection from '../../chat/chatSection/ChatSection';
import '../../assets/sass/chat/Chat.scss';
import ChatList from '../../chat/ChatList';
import CreateChatRoom from '../../chat/CreateChatRoom';
import { getParticipantsList, getMyChatListApi } from '../../../api/ChatApi'

import { io } from 'socket.io-client';

const socket = io('http://localhost:8888');
export default function ChatPage({ match, userInfo }) {

    const [participants, setParticipants] = useState([]);
    const [currentParticipants, setCurrentParticipants] = useState([]);
    const [participatingRoom, setParticipatingRoom] = useState([]);

    useEffect(() => {
        socket.on(`room:updateInfo`, (msg) => {
            setParticipatingRoom(participatingRoom.map((room) =>
                room.no === msg.roomObject.no ? { ...room, ["title"]: msg.roomObject.title, ["thumbnailUrl"]: msg.roomObject.thumbnailUrl } : room
            ));
        })
    }, [participatingRoom]);

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
                if (res.data.result == "fail") { //리스트 없으면
                    setParticipatingRoom([]);
                    return false;
                }
                setParticipatingRoom(res.data.data);
            });
        } catch (e) {
            console.log(e);
        }
    }

    const updateParticipatingRoom = (updatedData) => {

        let newArr = participatingRoom.map((room) => {
            if (room.no != updatedData.no) {
                return room;
            }
        })
        newArr = newArr.filter(arr => typeof arr === 'object');
        // is_deleted도 받아서 변경여부 파악하고 array 수정시켜야 할듯
        if (updatedData.title === "(알수없음") {
            const updatedParticipatingRoom = newArr;
            setParticipatingRoom(updatedParticipatingRoom);
            return;
        } else {
            const updatedParticipatingRoom = [].concat(updatedData, newArr);
            setParticipatingRoom(updatedParticipatingRoom);
        }
    }

    return (
        <div className={"ChattingContainer"} >
            <ChatNavbar socket={socket} currentParticipants={currentParticipants} userInfo={userInfo} participants={participants} fetchRooms={fetchRooms} participatingRoom={participatingRoom} setParticipatingRoom={setParticipatingRoom} updateParticipatingRoom={updateParticipatingRoom} />
            <div className={"chattingRoom"}>
                <Switch>
                    <Route exact path={match.path} render={(props) => <ChatList {...props} socket={socket} userInfo={userInfo} />} />
                    <Route exact path={`${match.path}/:no`} render={(props) => <ChatSection {...props} socket={socket} handleCurrentParticipants={handleCurrentParticipants} handleParticipants={handleParticipants} userInfo={userInfo} fetchRooms={fetchRooms} />} />
                    <Route path={`${match.path}/chatroom/create`} render={(props) => <CreateChatRoom {...props} fetchRooms={fetchRooms} participatingRoom={participatingRoom} />} />
                </Switch>
            </div>
        </div>
    )
}