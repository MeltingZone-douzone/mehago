import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

import { getParticipantInfo, getRoomInfo, addTodo, addNotice } from "../../api/ChatApi";
import styles from '../assets/sass/chat/ChatList.scss';
import Chatting2 from './Chatting2';
import MsgInput2 from './MsgInput2';
import Dialogs from './Dialogs';

const socket = io('http://localhost:8888');
export default function ChatSection({ match }) {
    const chatRoomNo = match.params.no;
    const [participantObject, setParticipantObject] = useState({});
    const [roomObject, setRoomObject] = useState({});
    const [message, setMessage] = useState();

    const [insertSuccess, setInsertSuccess] = useState(false);
    const [joinSuccess, setJoinSuccess] = useState(false);

    useEffect(async () => {
        await getRoomInfo(chatRoomNo).then(res => {
            if (res.statusText === 'OK') {
                if (res.data.result == 'fail') {
                    //데이터가 없거나 실패했을때 들어옴..

                    return;
                }
                setRoomObject(res.data.data);
            }
        });

        await getParticipantInfo(chatRoomNo).then(res => {
            if (res.statusText === 'OK') {
                if (res.data.result == 'fail') {
                    // DB에 데이터가 없으면

                    return;
                }
                setParticipantObject(res.data.data);
            }
        });
        setJoinSuccess(true);
    }, []);

    // useEffect(() => {
    //     return()=>{console.log("unmount")}
    //     disconnect
    // }, []);

    useEffect(() => {
        if (joinSuccess) {
            socket.emit('join', roomObject, participantObject);

        }
    }, [joinSuccess]);

    const messageFunction = {
        onChangeMessage: (e) => {
            const { value } = e.target;
            setMessage(value);
        },
        onSubmitMessage: (e) => {
            e.preventDefault();
            console.log(`onSubmitMessage`);
            if (message) {
                socket.emit('chat message', message);
                e.target.message.value = '';
            }
        },
        leaveRoom: (e) => {
            socket.emit('leave', data); // roomName
        }
    }
    const [todoOpen, setTodoOpen] = useState(false);
    const [noticeOpen, setNoticeOpen] = useState(false);
    const [fileUploadOpen, setFileUploadOpen] = useState(false);

    const buttonFunction = {
        todo: (e) => {
            e.preventDefault();
            setTodoOpen(true);
        },
        notice: (e) => {
            e.preventDefault();
            setNoticeOpen(true);
        },
        fileupload: (e) => {
            e.preventDefault();
            setFileUploadOpen(true);
        },
        handleClose: (e) => {
            setTodoOpen(false);
            setNoticeOpen(false);
            setFileUploadOpen(false);
        },
        handleTodoSubmit: (e) => {
            e.preventDefault();
            if (e.target.todo.value === '') {
                //error 메시지 보내기
            };
            const date = e.target.date.value;
            const todo = e.target.todo.value;
            addTodo(roomObject.no, participantObject.no, date, todo);
            // 이거 하고 뭐 해야 하는거지???????????
            setTodoOpen(false);
        },
        handleNoticeSubmit: (e) => {
            e.preventDefault();
            if (e.target.notice.value === '') {
                //error 메시지 보내기
            };
            const notice = e.target.notice.value;
            addNotice(roomObject.no, participantObject.no, notice);
            // 이거 하고 뭐 해야 하는거지???????????
            setNoticeOpen(false);
        },
        handleFileUploadSubmit: (files) => {
            console.log(files);
            // addFileUpload(roomObject.no, participantObject.no, files);
            // 이거 하고 뭐 해야 하는거지???????????
            setFileUploadOpen(false);
        }
    }

    return (
        <div className={styles.chatSection}>
            <Chatting2 socket={socket} messageFunction={messageFunction} participantObject={participantObject} roomObject={roomObject} joinSuccess={joinSuccess} chatRoomNo={chatRoomNo} />
            <MsgInput2 socket={socket} message={message} messageFunction={messageFunction} buttonFunction={buttonFunction} />
            <Dialogs buttonFunction={buttonFunction} todoOpen={todoOpen} noticeOpen={noticeOpen} fileUploadOpen={fileUploadOpen} />
        </div>
    );

}

