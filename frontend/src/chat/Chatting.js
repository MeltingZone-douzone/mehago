import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { io } from 'socket.io-client';

import ChatHeader from './ChatHeader';
import MsgInput from './MsgInput';
import ReceivedMsg from './ReceivedMsg';
import localStorage from "local-storage";

const socket = io('http://localhost:8888');
export default function Chatting() {
    const token = localStorage.get("token");
    console.log(token);
    
    // DB에 message 넣을때 p_no, msg, room_no 필요 / nickname, room_name은 pub 위함
    // roomname은 join할 때 roomname 받아와서 변수에 넣어둠
    const [messageObject, setMessageObject] = useState({participant_no: '1', msg: '', room_no: '1', room_name: 'ㅣㅣㅣ', nickname: '손놈'});
    

    useEffect(()=>{
        // console.log(socket);
    })

    const messageFunction = {
        onChangeMessage: (e) => {
            const { name, value } = e.target;
            setMessageObject({...messageObject, [name]: value});
            console.log(messageObject);
        },
        onSubmitMessage: (e) => {
            e.preventDefault();
            console.log('onSubmitMessage');
            if(messageObject.msg !== ''){
                socket.emit('chat message', messageObject); // roomName, nickname 등
                // setMessageObject('');
            }
            console.log(messageObject);
        },
        leaveRoom: (e) => {
            socket.emit('leave', data); // roomName
        }
    }
    
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