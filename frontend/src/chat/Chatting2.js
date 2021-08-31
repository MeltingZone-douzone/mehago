import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';
import styles from '../assets/sass/chat/ChatList.scss';

import { updateNotReadCount, getMessageList } from '../../api/ChatApi';

export default function Chatting2({socket, participantObject}) {

    const [isEnd, setIsEnd] = useState('false');
    const [isFetching, setIsFetching] = useState('false');
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

    // var endNo = $("#list-chat li").first().data("no") || 0;
    const fetch = () => {

    }

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "auto" })
    }
    
    useEffect(() => {
        scrollToBottom();
    },[messageList, receivedMsg])



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

    // fetch(message.no || 0);

    return(
        <List className={styles.messageArea}>
            {messageList
                .slice(0).reverse().map(message => 
                    message.participantNo !== participantObject.no ?
                    (<ListItem key={message.no}>
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary={
                                                            <Typography style={{borderRadius: "10px", border: "1px solid black", width:"fit-content", padding: "5px"}}> 
                                                                {message.nickname} : {message.message}
                                                            </Typography>
                                                            }>
                                </ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary={moment(message.createdAt).format('YY:MM')}></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>) 
                    :
                    (<ListItem key={message.no}>
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary={
                                                            <Typography style={{borderRadius: "10px", border: "1px solid black", width:"fit-content", padding: "5px"}}> 
                                                                {message.message}
                                                            </Typography>
                                                            }>
                                </ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary={moment(message.createdAt).format('YY:MM')}></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>)
                )
            }
            <div ref={messagesEndRef } />
        </List>
    );
}