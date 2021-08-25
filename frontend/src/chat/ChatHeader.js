import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function ChatHeader({socket}) {

    const [roomNum, setRoomNum] = useState("room 1");

    useEffect(()=>{
        socket.emit("change room", roomNum);
    },[roomNum]);

    const changeRoomNum = (e) =>{
        setRoomNum(e.target.value);
    }

    return(
        <Header>
            <h2>Chatting Title</h2>
            <select onChange={changeRoomNum}>
                    <option value={"room 1"}>room 1</option>
                    <option value={"room 123"}>room 123</option>
                    <option value={"room 234"}>room 234</option>
            </select>
        </Header>
    );
}

const Header = styled.div`
    width:100%;
    height:100px;
    font-family:
`