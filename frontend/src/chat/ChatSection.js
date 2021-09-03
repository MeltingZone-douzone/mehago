import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { addMessage, getParticipantInfo, getRoomInfo, joinParticipant } from "../../api/ChatApi";
import styles from '../assets/sass/chat/ChatList.scss';
import Chatting2 from './Chatting2';
import Divider from '@material-ui/core/Divider';
import MsgInput2 from './MsgInput2';


const socket = io('http://localhost:8888');
export default function ChatSection() {

    const [participantObject, setParticipantObject] = useState({});
    const [roomObject, setRoomObject] = useState({title: ''});
    const [messageObject, setMessageObject] = useState({participantNo: '',no: 0, message: '', chattingRoomNo: '', roomName: '', nickname: '', createdAt: ''});
    const [insertSuccess, setInsertSuccess] = useState(false);
    const [joinSuccess, setJoinSuccess] = useState(false);

    useEffect(() => {
        const chatRoomNo = 6; // TODO: 임시로 chat room no 넣어줌. 나중에 받기
        getParticipantInfo(chatRoomNo).then(res => {
            if (res.statusText === 'OK') {
                // console.log(res.data);
                setParticipantObject({ ...res.data })
            }
        });
    }, []);

    useEffect(() => {
        const chatRoomNo = 6;
        getRoomInfo(chatRoomNo).then(res => {
            if (res.statusText === 'OK') {
                // console.log(res.data);
                setRoomObject({ ...res.data });
                setJoinSuccess(true);
            }
        });
    }, []);

    useEffect(() => {
        if(joinSuccess) {
            socket.emit("join", roomObject.title);
            joinParticipant(participantObject.no, participantObject.lastReadChatNo, roomObject.no);
            setJoinSuccess(false);
        }
        setMessageObject({
            participantNo: participantObject.no,
            chattingRoomNo: roomObject.no,
            roomName: roomObject.title,
            nickname: participantObject.chatNickname
        })
    },[joinSuccess]);
    const messageFunction = {
        onChangeMessage: (e) => {
            const { name, value } = e.target;
            let date = new Date();
            let formattedDate = `${1900 + date.getYear()}-${date.getMonth() + 1 >= 10 ? date.getMonth() : '0' + (date.getMonth() + 1)}-${date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()} ${date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()}:${date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()}`;
            setMessageObject({ ...messageObject, [name]: value, createdAt: formattedDate });
        },
        onSubmitMessage: (e) => {
            e.preventDefault();
            if (messageObject.message !== '') {
                addMessage(messageObject).then(res => {
                    if (res.statusText === 'OK') {
                        setInsertSuccess(true);
                        setMessageObject({
                            ...messageObject,
                            message: messageObject.message,
                            no: res.data.no,
                            createdAt: res.data.createdAt
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
                <Chatting2 socket={socket} messageObject={messageObject} messageFunction={messageFunction} participantObject={participantObject} />
                <Divider />
                <MsgInput2 socket={socket} messageObject={messageObject} messageFunction={messageFunction} />
            </Grid>
        </div>
    );

}
