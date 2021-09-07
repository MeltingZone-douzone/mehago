import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Grid from '@material-ui/core/Grid';

import { getParticipantInfo, getRoomInfo, getSearchMessage, addTodo, addNotice } from "../../api/ChatApi";
import '../assets/sass/chat/ChatList.scss';
import ChatHeader from './ChatHeader';
import Chatting2 from './Chatting2';
import MsgInput2 from './MsgInput2';
import Dialogs from './Dialogs';

const socket = io('http://localhost:8888');
export default function ChatSection({ match }) {
    const chatRoomNo = match.params.no;
    const [participantObject, setParticipantObject] = useState({});
    const [roomObject, setRoomObject] = useState({});
    const [searchMessage, setSearchMessage] = useState([]);
    const [message, setMessage] = useState();
    const [searchKeyword, setSearchKeyword] = useState('');

    const [joinSuccess, setJoinSuccess] = useState(false);

    const [todoOpen, setTodoOpen] = useState(false);
    const [noticeOpen, setNoticeOpen] = useState(false);
    const [fileUploadOpen, setFileUploadOpen] = useState(false);


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
    //     return() =>{
    //         console.log("unmount");
    //     }
    // }, []);

    useEffect(async () => {
        if (joinSuccess) {
            await socket.emit('join', roomObject, participantObject);
            await socket.emit('participant:join:updateRead');
        }
    }, [joinSuccess]);

    const messageFunction = { // 헤더 search도 넣을꺼라서 이름 바꾸기
        onChangeMessage: (e) => {
            const { value } = e.target;
            setMessage(value);
        },
        onSubmitMessage: (e) => {
            e.preventDefault();
            if (message) {
                socket.emit('chat message', message);
                e.target.message.value = '';
            }
        },
        onChangeSearchKeyword: (e) => {
            setSearchKeyword(e.target.value);
        },
        onSearchKeyPress: (e) => {
            if (e.key == 'Enter') {
                getSearchMessage(searchKeyword).then(res => {
                    if (res.statusText === 'OK') {
                        console.log('res.data.data: ', res.data.data); // 길이, 번호, 키워드
                        setSearchMessage([
                            ...res.data.data,
                            searchKeyword]);
                        //   ]);
                    };
                });
            }
        },
        leaveRoom: (e) => {
            socket.emit('leave', data); // roomName
        }
    }

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
        <div className={"chatSection"}>
            <Grid container>
                <ChatHeader socket={socket} messageFunction={messageFunction} />
                <Chatting2 socket={socket} messageFunction={messageFunction} participantObject={participantObject} roomObject={roomObject} chatRoomNo={chatRoomNo} searchMessage={searchMessage} />
                <MsgInput2 socket={socket} message={message} messageFunction={messageFunction} buttonFunction={buttonFunction} />
                <Dialogs buttonFunction={buttonFunction} todoOpen={todoOpen} noticeOpen={noticeOpen} fileUploadOpen={fileUploadOpen} />
            </Grid>
        </div>
    );

}

