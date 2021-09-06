import { List } from '@material-ui/core';
import { default as React, useEffect, useRef, useState } from 'react';
import _ from 'underscore';
import { getMessageList } from '../../api/ChatApi';
import styles from '../assets/sass/chat/ChatList.scss';

import ReceivedMessage from "./ReceivedMessage";
import SendMessage from "./SendMessage";

export default function Chatting2({ socket, participantObject, roomObject, joinSuccess, chatRoomNo }) {

    const [isEnd, setIsEnd] = useState('false');
    const [isFetching, setIsFetching] = useState('false');
    const [messageList, setMessageList] = useState([]);
    const [receivedMsg, setReceivedMsg] = useState({});
    const [receviedMessageSuccess, setReceviedMessageSuccess] = useState(false);
    // const [target, setTarget] = useState();

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setReceivedMsg(msg);
            setReceviedMessageSuccess(true);
        });

        socket.on('message:update:readCount', (changedRows) => {
            // let arr1 = messageList.slice(-changedRows);
            // console.log(arr1);
        })
    }, []);

    useEffect(() => {
        if (receviedMessageSuccess) {
            socket.emit("participant:updateRead", receivedMsg);
            setReceviedMessageSuccess(false);
        }
    }, [receviedMessageSuccess])


    useEffect(() => {
        console.log(messageList);

        if (messageList) {
            const changedRows = 2;

            let arr1 = messageList.slice(-changedRows);
            console.log(arr1);
        }

    }, [messageList]);

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "auto" })
    }

    // useEffect(() => {
    //     scrollToBottom();
    // }, [messageList, receivedMsg])



    useEffect(() => {
        if (joinSuccess) {
            getMessageList(chatRoomNo).then(res => {
                if (res.statusText === 'OK') {
                    if (res.data.result == 'fail') {

                        return;
                    }
                    setMessageList(res.data.data);
                    socket.emit("participant:updateRead");
                }
            });
        }
    }, [joinSuccess]);

    useEffect(() => {
        setMessageList([...messageList, receivedMsg]);
    }, [receivedMsg]);

    useEffect(() => {
        setMessageList([receivedMsg, ...messageList]);
        // setMessageList([...new Set([prevState, ...messageList])]);
    }, [receivedMsg]);

    const options = {
        root: null,
        rootMargin: "200px",
        threshold: 0.25
    }

    // useEffect(() => {
    //     let observer;
    //     if (target) {
    //         observer = new IntersectionObserver(checkIntersect, options);
    //         observer.observe(target);
    //     }
    //     return () => observer && observer.disconnect();
    // }, [target]);

    // const fetchItems = (chatRoomNo, offset) => {
    //     getMessageList(chatRoomNo, offset).then(res => {
    //         if (res.statusText === 'OK') {
    //             console.log(res.data.data);
    //             setMessageList(prevState => {
    //                 const a = _.filter(prevState.concat(res.data.data), item => (Object.keys(item).length !== 0)) // : 제거
    //                 console.log(a);
    //                 const data = _.uniq(a, 'no');
    //                 return data
    //             }
    //             );
    //             // setMessageList(prevState => (prevState.concat(res.data))); 
    //         }
    //     });
    // };

    // const checkIntersect = ([entry], observer) => {
    //     if (entry.isIntersecting) {
    //         setOffset(prevState => prevState + 20);
    //     }
    // }
    // console.log(offset);

    return (
        <List className={styles.messageArea}>
            {/* <div ref={setTarget} /> */}
            {messageList ? messageList
                .slice(0).reverse().map((message, index) =>
                    message.participantNo !== participantObject.no ?
                        <ReceivedMessage key={index} nextMessage={messageList.slice(0).reverse()[index + 1]} previousMessage={messageList.slice(0).reverse()[index - 1]} message={message} /> : <SendMessage key={index} nextMessage={messageList.slice(0).reverse()[index + 1]} previousMessage={messageList.slice(0).reverse()[index - 1]} message={message} />
                )
                : null
            }
            <div ref={messagesEndRef} />
        </List >
    );
}

