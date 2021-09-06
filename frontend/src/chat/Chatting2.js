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

export default function Chatting2({ socket, participantObject, roomObject, joinSuccess, chatRoomNo }) {

    const [isEnd, setIsEnd] = useState('false');
    const [isFetching, setIsFetching] = useState('false');
    const [messageList, setMessageList] = useState([]);
    const [receivedMsg, setReceivedMsg] = useState({});
    const [receviedMessageSuccess, setReceviedMessageSuccess] = useState(false);

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setReceivedMsg(msg);
            setReceviedMessageSuccess(true);
        });

        socket.on('message:update:readCount', (changedRows) =>{
            // let arr1 = messageList.slice(-changedRows);
            // console.log(arr1);
        })
    }, []);

    useEffect(()=>{
        if(receviedMessageSuccess){
            socket.emit("participant:updateRead");
        }
    },[receviedMessageSuccess])


    useEffect(()=>{
        console.log(messageList);

        if(messageList) {
            const changedRows = 2;

            let arr1 = messageList.slice(-changedRows);
            console.log(arr1);
        }

    },[messageList]);

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "auto" })
    }

    // useEffect(() => {
    //     scrollToBottom();
    // }, [messageList, receivedMsg])



    useEffect(() => {
        if(joinSuccess) {
            getMessageList(chatRoomNo).then(res => {
                if (res.statusText === 'OK') {
                    if(res.data.result == 'fail') {

                        return ;
                    }
                    setMessageList(res.data.data);
                    socket.emit("participant:updateRead");
                }
            });
        }
    }, [joinSuccess]);

    useEffect(() => {
        setMessageList([...messageList, receivedMsg]);
    }, [receivedMsg]);


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

