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
export default function ChatSection({ match, setCurrentParticipants}) {
    const chatRoomNo = match.params.no;
    const [participantObject, setParticipantObject] = useState({});
    const [roomObject, setRoomObject] = useState({});
    const [searchMessage, setSearchMessage] = useState([]);
    const [message, setMessage] = useState();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [cursor, setCursor] = useState({firstIndex: 0, index: 0, lastIndex: 0});

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

    const scrollTo = () => {
        // console.log('document.querySelectorAll("p[name=chat-message]"): ', document.querySelectorAll("p[name=chat-message]").values());
        // console.log('document.getElementsByName("chat-message"): ', document.getElementsByName("chat-message"));
        const af = Array.from(document.querySelectorAll("p[name=chat-message]"));
        // af.map(item => console.log(item.getAttribute('no')));
        // const a = af.map(item => console.log(item.getBoundingClientRect().top));
        
        // const a = af.map(item => +item.getBoundingClientRect().top);
        const a = af.map(item => +item.offsetTop);
        console.log(a);
        // window.scrollTo(window.pageYOffset + a[1], 0);
        window.scrollTo({top:0, behavior:'smooth'});
        window.scrollTo(0, 0);
    }

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
                setMessage('');
            }
        },
        onChangeSearchKeyword: (e) => {
            setSearchKeyword(e.target.value);
        },
        onSearchKeyPress: (e) => {
            if (e.key == 'Enter') {
                getSearchMessage(searchKeyword).then(res => {
                    if(res.statusText === 'OK') {
                        // console.log('res.data.data: ', res.data.data); // 필요한거 : 길이, 번호, 키워드
                        setSearchMessage([
                        ...res.data.data,
                        searchKeyword]);
                        setCursor({
                            firstIndex: 1,
                            index: res.data.data.length,
                            lastIndex: res.data.data.length
                        });
                    };
                });
            }
        },
        moveSearchResult: (e, direction) => { // TODO: 마지막요소이면  '마지막 요소입니다'
            console.log(cursor);
            // if(cursor.index + 1 > cursor.firstIndex && cursor.index - 1 < cursor.lastIndex) {
                // if(cursor.index !== cursor.firstIndex && cursor.index <cursor.lastIndex)

                if(direction === "left") {
                    if(cursor.index - 1 >= cursor.firstIndex) {
                        setCursor({...cursor, index: cursor.index - 1 });
                        console.log(`left ${cursor.index}`);
                        scrollTo()
                        return;
                    }
                } else {
                    if(cursor.index < cursor.lastIndex) {
                        // 처음값인경우 (length 초과로 들어오면 막기)
                        setCursor({...cursor, index: cursor.index + 1 });
                        console.log(`right ${cursor.index}`);
                        return;
                    }
                }
        },
        leaveRoom: (e) => {
            // socket.emit('leave', data); // roomName
            socket.emit('leave', roomObject.roomName); // roomName
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
                <ChatHeader socket={socket} messageFunction={messageFunction} roomObject={roomObject} cursor={cursor} />
                <Chatting2 socket={socket} messageFunction={messageFunction} participantObject={participantObject} roomObject={roomObject} chatRoomNo={chatRoomNo} searchMessage={searchMessage} setCurrentParticipants={setCurrentParticipants} />
                <MsgInput2 socket={socket} message={message} messageFunction={messageFunction} buttonFunction={buttonFunction} />
                <Dialogs buttonFunction={buttonFunction} todoOpen={todoOpen} noticeOpen={noticeOpen} fileUploadOpen={fileUploadOpen} />
            </Grid>
        </div>
    );

}

