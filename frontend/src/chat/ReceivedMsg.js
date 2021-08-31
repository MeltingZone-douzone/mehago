import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getMessageList, updateNotReadCount, updateLastReadNo } from '../../api/ChatApi';

export default function ReceivedMsg({ socket, participantObject, roomObject, messageObject, messageFunction }) {
    const [messageList, setMessageList] = useState([]);
    const [receivedMsg, setReceivedMsg] = useState({
        participantNo: 0,
        no: 0,
        message: '',
        chattingRoomNo: 0,
        notReadCount: 0,
        nickname: '',
        thumbnailUrl: "",
        createdAt: ""
    });
    const [insertSuccess, setInsertSuccess] = useState(false);

    useEffect(() => {
        const chatRoomNo = 6;
        getMessageList(chatRoomNo).then(res => {
            if (res.statusText === 'OK') {
                console.log(res.data);
                setMessageList(res.data);
            }
        })
    }, []);

    useEffect(() => {
        socket.on('chat message', (msg) => {
            const msgToJson = JSON.parse(msg);
            console.log(msgToJson);
            //이게 message table에서 읽은사람 수 만큼 -1을 해 주는 
            updateNotReadCount(msgToJson);
            setReceivedMsg(msgToJson);
            setInsertSuccess(true);
        });
    }, []);

    useEffect(() => {
        console.log(insertSuccess);
        if (insertSuccess) {
            console.log("여기");
            // 읽은 사람이 last_read_chat_no와 not_read_chat을 수정하는건데..
            updateLastReadNo(participantObject, receivedMsg.no, roomObject);
            setInsertSuccess(false);
        }
        setMessageList([...messageList, receivedMsg]);
    }, [receivedMsg]);

    return (
        <ChattingView>
            <ul>
                {messageList.slice(0).reverse().map((message) => <li>{message.nickname} : {message.message}</li>)}
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