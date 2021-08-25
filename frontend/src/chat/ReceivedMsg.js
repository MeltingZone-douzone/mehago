import React, {useState, useEffect}from 'react';
import styled from 'styled-components';

export default function ReceivedMsg({socket}) {
    
    const [storedMsg, setStoredMsg]  = useState([]);
    const [receivedMsg, setReceivedMsg] = useState();

    useEffect(()=>{
        socket.on('chat message', (msg) =>{
            console.log(msg);
            setReceivedMsg(msg);
        });
    },[]);

    useEffect(()=>{
        setStoredMsg([...storedMsg, receivedMsg]);
    },[receivedMsg]);

    return(
        <ChattingView>
            <ul>
                {storedMsg.map( (msg)=> <li>{msg}</li>)}
            </ul>
        </ChattingView>
    );
}

const ChattingView = styled.div`
    min-height: 500px;
    height: auto;
    li{
        list-style-type: none;
        border: .5px solid #000;
        border-radius: 8px;
        width: fit-content;
        padding:5px;
    }
    li + li {
        margin-top: 10px;
    }
`