import { List } from '@material-ui/core';
import { default as React, useEffect, useRef, useState } from 'react';
import _ from 'underscore';
import { getMessageList } from '../../api/ChatApi';
import styles from '../assets/sass/chat/ChatList.scss';
import ReceivedMessage from './ReceivedMessage'
import SendMessage from './SendMessage'

export default function Chatting2({socket, participantObject}) {
    const [offset, setOffset] = useState(0);
    const [target, setTarget] = useState(null);
    const [messageList, setMessageList] = useState([]); 
    const [receivedMsg, setReceivedMsg] = useState({});

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "auto" })
    }
    
    useEffect(() => {
        scrollToBottom();
    },[receivedMsg])
    // },[messageList, receivedMsg])
    
    useEffect(async() => {
        await fetchItems(offset);
    }, [offset]);
    
    
    
    useEffect(() => {
        socket.on('chat message', (msg) => {
            console.log("chat message");
            const msgToJson = JSON.parse(msg);
        });
    }, []);
    


    useEffect(() => {
            setMessageList([receivedMsg, ...messageList]);
            // setMessageList([...new Set([prevState, ...messageList])]);
    },[receivedMsg]);
    
    const options = {
        root: null,
        rootMargin: "200px",
        threshold: 0.25
    }
    
    useEffect(() => {
        let observer;
        if(target) {
            observer = new IntersectionObserver(checkIntersect, options);
            observer.observe(target);
        }
        return () => observer && observer.disconnect();
    },[target]);

    const fetchItems = (offset) => {
        const chatRoomNo = 1; 
        getMessageList(chatRoomNo, offset).then(res => {
            if(res.statusText === 'OK') {
                console.log(res.data);
                setMessageList(prevState => { 
                    const a = _.filter(prevState.concat(res.data), item => (Object.keys(item).length !== 0)) // : 제거
                    console.log(a);
                    const data = _.uniq(a, 'no'); 
                    return data
                }
                );
                // setMessageList(prevState => (prevState.concat(res.data))); 
            }
        });
    };

    const checkIntersect = ([entry], observer) => {
        if(entry.isIntersecting) {
            setOffset(prevState => prevState + 30);
        }
    }
    console.log(offset);

    return (
        <List className={styles.messageArea}>
            <div ref={setTarget } />
            {messageList
                .slice(0).reverse().map((message, index) =>
                    message.participantNo !== participantObject.no ?
                        <ReceivedMessage key={index} nextMessage={messageList.slice(0).reverse()[index + 1]} previousMessage={messageList.slice(0).reverse()[index - 1]} message={message} /> : <SendMessage key={index} nextMessage={messageList[index + 1]} previousMessage={messageList[index - 1]} message={message} />
                )
            }
            <div ref={messagesEndRef}
            />
        </List >
    );
}

