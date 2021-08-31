import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import styles from '../assets/sass/chat/ChatList.scss';
import { io } from 'socket.io-client';
import { getParticipantInfo, getRoomInfo, addMessage } from "../../api/ChatApi";

import MsgInput2 from './MsgInput2'
import Chatting2 from './Chatting2'

const socket = io('http://localhost:8888');
export default function ChatSection(){

    const [participantObject, setParticipantObject] = useState({});
    const [roomObject, setRoomObject] = useState({title: ''});
    const [messageObject, setMessageObject] = useState({participantNo: '',no: 0, message: '', chattingRoomNo: '', roomName: '', nickname: '', createdAt: ''});
    const [insertSuccess, setInsertSuccess] = useState(false);

    useEffect(() => {
        const chatRoomNo = 1; // TODO: 임시로 chat room no 넣어줌. 나중에 받기
        getParticipantInfo(chatRoomNo).then(res => { 
            if(res.statusText === 'OK') {
                // console.log(res.data);
                setParticipantObject({ ...res.data })
            }
        });
    },[]);

    useEffect(() => {
        const chatRoomNo = 1; 
        getRoomInfo(chatRoomNo).then(res => {
            if(res.statusText === 'OK') {
                // console.log(res.data);
                setRoomObject({ ...res.data })
            }
        });
    },[]);

    useEffect(() => {
        setMessageObject({
                participantNo: participantObject.no,
                chattingRoomNo: roomObject.no,
                roomName: roomObject.title,
                nickname: participantObject.chatNickname
        })
    },[participantObject, roomObject]);
    const messageFunction = {
        onChangeMessage: (e) => {
            const { name, value } = e.target;
            let date = new Date();
            let formattedDate = `${1900 + date.getYear()}-${date.getMonth() + 1 >= 10 ? date.getMonth() : '0' + (date.getMonth() + 1)}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()}`;
            setMessageObject({ ...messageObject, [name]: value, createdAt: formattedDate });
        },
        onSubmitMessage: (e) => {
            e.preventDefault();
            if(messageObject.message !== ''){
                addMessage(messageObject).then(res => {
                    if(res.statusText === 'OK') {
                        setInsertSuccess(true);
                        setMessageObject({
                            ...messageObject,
                            message: messageObject.message,
                            no: res.data
                        });
                    }
                });
            }
        },
        leaveRoom: (e) => {
            socket.emit('leave', data); // roomName
        }
    }

    useEffect(() => {
        if (insertSuccess) {
            socket.emit('chat message', messageObject);
            setMessageObject({ ...messageObject, message: '' });
            setInsertSuccess(false);
        }
    }, [messageObject.no]);

    return (
        <div className={styles.chatSection}>
            <Grid container>
                {/* 
                    ListItemText 
                        align=right는 나 left는 다른사람 
                        primary=채팅
                        secondary=보낸 시간
                */}
                <Chatting2 socket={socket} messageObject={messageObject} messageFunction={messageFunction} participantObject={participantObject} />
                <Divider />
                <MsgInput2 socket={socket} messageObject={messageObject} messageFunction={messageFunction} />

            </Grid>
        </div>
    );
  
}
