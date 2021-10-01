import { List } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import _ from 'underscore';
import { getMessageList } from '../../../api/ChatApi';
import '../../assets/sass/chat/ChatRoomSection.scss';
import ReceivedMessage from './ReceivedMessage';
import SendMessage from './SendMessage';
import styled from 'styled-components';


export default function Chatting({ socket, participantObject, roomObject, chatRoomNo, searchMessage, cursor, hiddenSearchInput, notice }) {
    const messageAreaRef = useRef();

    const [offsetNo, setOffsetNo] = useState(0);
    const [isFetching, setIsFetching] = useState(false);

    const [changedRows, setChangedRows] = useState(0);
    const [messageList, setMessageList] = useState([]);
    const [receivedMsg, setReceivedMsg] = useState({});
    const [receviedMessageSuccess, setReceviedMessageSuccess] = useState(false);
    const [noData, setNoData] = useState(false);
    const [searchMessageOffset, setSearchMessageOffset] = useState([]);

    useEffect(() => {
        socket.on(`chat:message:room${chatRoomNo}`, (msg) => {
            console.log(msg , "msgmsgmsgmsgmsg");
            setReceivedMsg(msg);
            setReceviedMessageSuccess(true);
        });

        socket.on(`message:update:readCount:room${chatRoomNo}`, (msgToJson) => {
            setChangedRows(msgToJson.changedRows);
        });
        fetchItems();

        socket.on(`members:leave:room${chatRoomNo}`, (msg)=>{
            setReceivedMsg(msg);
        });
        socket.on(`join:room${chatRoomNo}`, (msg)=>{
            setReceivedMsg(msg);
        });
    }, []);


    useEffect(() => {
        setMessageList([receivedMsg, ...messageList]);

    }, [receivedMsg]);
    
    useEffect(() => {
        if (changedRows) {
            let needToUpdateList = messageList.splice(0, changedRows);
            let modifiedList = [];
            needToUpdateList.map(list => {
                const updatedList = Object.assign({}, list, { notReadCount: list.notReadCount - 1 });
                modifiedList.push(updatedList);
            })

            setMessageList([...modifiedList, ...messageList]);
            setChangedRows(0);
        }
    }, [changedRows])

    useEffect(() => {
        if (messageList.length > 1) {
            const lastIndex = messageList[messageList.length - 1];
            setOffsetNo(lastIndex.no);
        }
    }, [messageList])

    useEffect(() => {
        if (receviedMessageSuccess) {
            socket.emit("participant:updateRead", receivedMsg);
            setReceviedMessageSuccess(false);
        }
    }, [receviedMessageSuccess])

    const fetchItems = async () => {
        await getMessageList(chatRoomNo, offsetNo).then(res => {
            if (res.statusText === 'OK') {
                if (res.data.result == "success") {
                    if (res.data.data.length < 1) {
                        setNoData(true);
                    }
                    setMessageList(prevState => {
                        return _.uniq(_.filter(prevState.concat(res.data.data), item => (Object.keys(item).length !== 0)), 'no');
                    });
                    setIsFetching(false);
                }
            };
        });
    };

    useEffect(() => {
        if (searchMessage) {
            const arrayResult = Array.from(document.querySelectorAll("p[name=chat-message]"));
            const messageOffset = arrayResult.map(item => +item.offsetParent.offsetTop);
            if (messageOffset.length !== cursor.lastIndex) {
                setSearchMessageOffset(messageOffset);
            }
        }
    }, [searchMessage, messageList])

    useEffect(() => {
        if (searchMessageOffset[cursor.index - 1] === undefined && cursor.lastIndex > cursor.index) {
            fetchItems();
            setIsFetching(true);
        }
        messageAreaRef.current.scrollTo({ top: searchMessageOffset[cursor.index - 1] - 300, behavior: 'auto' });
    }, [cursor.index, searchMessageOffset])



    const onScroll = e => {
        const scrollHeight = e.target.scrollHeight; // messageArea div 총 크기
        const fetchPointHeight = scrollHeight * 3 / 4; // 해당지점에 오면 패치하는 이벤트 발생!
        const scrollTop = Math.abs(e.target.scrollTop);
        const clientHeight = e.target.clientHeight; // 사용자 화면 크기
        if (scrollTop + clientHeight >= fetchPointHeight && !isFetching && !noData) {
            fetchItems();
            setIsFetching(true);
        }
    }

    return (
        <List className={"messageArea"} onScroll={onScroll} ref={messageAreaRef} >
            { messageList ? 
                messageList.map((message, index) => {
                    return (
                        message.state === 0 ? 
                        <div style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center"
                        }}>
                            <p style={{ 
                                padding: '0.5rem 0.7rem', 
                                textAlign: 'center', 
                                backgroundColor: '#d4d4d4', 
                                borderRadius: '15px', 
                                margin: '5px' ,
                                width: 'fit-content',
                                fontSize: 'smaller'
                            }}
                            >{message.message}
                            </p>
                        </div>
                        :
                        <div>
                            {
                            message.participantNo !== participantObject.no ?
                                <div key={index}>
                                    {dateDivider(messageList, index, message)}
                                    <ReceivedMessage
                                        nextMessage={messageList[index - 1]}
                                        previousMessage={messageList[index + 1]}
                                        message={message}
                                        searchKeyword={searchMessage[searchMessage.length - 1]}
                                        searchMessage={searchMessage} 
                                        hiddenSearchInput={hiddenSearchInput}
                                        no={searchMessage.includes(message.no) ? message.no : null} />
                                </div>
                                :
                                <div key={index}>
                                    {dateDivider(messageList, index, message)}
                                    <SendMessage 
                                        nextMessage={messageList[index - 1]} 
                                        previousMessage={messageList[index + 1]} 
                                        message={message} 
                                        searchKeyword={searchMessage[searchMessage.length-1]} 
                                        hiddenSearchInput={hiddenSearchInput}
                                        no={searchMessage.includes(message.no) ? message.no : null} />
                                </div>
                            }
                        </div>
                        )}
                )
                : null
            }

        </List >
    );
}
// 메시지가 거꾸로 뽑히고 있어서 index - 1 말고 + 1 로 함
function dateDivider(messageList, index, message) {
    const prevMessage = messageList[index + 1];
    if (prevMessage && moment(prevMessage.createdAt).format('YY/MM/DD') !== moment(message.createdAt).format('YY/MM/DD')) {
        return renderDateDivider();
    }
    // if (typeof prevMessage === 'undefined' && message !== null) { // 방의 첫 메시지이면
    if (!prevMessage && message) { // 방의 첫 메시지이면
        return renderDateDivider();
    }
    function renderDateDivider() {
        const msgDate = moment(message.createdAt).format('YY/MM/DD');
        let day;
        switch (moment(message.createdAt).day()) {
            case 0: day = '일요일'; break;
            case 1: day = '월요일'; break;
            case 2: day = '화요일'; break;
            case 3: day = '수요일'; break;
            case 4: day = '목요일'; break;
            case 5: day = '금요일'; break;
            case 6: day = '토요일'; break;
        }
        return (
            <div style={{
                display: "flex",
                width: "100%",
                justifyContent: "center"
            }}>
                <p style={{
                    padding: '0.5rem 0.7rem',
                    textAlign: 'center',
                    backgroundColor: '#d4d4d4',
                    borderRadius: '15px',
                    margin: '5px',
                    width: 'fit-content',
                    fontSize: 'smaller'
                }}
                >{msgDate} {day}
                </p>
            </div>
        );
    }
}
