import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { getParticipantInfo, getRoomInfo, getSearchMessage, addTodo, addNotice, deleteNotice , getNotice} from "../../../api/ChatApi";
import '../../assets/sass/chat/ChatRoomSection.scss';
import ChatHeader from './ChatHeader';
import ChatSeperatedContainer from './ChatSeperatedContainer';

const socket = io('http://localhost:8888');
export default function ChatSection({history, match, handleCurrentParticipants, handleParticipants, userInfo}) {
    const chatRoomNo = match.params.no;
    const [prevChatRoomNo, setPrevChatRoomNo] = useState(match.params.no); // 이전 채팅방과 비교하는 변수
    const [participantObject, setParticipantObject] = useState({});
    const [roomObject, setRoomObject] = useState({});
    const [searchMessage, setSearchMessage] = useState([]);
    const [message, setMessage] = useState();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [prevSearchKeyword, setPrevSearchKeyword] = useState('');
    const [cursor, setCursor] = useState({firstIndex: 0, index: 0, lastIndex: 0});

    const [hiddenSearchInput, setHiddenSearchInput] = useState(true);

    const [joinSuccess, setJoinSuccess] = useState(false);

    const [seperate, setSeperate] = useState(false);

    const [todoOpen, setTodoOpen] = useState(false);
    const [noticeOpen, setNoticeOpen] = useState(false);
    const [fileUploadOpen, setFileUploadOpen] = useState(false);
    const [notice, setNotice] = useState([]);
    
    const noticeList = (chatRoomNo)=> {
        try {
            getNotice(chatRoomNo).then(res => {
                console.log(res.data.data);
                setNotice(res.data.data);
            });
        } catch (e) {
            console.log(e);
        }
    };

    const handleDeleteNotice = (noticeNo) =>{
        deleteNotice(noticeNo).then(res=>{
            // console.log(res.data);
            if(res.data.result === "success"){
                setNotice(
                    notice.filter((notice) => notice.no !== noticeNo)
                )
            }
        })
    }

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

        handleParticipants(chatRoomNo); // 방의 participants 뽑아옴
        setJoinSuccess(true);
        
        if(prevChatRoomNo != chatRoomNo){
            console.log("여기서 방나가기 함.",prevChatRoomNo, chatRoomNo, roomObject.no);
            socket.emit('leave', roomObject.title);
            setPrevChatRoomNo(chatRoomNo); // TODO:  지금 chatRoomNo 넣고 leave하고 새로 chatRoomNo으로들어옴
        }
    }, [chatRoomNo]);

    useEffect(()=>{
        socket.on('join message', (msgToJson) => {
            const arrayOfNumbers = msgToJson.chatMember.map(Number);
            // console.log("join socket : ", chatRoomNo, arrayOfNumbers);
            handleCurrentParticipants(arrayOfNumbers);
        });

        socket.on('leave message', (msgToJson) => {
            const arrayOfNumbers = msgToJson.chatMember.map(Number);
            console.log("leave socket : "); // FIXME: 이건왜안찍힘 
            handleCurrentParticipants(arrayOfNumbers);
        });
        
        socket.on('disconnect', (msgToJson) => {
            const arrayOfNumbers = msgToJson.chatMember.map(Number);
            handleCurrentParticipants(arrayOfNumbers);
        });
        socket.on('disconnect message', (msgToJson) => {
            const arrayOfNumbers = msgToJson.chatMember.map(Number);
            handleCurrentParticipants(arrayOfNumbers);
        });
    },[chatRoomNo])

    // console.table(`이전:${prevChatRoomNo} 지금: ${chatRoomNo}`);
    useEffect(() => {
        return() =>{
            console.log("unmount. logout할 때");
            socket.emit('leave', roomObject.title)
        }
    }, []);

    useEffect(async () => {
        if (joinSuccess) {
            console.log('join함');
            await socket.emit('join', roomObject, participantObject);
            await socket.emit('participant:join:updateRead');
            setJoinSuccess(false);
            console.log(roomObject);
            noticeList(roomObject.no);
        }
    }, [joinSuccess]);

    const messageFunction = { // FIXME: Header의 search도 넣을꺼라서 이름 바꾸기
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
            if (e.target.value !== '') {
                if(prevSearchKeyword === searchKeyword) {
                    messageFunction.moveSearchResult(e, "right")
                    return;
                }
                getSearchMessage(chatRoomNo, searchKeyword).then(res => {
                    if(res.data.result === 'success') {
                        console.log(res);
                        setSearchMessage([
                            ...res.data.data,
                            searchKeyword]);
                        setCursor({
                            firstIndex: 1,
                            index: 1,
                            lastIndex: res.data.data.length
                        });
                        setPrevSearchKeyword(searchKeyword)
                    } else {
                        console.log(res.data.message);         // TODO: 검색결과가 없습니다.
                        setCursor({});
                    }
                });
            } else {
                console.log("검색어를 한글자 이상 입력해주세요"); // TODO: 뿌리기?
            }
        },
        moveSearchResult: (e, direction) => {                  
            if(direction === "left") {
                if(cursor.index - 1 >= cursor.firstIndex) {
                    setCursor({...cursor, index: cursor.index - 1 });
                    return;
                }
            } else {
                if(cursor.index < cursor.lastIndex) {
                    setCursor({...cursor, index: cursor.index + 1 });
                    return;
                }
                console.log("마지막 검색결과입니다. ");
            }
        },
        leaveRoom: (e) => {
            // socket.emit('leave', data); // roomName
            console.log('leaveRoom()호출 in ChatSection');
            socket.emit('leave', roomObject.title); // FIXME: roomName 안줘도 됨 이유는 [index.js] socket.on('leave', async (data) => { 에 있음
            history.push('/chat')   // TODO: 참여자 조회하는것도 나가야함 Nav에서
                                    // TODO: 참여자 삭제
        },
        /* joinRoom: (e) => {
            if(prevChatRoomNo != chatRoomNo){
                console.log("여기서 방나가기 해야합니다.",prevChatRoomNo, chatRoomNo, roomObject.no);
                socket.emit('leave', roomObject.title);
                setPrevChatRoomNo(chatRoomNo); // TODO:  지금 chatRoomNo 넣고 leave하고 새로 chatRoomNo으로들어옴
            }
        } */

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

            socket.emit("todo:send", date, todo);
            setTodoOpen(false);
        },
        handleNoticeSubmit: (e) => {
            e.preventDefault();
            console.log(userInfo.no);
            if (e.target.notice.value === '') {
                //error 메시지 보내기
            };
            const notice = e.target.notice.value;
            const accountNo = userInfo.no;
            socket.emit("notice:send", notice, accountNo);
            setNoticeOpen(false);
            noticeList(roomObject.no);
        },
        handleFileUploadSubmit: (files) => {
            console.log(files);
            // fileUpload(files);
            // socket.emit("file:send", files);    
            setFileUploadOpen(false);
        }
    }

    const handleSeperate = () => {
        console.log(seperate);
        setSeperate(!seperate);
    }

    return (
        <div className={"chatSection"} key={match.params.no}>
            <div className={"container"}>
                <ChatHeader socket={socket} roomObject={roomObject} messageFunction={messageFunction} cursor={cursor} setCursor={setCursor} hiddenSearchInput={hiddenSearchInput} setHiddenSearchInput={setHiddenSearchInput} setSearchMessage={setSearchMessage} handleSeperate={handleSeperate}/>
                <ChatSeperatedContainer
                    socket={socket} 
                    messageFunction={messageFunction} 
                    participantObject={participantObject} 
                    roomObject={roomObject} 
                    chatRoomNo={chatRoomNo} 
                    searchMessage={searchMessage}
                    // setCurrentParticipants={setCurrentParticipants} 
                    hiddenSearchInput={hiddenSearchInput}
                    cursor={cursor}
                    
                    message={message} buttonFunction={buttonFunction}
                    todoOpen={todoOpen} noticeOpen={noticeOpen} fileUploadOpen={fileUploadOpen}
                    isSeperated={seperate}
                    handleDeleteNotice={handleDeleteNotice}
                    notice={notice}
                    userInfo={userInfo}
                />
            </div>
        </div>
    );

}

