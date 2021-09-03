import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import _ from 'underscore';
import { getMessageList, updateNotReadCount } from '../../api/ChatApi';
import styles from '../assets/sass/chat/ChatList.scss';

export default function Chatting2({socket, participantObject}) {
    const [offset, setOffset] = useState(0);
    const [target, setTarget] = useState(null);
    const [messageList, setMessageList] = useState([]); 
    const [receivedMsg, setReceivedMsg] = useState({});

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "auto" })
    }
    
    useEffect(() => {
        scrollToBottom();
    },[receivedMsg])
    // },[messageList, receivedMsg])
    
    useEffect(async() => {
        await fetchItems(offset);
    }, [offset]);
    
    
    
    useEffect(() => {
        socket.on('chat message', (msg) => {
            const msgToJson = JSON.parse(msg);
            console.log(msgToJson);
            updateNotReadCount(msgToJson)
            .then((res) => {
                msgToJson.notReadCount = res.data;
            })
            setReceivedMsg(msgToJson);
        });
    }, []);
    


    useEffect(() => {
            setMessageList([receivedMsg, ...messageList]);
            // setMessageList([...new Set([prevState, ...messageList])]);
    },[receivedMsg]);
    
    const options = {
        root: null,
        rootMargin: "200px",
        threshold: 0.25
    }
    
    useEffect(() => {
        let observer;
        if(target) {
            observer = new IntersectionObserver(checkIntersect, options);
            observer.observe(target);
        }
        return () => observer && observer.disconnect();
    },[target]);

    const fetchItems = (offset) => {
        const chatRoomNo = 1; 
        getMessageList(chatRoomNo, offset).then(res => {
            if(res.statusText === 'OK') {
                console.log(res.data);
                setMessageList(prevState => { 
                    const a = _.filter(prevState.concat(res.data), item => (Object.keys(item).length !== 0)) // : 제거
                    console.log(a);
                    const data = _.uniq(a, 'no');
                    return data
                }
                );
                // setMessageList(prevState => (prevState.concat(res.data))); 
            }
        });
    };

    const checkIntersect = ([entry], observer) => {
        if(entry.isIntersecting) {
            setOffset(prevState => prevState + 30);
        }
    }
    console.log(offset);

    return(
        <List className={styles.messageArea}>
            <div ref={setTarget } />
            {messageList
                .slice(0).reverse().map(message => {
                    return (message.participantNo !== participantObject.no ?
                    (<ListItem key={message.no}>
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary={
                                                            <Typography style={{borderRadius: "10px", border: "1px solid black", width:"fit-content", padding: "5px"}}> 
                                                                {message.nickname} : {message.message} {message.no}
                                                            </Typography>
                                                            } secondary={message.notReadCount > 0 ? message.notReadCount : ""}>
                                </ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary={moment(message.createdAt).format('HH:mm')}></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>) 
                    :
                    (<ListItem key={message.no}>
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary={
                                                            <Typography style={{borderRadius: "10px", border: "1px solid black", width:"fit-content", padding: "5px"}}> 
                                                                {message.message} {message.no}
                                                            </Typography>
                                                            } secondary={message.notReadCount > 0 ? message.notReadCount : ""}>
                                </ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary={moment(message.createdAt).format('HH:mm')}>
                                </ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>))
                })
            }
            <div ref={messagesEndRef } />
        </List>
    );
}