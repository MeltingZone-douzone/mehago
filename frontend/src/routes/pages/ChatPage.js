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
    
    console.log(participatingRoom);
    useEffect(() => {
        console.log(participatingRoom);
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
        if(chatRoomNo) {
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
        } else{
            setParticipants([]);
        }
    }

    
    console.log(participatingRoom);
    const updateParticipatingRoom = (updatedData) => {
        console.log(participatingRoom);
        const updatedParticipatingRoom = participatingRoom.map((room) =>{
            if(room.no != updatedData.no) {
                return room;
            } else {
                return updatedData;
            }
        })
        setParticipatingRoom(updatedParticipatingRoom);
    }

    const updateParticipatingRoomMessage = (updatedData) => {
        console.log(participatingRoom);
        let newArr = participatingRoom.map((room)=>{
            if(room.no != updatedData.no) {
                return room;
            }
        })
        newArr = newArr.filter(arr => typeof arr === 'object');
        const updatedParticipatingRoom = [].concat(updatedData, newArr);
        setParticipatingRoom(updatedParticipatingRoom);
    }

    const deletedParticipatingRoom = () =>{
    
    }

    const fetchRooms = () => {
        console.log(participatingRoom);
        try {
            getMyChatListApi().then(res => {
                if (res.data.result == "fail") {
                    console.log('fetchRooms fail: ', res.data.data);
                    return false;
                }
                // setParticipatingRoom(res.data.data);
                setParticipatingRoom((prevState)=> {
                    return Object.assign([], prevState, res.data.data)
                });
                console.log('fetchRooms : ', res.data.data);
            });
        } catch (e) {
            console.log(e);
        }
    }
    console.log(participatingRoom);
    return (
        <div className={"ChattingContainer"} >
            <ChatNavbar socket={socket} currentParticipants={currentParticipants} userInfo={userInfo} participants={participants} setParticipants = {setParticipants} fetchRooms={fetchRooms} participatingRoom={participatingRoom} updateParticipatingRoom={updateParticipatingRoom} updateParticipatingRoomMessage={updateParticipatingRoomMessage} deletedParticipatingRoom={deletedParticipatingRoom} />
            <div className={"chattingRoom"}>
                <Switch>
                    <Route exact path={match.path} render={(props) => <ChatList {...props} socket={socket} userInfo={userInfo} />} />
                    <Route exact path={`${match.path}/:no`} render={(props) => <ChatSection {...props} socket={socket} handleCurrentParticipants={handleCurrentParticipants} handleParticipants={handleParticipants} participants={participants} userInfo={userInfo} fetchRooms={fetchRooms}/>} />
                    <Route path={`${match.path}/chatroom/create`} render={(props) => <CreateChatRoom {...props} fetchRooms={fetchRooms} participatingRoom={participatingRoom} />} />
                </Switch>
            </div>
        </div>
    )
}