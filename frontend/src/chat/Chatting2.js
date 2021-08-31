import React, { useState, useEffect, useRef } from 'react';
import { Grid, List, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';
import styles from '../assets/sass/chat/ChatList.scss';

import { updateNotReadCount, getMessageList, updateLastReadNo } from '../../api/ChatApi';

export default function Chatting2({ socket, participantObject, roomObject }) {
    const classes = madeStyles();
    const [isEnd, setIsEnd] = useState('false');
    const [isFetching, setIsFetching] = useState('false');
    const [messageList, setMessageList] = useState([]);
    const [storedMsg, setStoredMsg] = useState([]);
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

    // var endNo = $("#list-chat li").first().data("no") || 0;
    const fetch = () => {

    }

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "auto" })
    }

    useEffect(() => {
        scrollToBottom();
    }, [messageList, receivedMsg])



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
            console.log("chat message");
            const msgToJson = JSON.parse(msg);
            updateNotReadCount(msgToJson);
            setReceivedMsg(msgToJson);
            setInsertSuccess(true);
        });
    }, []);

    useEffect(() => {
        console.log(receivedMsg);
        if (insertSuccess) {
            // 읽은 사람이 last_read_chat_no와 not_read_chat을 수정하는건데..
            updateLastReadNo(participantObject, receivedMsg.no, roomObject);
            setInsertSuccess(false);
        }
        setMessageList([...messageList, receivedMsg]);
    }, [receivedMsg]);

    // fetch(message.no || 0);

    return (
        <List className={styles.messageArea}>
            {messageList
                .slice(0).reverse().map(message =>
                    message.participantNo !== participantObject.no ?
                        (<ListItem key={message.no}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="left" className={classes.chatContainer}
                                        primary={
                                            <Typography className={classes.chatMessage}>
                                                {message.nickname} : {message.message}
                                            </Typography>
                                        }
                                        secondary={<Typography className={classes.notReadChat}>{message.notReadCount}</Typography>}>
                                    </ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="left" secondary={moment(message.createdAt).format('hh:mm')}></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>)
                        :
                        (<ListItem key={message.no}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align="right" className={classes.chatContainer}
                                        primary={
                                            <Typography className={classes.chatMessage}>
                                                {message.nickname} : {message.message}
                                            </Typography>
                                        }
                                        secondary={<Typography className={classes.notReadChat}>{message.notReadCount}</Typography>}>
                                    </ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align="right" secondary={moment(message.createdAt).format('YY:MM')}></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>)
                )
            }
            <div ref={messagesEndRef} />
        </List >
    );
}

const madeStyles = makeStyles({
    chatContainer: {
        display: "flex",
        flexDirection: "revert"
    },
    chatMessage: {
        borderRadius: "10px",
        border: "1px solid black",
        width: "fit-content",
        padding: "5px"
    },
    notReadChat: {
        margin: "auto 0 0 10px"
    }
})