import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function ChatHeader({socket, messageObject}) {
    const [roomName, setRoomName] = useState(messageObject.roomName);
    const [nickname, setNickname] = useState(messageObject.nickname);
    useEffect(()=>{
        const data = { // ~~방에 ~~가 입장했다 보여주기 위해 보냄
            nickname: messageObject.nickname,
            roomName: messageObject.roomName
        }
        socket.emit("join", data);
    },[]);
    
    return(
        <Header>
            <h1>채링채링</h1>
        </Header>
    );
}

const Header = styled.div`
    width:100%;
    height:100px;
    background-color: yellow;
`