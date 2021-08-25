import React, { useEffect } from 'react';
import styled from 'styled-components';

import { io } from 'socket.io-client';

import ChatHeader from './ChatHeader';
import MsgInput from './MsgInput';
import ReceivedMsg from './ReceivedMsg';

const socket = io('http://localhost:8888');

export default function Chatting() {

    useEffect(()=>{
        console.log(socket);
    })
    
    return (
        <ChattingContainer>
            <ChatHeader socket={socket}/>
            <ReceivedMsg socket={socket}/>
            <MsgInput socket={socket}/>
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