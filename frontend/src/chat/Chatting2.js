import { List } from '@material-ui/core';
import { default as React, useEffect, useRef, useState } from 'react';
import _ from 'underscore';
import { getMessageList, updateNotReadCount } from '../../api/ChatApi';
import styles from '../assets/sass/chat/ChatList.scss';
import ReceivedMessage from './ReceivedMessage';
import SendMessage from './SendMessage';

export default function Chatting2({socket, participantObject, roomObject, chatRoomNo, searchMessage}) {
    const lastScroll = document.querySelectorAll("p");
    const [offset, setOffset] = useState(0);
    const [target, setTarget] = useState(null);
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
        console.log('scrollToBottom()');
    }


    useEffect(() => {
        console.log('1');
        scrollToBottom();
    }, []);

    // 들어오자마자 바로 내려가야지 intersector에 안걸림 fetchItems()하고 scroll밑에 내려가야함
    // 근데 fetchItems()에서 setState를 해서 다시 랜더링 됨
    useEffect(async () => {
        await fetchItems(chatRoomNo, offset);
        console.log(`messageList.length 는 ${messageList.length}`);
    },[offset]);
    // console.log(lastScroll[messageList.length - 1]);
    // useEffect(() => {
    //     console.log("fetchItems() in useEffect()");
    //     // console.log(messagesEndRef.current);  <div></div>
    //     fetchItems(chatRoomNo, offset);
    // }, []); // offset

    const fetchItems = async (chatRoomNo, offset) => {
        console.log(`fetchItems() ${chatRoomNo}, ${offset}`);
        await getMessageList(chatRoomNo, offset).then(res => {
            console.log(res);
            if(res.statusText === 'OK') {
                console.log("res.statusText === OK");
                setMessageList(prevState => { 
                    console.log(res.data.data);
                    return _.uniq(_.filter(prevState.concat(res.data.data), item => (Object.keys(item).length !== 0)), 'no');
                });

            };
        });
        console.log('ㅎㅎㅎㅎㅎㅎ');
    };

    // 입력할 때 messageList 갱신해야함 stroedMsg?
    useEffect(() => {
        console.log('setMessageList(), scrollToBottom() in useEffect()');
        // setMessageList([receivedMsg, ...messageList]);
        scrollToBottom();
    },[receivedMsg]);



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
    useEffect(() => {
        socket.on('chat message', (msg) => {
            const msgToJson = JSON.parse(msg);
            console.log(msgToJson);
            updateNotReadCount(msgToJson)
            .then((res) => {
                msgToJson.notReadCount = res.data;

            })
            setReceivedMsg(msgToJson);
        });
    }, []);

    useEffect(() => {
        setMessageList([...messageList, receivedMsg]);
    }, [receivedMsg]);

    
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



    const checkIntersect = ([entry], observer) => {
        if(entry.isIntersecting) {
            setOffset(prevState => prevState + 20);
            console.log(`if(entry.isIntersecting)`);
        }
    }

    return (
        <List className={styles.messageArea}>
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

