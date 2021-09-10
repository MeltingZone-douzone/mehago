import React, { useEffect, useRef, useState } from 'react';
import { List } from '@material-ui/core';
import '../assets/sass/chat/ChatList.scss';
import _ from 'underscore';
import { getMessageList } from '../../api/ChatApi';

import ReceivedMessage from './ReceivedMessage';
import SendMessage from './SendMessage';

export default function Chatting2({ socket, participantObject, messageFunction, chatRoomNo, searchMessage, setCurrentParticipants }) {
    const [offset, setOffset] = useState(0);
    const [target, setTarget] = useState(null);
    const [changedRows,setChangedRows] = useState(0);
    const [messageList, setMessageList] = useState([]); 
    const [receivedMsg, setReceivedMsg] = useState({});
    const [receviedMessageSuccess, setReceviedMessageSuccess] = useState(false);

    useEffect(() => {
        socket.on('join', (msgToJson) => {
            const arrayOfNumbers = msgToJson.chatMember.map(Number);
            setCurrentParticipants(arrayOfNumbers);
        });

        socket.on('chat message', (msg) => {
            setReceivedMsg(msg);
            setReceviedMessageSuccess(true);
        });
    
        socket.on('message:update:readCount', (msgToJson) => {
            setChangedRows(msgToJson.changedRows);
        });

        socket.on('leave', (msgToJson) => {
            const arrayOfNumbers = msgToJson.chatMember.map(Number);
            setCurrentParticipants(arrayOfNumbers); // user on/off
        });
    }, []);
    
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
    },[messageList])

    useEffect(() => {
        if (receviedMessageSuccess) {
            socket.emit("participant:updateRead", receivedMsg);
            setReceviedMessageSuccess(false);
        }
    }, [receviedMessageSuccess])

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "auto" })
        console.log('scrollToBottom()');
    }


    useEffect(() => {
        // console.log('1');
        scrollToBottom();
    }, []);

    // 들어오자마자 바로 내려가야지 intersector에 안걸림 fetchItems()하고 scroll밑에 내려가야함
    // 근데 fetchItems()에서 setState를 해서 다시 랜더링 됨
    useEffect(async () => {
        await fetchItems(chatRoomNo, offset);
    },[offset]);
    // console.log(lastScroll[messageList.length - 1]);
    // useEffect(() => {
    //     console.log("fetchItems() in useEffect()");
    //     // console.log(messagesEndRef.current);  <div></div>
    //     fetchItems(chatRoomNo, offset);
    // }, []); // offset

    const fetchItems = async (chatRoomNo, offset) => {
        await getMessageList(chatRoomNo, offset).then(res => {
            if(res.statusText === 'OK') {
                setMessageList(prevState => { 
                    return _.uniq(_.filter(prevState.concat(res.data.data), item => (Object.keys(item).length !== 0)), 'no');
                });
            };
        });
    };

    // 입력할 때 messageList 갱신해야함 stroedMsg?
    useEffect(() => {
        console.log('setMessageList(), scrollToBottom() in useEffect()');
        // setMessageList([receivedMsg, ...messageList]);
        scrollToBottom();
    }, [receivedMsg]);



    // useEffect(() => {
    //     console.log('scrollToBottom');
    //     scrollToBottom();
    // },[])
    // },[receivedMsg])
    // },[messageList, receivedMsg])


/*     useEffect(async() => {
        await fetchItems(chatRoomNo, offset);
        offset === 0 ? scrollToBottom() : console.log('불러오기 스크롤()')
        // console.log(messageList[messageList.length - 1].no);
        // 첫 init fetch이면 lastReadChatNo로 스크롤 설정 - offset === 0 ? TolastReadChatNoScroll() : offsetScroll()
        // fetch하면 offset  에 스크롤 설정
    }, [offset]); */
    
/*     useEffect(() => {
        socket.on('chat message', (msg) => {
            console.log("chat message");
            const msgToJson = JSON.parse(msg);
            setReceivedMsg(msgToJson);
            updateRead(participantObject, msgToJson.no, roomObject);
            // setInsertSuccess(true);
        });
    }, [participantObject, roomObject]); */


    const options = {
        root: null,
        rootMargin: "200px",
        threshold: 0.25
    }

    useEffect(() => {
        let observer;
        if (target) {
            observer = new IntersectionObserver(checkIntersect, options);
            observer.observe(target);
        }
        return () => observer && observer.disconnect();
    }, [target]);



    const checkIntersect = ([entry], observer) => {
        if (entry.isIntersecting) {
            setOffset(prevState => prevState + 20);
            console.log(`if(entry.isIntersecting)`);
        }
    }

    return (
        <List className={"messageArea"}>
            <div ref={setTarget } />
            { messageList ? 
            messageList.slice(0).reverse().map((message, index) =>
                    message.participantNo !== participantObject.no ?
                        <ReceivedMessage key={index} nextMessage={messageList.slice(0).reverse()[index + 1]} previousMessage={messageList.slice(0).reverse()[index - 1]} message={message} searchKeyword={searchMessage[searchMessage.length-1]} searchMessage={searchMessage} no={searchMessage.includes(message.no) ? message.no : null}/>
                        : 
                        <SendMessage key={index} nextMessage={messageList[index + 1]} previousMessage={messageList[index - 1]} message={message} searchMessage={searchMessage} searchKeyword={searchMessage[searchMessage.length-1]} no={searchMessage.includes(message.no) ? message.no : null} />
                )
                : null
            }
            <div ref={messagesEndRef} />
        </List >
    );
}

