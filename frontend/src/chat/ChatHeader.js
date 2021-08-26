import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function ChatHeader({socket, messageObject}) {

    const [roomName, setRoomName] = useState("헬창모임");
    const [nickname, setNickname] = useState("손놈");

    useEffect(()=>{
        const data = { // ~~방에 ~~가 입장했다 보여주기 위해 보냄
            nickname,
            roomName 
        }
        socket.emit("join", data);
    },[roomName]);

    const changeRoomName = (e) =>{
        setRoomName(e.target.value);
    }
    const changeNickname = (e) => {
        setNickname(e.target.value);
    }

    return(
        <Header>
            <h2>채링채링</h2>
            <br/>
            <select onChange={changeRoomName}>
                    <option value={"헬창모임"}>헬창모임</option>
                    <option value={"아이폰 사용자 모임"}>아이폰 사용자 모임</option>
                    <option value={"맥창"}>맥창</option>
            </select>
            <input type={'text'} name='nickname' value={ nickname } onChange={changeNickname}/>
        </Header>
    );
}

const Header = styled.div`
    width:100%;
    height:100px;
    font-family:
`