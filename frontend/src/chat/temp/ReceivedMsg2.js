import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { updateNotReadCount, getMessageList } from '../../api/ChatApi';

export default function ReceivedMsg({socket, messageObject, messageFunction, participantObject}) {
    const [messageList, setMessageList] = useState([]);
    const [storedMsg, setStoredMsg]  = useState([]);
    const [receivedMsg, setReceivedMsg] = useState({
        participantNo: 0,
        no: 0,
        message: '',
        chattingRoomNo: 0,
        chatMember: 0,
        notReadCount: 0,
        nickname: '',
        thumbnailUrl: "",
        createdAt: ""
    });

    useEffect(() => {
        const chatRoomNo = 1; 
        getMessageList(chatRoomNo).then(res => {
            if(res.statusText === 'OK') {
                console.log(res.data);
                setMessageList(res.data); 
            }
        })
    }, []);

    useEffect(() => {
        socket.on('chat message', (msg) => {
            const msgToJson = JSON.parse(msg);
            updateNotReadCount(msgToJson)
                .then((res) => {
                    msgToJson.notReadCount = res.data;
                })
            setReceivedMsg(msgToJson);
        });
    }, []);

    useEffect(() => {
        setStoredMsg([...storedMsg, receivedMsg]);
    },[receivedMsg]);
    
/* 
     // 스크롤을 하단으로 이동시키는 함수
    const scrollToBottom = () => {
        document.getElementById('messageList').scrollBy({ top: 100 });
    };

    useEffect(async () => {
        (await receivedMsg.message.length) > 0 &&
         setStoredMsg([...storedMsg, receivedMsg]);

         scrollToBottom()
        // setReceivedMsg('');
    },[receivedMsg]);
 */
    return(
        <ChattingView>
            <ul>
                {messageList
                    .slice(0).reverse().map(message => 
                        message.participantNo !== participantObject.no ? 
                        <li>{message.nickname} : {message.message}</li> : 
                        <li>😎 : {message.message}</li>
                    )
                }
                {storedMsg
                    .map((message)=> 
                        message.participantNo !== participantObject.no ? 
                        <li>{message.nickname} : {message.message}</li> : 
                        <li>😎 : {message.message}</li>
                    )
                }
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