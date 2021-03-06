import React, { useEffect, useState } from 'react';

import { getParticipantInfo, getRoomInfo, getSearchMessage, addNotice, deleteNotice, getNotice, fileUpload, getFileList, changePassword, updateChatRoomInfo } from "../../../api/ChatApi";
import { createDeletedChatAlarmApi } from '../../../api/AlarmApi';
import '../../assets/sass/chat/ChatRoomSection.scss';
import ChatHeader from './ChatHeader';
import ChatSeperatedContainer from './ChatSeperatedContainer';

export default function ChatSection({ history, match, handleCurrentParticipants, handleParticipants, socket, participants, userInfo, fetchRooms }) {
    const chatRoomNo = match.params.no;

    const [participantObject, setParticipantObject] = useState({});
    const [roomObject, setRoomObject] = useState({});
    const [searchMessage, setSearchMessage] = useState([]);
    const [message, setMessage] = useState();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [prevSearchKeyword, setPrevSearchKeyword] = useState('');
    const [cursor, setCursor] = useState({ firstIndex: 0, index: 0, lastIndex: 0 });
    // const [deleted, setDeleted] = useState(false);

    const [hiddenSearchInput, setHiddenSearchInput] = useState(true);

    const [joinSuccess, setJoinSuccess] = useState(false);

    const [seperate, setSeperate] = useState(false);
    const [todoOpen, setTodoOpen] = useState(false);
    const [noticeOpen, setNoticeOpen] = useState(false);
    const [fileUploadOpen, setFileUploadOpen] = useState(false);
    const [notice, setNotice] = useState([]);
    const [fileList, setFileList] = useState([]);

    // useEffect(() => {
    //     let leave = deleted;
        
    //     return () => {
    //         if(!leave && userInfo) {
    //             console.log("unmount deleted");
    //             socket.emit('leave:chat-section'); // 채팅리스트로 넘어갈때 즉 ChatSection에서 빠져 나갈때 필요
    //             handleParticipants.fetchParticipants(); // 네비 Member없애기 위함
    //         }
    //     }
    // }, [deleted]);

    const noticeList = (chatRoomNo) => {
        try {
            getNotice(chatRoomNo).then(res => {
                if (!res.data.data) {
                    // notice에 아무것도 없을 경우
                    return;
                }
                setNotice(res.data.data);
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        socket.on(`notice:room${chatRoomNo}`, (msg) => {
            if (msg.noticeAdd === true) {
                setNotice([msg, ...notice]);
            } else {
                setNotice(
                    notice.filter((notice) => notice.no !== msg.no))
            }
        })
    }, [notice]);


    const fileUploadList = (chatRoomNo) => {
        try {
            getFileList(chatRoomNo).then(res => {
                setFileList(res.data.data);
            });
        } catch (e) {
            console.log(e);
        }
    };


    useEffect(() => {
        socket.on(`file:room${chatRoomNo}`, (msg) => {
            const newList = msg.files.concat(fileList);
            setFileList(newList);
        })
    }, [fileList]);


    const handleDeleteNotice = (noticeNo) => {
        deleteNotice(noticeNo).then(res => {
            if (res.data.result === "success") {
                socket.emit("notice:delete", noticeNo);
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

        handleParticipants.fetchParticipants(chatRoomNo); // 방의 participants 뽑아옴
        setJoinSuccess(true);
    }, [chatRoomNo]);

    useEffect(() => {
        if (!participantObject.hasData) { // 처음 입장하는 경우에만
            fetchRooms();// 리스트 다시 불러옴..
        }
    }, [participantObject])

    useEffect(() => {
        if (participants) { }
    }, [participants])

    useEffect(() => {

        let leave = false;

        socket.on(`members:status:room${chatRoomNo}`, (msgToJson) => {
            const { onlineChatMember } = msgToJson;
            handleCurrentParticipants(onlineChatMember);
        });
        socket.on(`room:updateInfo:room${chatRoomNo}`, (msgToJson) => {
            setRoomObject(msgToJson.roomObject);
        })
        socket.on('disconnect', (msgToJson) => {
            const arrayOfNumbers = msgToJson.chatMember.map(Number);
            handleCurrentParticipants(arrayOfNumbers);
        });
        socket.on('disconnect message', (msgToJson) => {
            const arrayOfNumbers = msgToJson.chatMember.map(Number);
            handleCurrentParticipants(arrayOfNumbers);
        });
        socket.on(`room:leave:${chatRoomNo}`, () => {
            leave = true;
            history.push("/chat");
        });

        socket.on(`room:deleted:room${chatRoomNo}`, () => {
            history.push("/chat");
        });

        socket.on(`members:leave:room${chatRoomNo}`, (msgToJson) => {
            handleParticipants.leaveParticipant(msgToJson.participantNo);
        });
        socket.on(`join:room${chatRoomNo}`, () => {
            handleParticipants.fetchParticipants(chatRoomNo);
        });

        return () => {
            if(!leave){
                socket.emit('leave:chat-section');
            }
        }
    }, [chatRoomNo])

    // console.table(`이전:${prevChatRoomNo} 지금: ${chatRoomNo}`);

    useEffect(() => {
        if (joinSuccess) {
            socket.emit('join:chat', roomObject, participantObject);
            socket.emit('participant:updateRead');
            // const joinMessage = participantObject.chatNickname + "님이 입장하였습니다."
            // if (!participantObject.hasData) { // 처음 입장하는 경우에만
            //     socket.emit('chat message', roomObject.no, joinMessage, 0);
            //     participantObject.hasData = true;
            // }
            setJoinSuccess(false);
            noticeList(roomObject.no);
            fileUploadList(roomObject.no);

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
                if (prevSearchKeyword === searchKeyword) {
                    messageFunction.moveSearchResult(e, "right")
                    return;
                }
                getSearchMessage(chatRoomNo, searchKeyword).then(res => {
                    if (res.data.result === 'success') {
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
                        setCursor({ firstIndex: 0, index: 0, lastIndex: 0 });
                    }
                });
            } else {
                console.log("검색어를 한글자 이상 입력해주세요"); // TODO: 뿌리기?
            }
        },
        moveSearchResult: (e, direction) => {
            if (direction === "left") {
                if (cursor.index - 1 >= cursor.firstIndex) {
                    setCursor({ ...cursor, index: cursor.index - 1 });
                    return;
                }
            } else {
                if (cursor.index < cursor.lastIndex) {
                    setCursor({ ...cursor, index: cursor.index + 1 });
                    return;
                }
                console.log("마지막 검색결과입니다. ");
            }
        },
        leaveRoom: () => {
            history.push('/chat');
        }
    }

    const buttonFunction = {
        notice: (e) => {
            e.preventDefault();
            setNoticeOpen(true);
        },
        fileupload: (e) => {
            e.preventDefault();
            setFileUploadOpen(true);
        },
        handleClose: (e) => {
            setNoticeOpen(false);
            setFileUploadOpen(false);
        },
        handleNoticeSubmit: (e) => {
            e.preventDefault();
            if (e.target.notice.value === '') {
                return false;
            };
            const notice = e.target.notice.value;
            addNotice(roomObject.no, participantObject.no, notice).then(res => {
                const no = res.data.data;
                socket.emit("notice:send", notice, no);
            });
            setNoticeOpen(false);
        },
        handleFileUploadSubmit: (files) => {
            fileUpload(roomObject.no, participantObject.no, files).then(res => {
                socket.emit("file:send", res.data.data);
            });
            setFileUploadOpen(false);
        }
    }

    const [passwordDialog, setPasswordDialog] = useState(false);
    const settingRoomFunction = {
        dialogOpen: () => {
            setPasswordDialog(true);
        },
        dialogClose: () => {
            setPasswordDialog(false);
        },
        passwordChangeSubmit: async (newPassword) => {
            await changePassword(roomObject.no, newPassword, roomObject.owner).then(res => {
                if (res.data.result === "fail") {
                    window.alert('권한이 없습니다.');
                    setPasswordDialog(false);
                    return;
                } else {
                    newPassword !== '' ?
                        setRoomObject({ ...roomObject, password: newPassword, secretRoom: true }) :
                        setRoomObject({ ...roomObject, password: "", secretRoom: false });
                    window.alert('비밀번호 변경');
                    setPasswordDialog(false);
                }
            }
            );
        },
        updateChatRoom: async (form) => {
            try {
                await updateChatRoomInfo(form).then((res) => {
                    if (res.data.result === "fail") {
                        window.alert('권한이 없습니다.');
                        return;
                    };
                    window.alert('수정되었습니다. ');
                    // roomObject의 no, title, thumbnailUrl; res.data.data.no ....
                    socket.emit('room:update', res.data.data);
                    return;
                });
            } catch (err) {
                console.error(err);
            }
        },

        deletedChatRoom: async (reason) => {
            const participantsAccountNo = participants.map((participant) => {
                if (participant.accountNo)
                    return participant.accountNo;
            })

            const alarmData = {
                "participantsAccountNo": participantsAccountNo,
                "chatRoomNo": chatRoomNo,
                "reason": reason,
                "read": false
            }

            await createDeletedChatAlarmApi(alarmData).then(res => console.log(res));
            socket.emit('delete:chat-room');
        }
    }

    const handleSeperate = () => {
        setSeperate(!seperate);
    }

    return (
        <div className={"chatSection"} key={match.params.no}>
            <div className={"container"}>
                <ChatHeader socket={socket} roomObject={roomObject} messageFunction={messageFunction} cursor={cursor} setCursor={setCursor} hiddenSearchInput={hiddenSearchInput} setHiddenSearchInput={setHiddenSearchInput} setSearchMessage={setSearchMessage} handleSeperate={handleSeperate} notice={notice} />
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
                    fileList={fileList}
                    settingRoomFunction={settingRoomFunction}
                    passwordDialog={passwordDialog}
                    userInfo={userInfo}
                />
            </div>
        </div>
    );

}

