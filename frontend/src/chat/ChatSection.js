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
import { getParticipantInfo, getRoomInfo, addMessage, joinParticipant } from "../../api/ChatApi";

import MsgInput2 from './MsgInput2';
import Chatting2 from './Chatting2';

const socket = io('http://localhost:8888');
export default function ChatSection({match}) {
    const chatRoomNo = match.params.no;
    const [participantObject, setParticipantObject] = useState({});
    const [roomObject, setRoomObject] = useState({});
    const [message, setMessage] = useState();

    const [insertSuccess, setInsertSuccess] = useState(false);
    const [joinSuccess, setJoinSuccess] = useState(false);

    useEffect( async () => {
        await getRoomInfo(chatRoomNo).then(res => {
            if (res.statusText === 'OK') {
                if(res.data.result == 'fail') {
                    //데이터가 없거나 실패했을때 들어옴..

                    return;
                }
                setRoomObject(res.data.data);
            }
        });

        await getParticipantInfo(chatRoomNo).then(res => {
            if (res.statusText === 'OK') {
                if(res.data.result == 'fail') {
                    // DB에 데이터가 없으면
                    
                    return;
                }
                setParticipantObject(res.data.data);
            }
        });
        setJoinSuccess(true);
    }, []);

    // useEffect(() => {
    //     console.log(roomObject);
    //     socket.on('join', (msg) => {
    //         // 사람이 disconnect 했다가 connect했을 때 불러질 거임!
    //         // messageList에 읽은 숫자 update를 해 줘야함ㅁㅁㅁㅁㅁ
    //         console.log(msg);
    //     })
    // }, []);

    useEffect(() => {
        if (joinSuccess) {
            // socket.emit('room:join', roomObject, participantObject);
            socket.emit('room:join', roomObject, participantObject);
            // joinParticipant(participantObject.no, participantObject.lastReadChatNo, roomObject.no); not read count, last read chat no update하고 message의 count update
            setJoinSuccess(false);
        }
    }, [joinSuccess]);

    const messageFunction = {
        onChangeMessage: (e) => {
            const { value } = e.target;
            setMessage(value);
        },
        onSubmitMessage: (e) => {
            e.preventDefault();
            if (message) {
                socket.emit('message:insert', message);
            }
        },
        leaveRoom: (e) => {
            socket.emit('leave', data); // roomName
        }
    }

    return (
        <div className={styles.chatSection}>
            <Grid container>
                {/* 
                    ListItemText 
                        align=right는 나 left는 다른사람 
                        primary=채팅
                        secondary=보낸 시간
                */}
                <Chatting2 socket={socket} messageFunction={messageFunction} participantObject={participantObject} roomObject={roomObject} chatRoomNo={chatRoomNo}/>
                <Divider />
                <MsgInput2 socket={socket} message={message} messageFunction={messageFunction} />

            </Grid>
        </div>
    );

}
