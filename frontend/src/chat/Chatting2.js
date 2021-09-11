import React, { useEffect, useRef, useState } from 'react';
import { List } from '@material-ui/core';
import '../assets/sass/chat/ChatList.scss';
import _ from 'underscore';
import { getMessageList } from '../../api/ChatApi';

import ReceivedMessage from './ReceivedMessage';
import SendMessage from './SendMessage';

export default function Chatting2({ socket, participantObject, roomObject, chatRoomNo, searchMessage, cursor, hiddenSearchInput }) {
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
        socket.on('chat message', (msg) => {
            setReceivedMsg(msg);
            setReceviedMessageSuccess(true);
        });

        socket.on('message:update:readCount', (msgToJson) => {
            setChangedRows(msgToJson.changedRows);
        });
        fetchItems();
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
            const af = Array.from(document.querySelectorAll("p[name=chat-message]"));
            const messageOffset = af.map(item => +item.offsetParent.offsetTop);
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

    // console.log('chatRoomNo: ', chatRoomNo);
    // console.log('participantObject.no: ', participantObject.no);
    return (
        <List className={"messageArea"} onScroll={onScroll} ref={messageAreaRef} >
            {messageList ? messageList
                .map((message, index) =>
                    message.participantNo !== participantObject.no ?
                        <ReceivedMessage key={index} 
                            nextMessage={messageList[index + 1]} 
                            previousMessage={messageList[index - 1]} 
                            message={message} 
                            searchKeyword={searchMessage[searchMessage.length-1]} 
                            searchMessage={searchMessage}
                            hiddenSearchInput={hiddenSearchInput}
                            no={searchMessage.includes(message.no) ? message.no : null} />
                        :
                        <SendMessage 
                            key={index} 
                            nextMessage={messageList[index + 1]} 
                            message={message} 
                            searchKeyword={searchMessage[searchMessage.length-1]} 
                            hiddenSearchInput={hiddenSearchInput}
                            no={searchMessage.includes(message.no) ? message.no : null} />
                )
                : null
            }
        </List >
    );
}

