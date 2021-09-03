import React, { useState, useEffect, useRef } from 'react';
import { Grid, List, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';
import styles from '../assets/sass/chat/ChatList.scss';

import { getMessageList, updateRead } from '../../api/ChatApi';
import ReceivedMessage from "./ReceivedMessage";
import SendMessage from "./SendMessage";

export default function Chatting2({ socket, participantObject, roomObject, chatRoomNo }) {

    const [isEnd, setIsEnd] = useState('false');
    const [isFetching, setIsFetching] = useState('false');
    const [messageList, setMessageList] = useState([]);
    const [receivedMsg, setReceivedMsg] = useState({
        participantNo: 0,
        no: 0,
        message: '',
        chatRoomNo: 0,
        notReadCount: 0,
        nickname: '',
        thumbnailUrl: "",
        createdAt: ""
    });
    const [insertSuccess, setInsertSuccess] = useState(false);


    useEffect(()=>{
        console.log(messageList);
    },[messageList]);

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "auto" })
    }

    // useEffect(() => {
    //     scrollToBottom();
    // }, [messageList, receivedMsg])



    useEffect(() => {
        getMessageList(chatRoomNo).then(res => {
            if (res.statusText === 'OK') {
                if(res.data.result == 'fail') {

                    return ;
                }
                setMessageList(res.data.data);
            }
        })
    }, []);

    useEffect(() => {
        console.log(socket)
        socket.on('chat message', (msg) => {
            console.log("chat message");
            const msgToJson = JSON.parse(msg);
            setReceivedMsg(msgToJson);
            updateRead(participantObject, msgToJson.no, roomObject);
            setInsertSuccess(true);
        });
    }, []);

    // useEffect(() => {
    //     setMessageList([...messageList, receivedMsg]);
    // }, [receivedMsg]);


    return (
        <List className={styles.messageArea}>
            { messageList ? messageList
                .slice(0).reverse().map((message, index) =>
                    message.participantNo !== participantObject.no ?
                        <ReceivedMessage key={index} nextMessage={messageList.slice(0).reverse()[index + 1]} previousMessage={messageList.slice(0).reverse()[index - 1]} message={message} /> : <SendMessage key={index} nextMessage={messageList[index + 1]} previousMessage={messageList[index - 1]} message={message} />
                )
                : null 
            }
            <div ref={messagesEndRef}
            />
        </List >
    );
}

