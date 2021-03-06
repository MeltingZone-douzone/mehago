import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import ChatNavbar from '../../chat/navigation/ChatNavbar';
import ChatSection from '../../chat/chatSection/ChatSection';
import ChatList from '../../chat/ChatList';
import CreateChatRoom from '../../chat/CreateChatRoom';
import { getParticipantsList, getMyChatListApi } from '../../../api/ChatApi'

import { io } from 'socket.io-client';

const socket = io('http://localhost:8888');
export default function ChatPage({ match, userInfo, reloadHeaderAlarm }) {

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

    const handleParticipants = {
        fetchParticipants: (chatRoomNo) => {
            if (chatRoomNo) {
                try {
                    getParticipantsList(chatRoomNo).then(res => {
                        if (res.data.result == "fail") {
                            return;
                        }
                        setParticipants(res.data.data);
                    })
                } catch (error) {
                    console.log(error);
                }
            } else {
                setParticipants([]);
            }
        },

        leaveParticipant: (leaveParticipantNo) => {
            setParticipants(prevState => prevState.filter(participant => participant.no != leaveParticipantNo));
        }
    }

    const fetchRooms = () => {
        try {
            getMyChatListApi().then(res => {
                if (res.data.result == "fail") { //????????? ?????????
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
        const updatedParticipatingRoom = [].concat(updatedData, newArr);
        setParticipatingRoom(updatedParticipatingRoom);
    }

    const updateParticipatingRoomMessage = (updatedData) => {
        let newArr = participatingRoom.map((room) => {
            if (room.no != updatedData.no) {
                return room;
            }
        })
        newArr = newArr.filter(arr => typeof arr === 'object');
        const updatedParticipatingRoom = [].concat(updatedData, newArr);
        setParticipatingRoom(updatedParticipatingRoom);
    }

    //favoriteRoom ???????????? ????????????
    const [deletedRoom, setDeletedRoom] = useState();

    const deletedParticipatingRoom = {
        deletedParticipatingRoom: ({ chatRoomNo }) => {
            let newArr = participatingRoom.map((room) => {
                if (room.no != chatRoomNo) {
                    return room;
                }
            })
            newArr = newArr.filter(arr => typeof arr === 'object');
            setParticipatingRoom(newArr);
            setDeletedRoom(chatRoomNo);
        },

        handleAlarm: () => {
            reloadHeaderAlarm();
        }
    }
    return (
        <ChattingContainer >
            <ChatNavbar socket={socket} currentParticipants={currentParticipants} userInfo={userInfo} participants={participants} setParticipants={setParticipants} fetchRooms={fetchRooms} participatingRoom={participatingRoom} updateParticipatingRoom={updateParticipatingRoom} updateParticipatingRoomMessage={updateParticipatingRoomMessage} deletedParticipatingRoom={deletedParticipatingRoom} deletedRoom={deletedRoom} />
            <ChattingRoom>
                <Switch>
                    <Route exact path={match.path} render={(props) => <ChatList {...props} socket={socket} userInfo={userInfo} />} />
                    <Route exact path={`${match.path}/:no`} render={(props) => <ChatSection {...props} socket={socket} handleCurrentParticipants={handleCurrentParticipants} handleParticipants={handleParticipants} participants={participants} userInfo={userInfo} fetchRooms={fetchRooms} />} />
                    <Route path={`${match.path}/chatroom/create`} render={(props) => <CreateChatRoom {...props} fetchRooms={fetchRooms} participatingRoom={participatingRoom} />} />
                </Switch>
            </ChattingRoom>
        </ChattingContainer>
    )
}

const ChattingContainer = styled.div`
    display: flex;
    width: 100%;
    height: 93vh;

    @media only screen and (min-height: 700px) {
        height: 92vh;
    }

    @media only screen and (min-height: 600px) {
        height: 91vh;
    }

`

const ChattingRoom = styled.div`
    width: 80%;
    height: 100%;
    max-height: 100%;
    @media ${(props) => props.theme.laptop}{
        width: 95%;
    }
`