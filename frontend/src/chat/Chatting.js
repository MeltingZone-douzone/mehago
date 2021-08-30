import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import ChatHeader from './ChatHeader';
import MsgInput from './MsgInput';
import ReceivedMsg from './ReceivedMsg';
import { getParticipantInfo, getRoomInfo, addMessage } from "../../api/ChatApi";

/* 
    TODO: parameter로 chatting_room_no 받아야함
*/

const socket = io('http://localhost:8888');
export default function Chatting() {
    // DB에 message 넣을때 p_no, msg, room_no 필요 / nickname, room_name은 pub 위함
    // roomname은 join할 때 roomname 받아와서 변수에 넣어둠
    const [participantObject, setParticipantObject] = useState({no: ''});
    const [roomObject, setRoomObject] = useState({title: ''});
    const [messageObject, setMessageObject] = useState({participantNo: '',no: 0, message: '', chattingRoomNo: '', roomName: '', nickname: '', createdAt: ''});
    const [insertSuccess, setInsertSuccess] = useState(false);

    useEffect(() => {
        const chatRoomNo = 1; // TODO: 임시로 chat room no 넣어줌. 나중에 받기
        getParticipantInfo(chatRoomNo).then(res => { 
            if(res.statusText === 'OK') {
                // console.log(res.data);
                setParticipantObject({ ...res.data })
            }
        });
    },[]);

    useEffect(() => {
        const chatRoomNo = 1; 
        getRoomInfo(chatRoomNo).then(res => {
            if(res.statusText === 'OK') {
                // console.log(res.data);
                setRoomObject({ ...res.data })
            }
        });
    },[]);

    useEffect(() => {
        setMessageObject({
                participantNo: participantObject.no,
                chattingRoomNo: roomObject.no,
                roomName: roomObject.title,
                nickname: participantObject.chatNickname
        })
    },[participantObject, roomObject]);

    const messageFunction = {
        onChangeMessage: (e) => {
            const { name, value } = e.target;
            let date = new Date();
            let formattedDate = `${1900 + date.getYear()}-${date.getMonth() + 1 >= 10 ? date.getMonth() : '0' + (date.getMonth() + 1)}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()}`;
            setMessageObject({ ...messageObject, [name]: value, createdAt: formattedDate });
        },
        onSubmitMessage: (e) => {
            e.preventDefault();
            console.log(messageObject);
            if(messageObject.message !== ''){
                addMessage(messageObject).then(res => {
                    if(res.statusText === 'OK') {
                        setInsertSuccess(true);
                        setMessageObject({
                            ...messageObject,
                            message: messageObject.message,
                            no: res.data
                        });
                    }
                });
            }
        },
        leaveRoom: (e) => {
            socket.emit('leave', data); // roomName
        }
    }

    useEffect(() => {
        if (insertSuccess) {
            socket.emit('chat message', messageObject);
            setMessageObject({ ...messageObject, message: '' });
            setInsertSuccess(false);
        }
    }, [messageObject.no]);

    return (
        <ChattingContainer>
            <ChatHeader socket={socket} messageObject={messageObject} messageFunction={messageFunction} />
            <ReceivedMsg socket={socket} messageObject={messageObject} messageFunction={messageFunction} />
            <MsgInput socket={socket} messageObject={messageObject} messageFunction={messageFunction} />
        </ChattingContainer>
    )
}

const ChattingContainer = styled.div`
    display:flex;
    flex-direction:column;
    width:50%;
    height:auto;
    border:1px solid #000;
    border-radius: 8px;
    box-shadow: 0.5px 0.5px 5px 2px #00000060;
    
`