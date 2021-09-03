import React, { useState, useEffect, useRef } from 'react';
import { Grid, List, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';
import styles from '../assets/sass/chat/ChatList.scss';

import { getMessageList, updateRead } from '../../api/ChatApi';

export default function Chatting2({ socket, participantObject, roomObject, chatRoomNo }) {
    const classes = madeStyles();
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

    useEffect(() => {
        scrollToBottom();
    }, [messageList, receivedMsg])



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
                : null 
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