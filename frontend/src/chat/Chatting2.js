import React, { useEffect, useRef, useState } from 'react';
import { List } from '@material-ui/core';
import '../assets/sass/chat/ChatList.scss';
import _ from 'underscore';
import { getMessageList } from '../../api/ChatApi';

import ReceivedMessage from './ReceivedMessage';
import SendMessage from './SendMessage';

export default function Chatting2({ socket, participantObject, roomObject, chatRoomNo, searchMessage }) {
    const chattingRef = useRef(null);
    const [offsetNo, setOffsetNo] = useState(0);
    const [isFetching, setIsFetching] = useState(false);

    const [changedRows,setChangedRows] = useState(0);
    const [messageList, setMessageList] = useState([]); 
    const [receivedMsg, setReceivedMsg] = useState({});
    const [receviedMessageSuccess, setReceviedMessageSuccess] = useState(false);

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setReceivedMsg(msg);
            setReceviedMessageSuccess(true);
        });

        socket.on('message:update:readCount', (changedRows) => {
            setChangedRows(changedRows);
        });

        fetchItems();
    }, []);
    
    useEffect(()=>{
        // chattingRef.current.
        // window.addEventListener('scroll', handleScroll);

        // return(()=>{
        //     window.removeEventListener('scroll',handleScroll);
        // })
    })

    useEffect(() => {
        setMessageList([receivedMsg, ...messageList]);
    }, [receivedMsg]);

    useEffect(()=>{
        if(changedRows) {
            let needToUpdateList = messageList.splice(0,changedRows);
            let modifiedList = [];
            needToUpdateList.map(list =>{
                const updatedList = Object.assign({},list,{notReadCount: list.notReadCount - 1});
                modifiedList.push(updatedList);
            })

            setMessageList([...modifiedList, ...messageList]);
            setChangedRows(0);
        }
    },[changedRows])

    useEffect(()=>{
        console.log(messageList);
        if(messageList.length > 1){
            const lastIndex = messageList[messageList.length -1];
            setOffsetNo(lastIndex.no);
        }
    },[messageList])

    useEffect(() => {
        if (receviedMessageSuccess) {
            socket.emit("participant:updateRead", receivedMsg);
            setReceviedMessageSuccess(false);
        }
    }, [receviedMessageSuccess])

    const fetchItems = async () => {
        await getMessageList(chatRoomNo, offsetNo).then(res => {
            if(res.statusText === 'OK') {
                setMessageList(prevState => { 
                    return _.uniq(_.filter(prevState.concat(res.data.data), item => (Object.keys(item).length !== 0)), 'no');
                });
                setIsFetching(false);
            };
        });
    };

    const onScroll = e => {
        const scrollHeight = e.target.scrollHeight; // messageArea div 총 크기
        // console.log(scrollHeight);
        const fetchPointHeight = scrollHeight * 3/4; // 해당지점에 오면 패치하는 이벤트 발생!
        const scrollTop = Math.abs(e.target.scrollTop);
        const clientHeight = e.target.clientHeight; // 사용자 화면 크기

        if(scrollTop + clientHeight >= fetchPointHeight && !isFetching) {
            console.log(offsetNo);
            fetchItems();
            setIsFetching(true);
        }

    }

    return (
        <List className={"messageArea"} onScroll={onScroll}>
            {messageList ? messageList
                .map((message, index) =>
                    message.participantNo !== participantObject.no ?
                        <ReceivedMessage key={index} nextMessage={messageList[index + 1]} 
                            previousMessage={messageList[index - 1]} message={message} searchMessage={searchMessage} />
                        :
                        <SendMessage key={index} nextMessage={messageList[index + 1]} previousMessage={messageList[index - 1]} message={message} searchMessage={searchMessage} />
                )
                : null
            }
        </List >
    );
}

