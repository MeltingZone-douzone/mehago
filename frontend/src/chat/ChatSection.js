import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getParticipantInfo, getRoomInfo, getSearchMessage } from "../../api/ChatApi";
import styles from '../assets/sass/chat/ChatList.scss';
import ChatHeader from './ChatHeader';
import Chatting2 from './Chatting2';
import MsgInput2 from './MsgInput2';


const socket = io('http://localhost:8888');
export default function ChatSection({match}) {
    const chatRoomNo = match.params.no;
    const [participantObject, setParticipantObject] = useState({});
    const [roomObject, setRoomObject] = useState({});
    const [searchMessage, setSearchMessage] = useState([]);
    const [message, setMessage] = useState();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [cursor, setCursor] = useState({firstIndex: 0, index: 0, lastIndex: 0});

    const [insertSuccess, setInsertSuccess] = useState(false);
    const [joinSuccess, setJoinSuccess] = useState(false);

    useEffect( async () => {
        await getRoomInfo(chatRoomNo).then(res => {
            if (res.statusText === 'OK') {
                if(res.data.result == 'fail') {
                    //데이터가 없거나 실패했을때 들어옴..

                    return;
                }
                setRoomObject(res.data.data);
            }
        });

        await getParticipantInfo(chatRoomNo).then(res => {
            if (res.statusText === 'OK') {
                if(res.data.result == 'fail') {
                    // DB에 데이터가 없으면
                    
                    return;
                }
                setParticipantObject(res.data.data);
            }
        });
        setJoinSuccess(true);
    }, []);

    // useEffect(() => {
    //     console.log(roomObject);
    //     socket.on('join', (msg) => {
    //         // 사람이 disconnect 했다가 connect했을 때 불러질 거임!
    //         // messageList에 읽은 숫자 update를 해 줘야함ㅁㅁㅁㅁㅁ
    //         console.log(msg);
    //     })
    // }, []);

    useEffect(() => {
        if (joinSuccess) {
            socket.emit('join', roomObject, participantObject);
            
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
            console.log(`onSubmitMessage`);
            if (message) {
                socket.emit('chat message', message);
                setMessage('');
            }
        },
        onChangeSearchKeyword: (e) => {
            setSearchKeyword(e.target.value);
        },
        onSearchKeyPress: (e) => {
            if(e.key == 'Enter') {
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
            socket.emit('leave', data); // roomName
        }
    }
    // console.log(searchMessage);
    return (
        <div className={styles.chatSection}>
            <Grid container>
                <ChatHeader socket={socket} messageFunction={messageFunction} roomObject={roomObject} cursor={cursor} />
                <Chatting2 socket={socket} messageFunction={messageFunction} participantObject={participantObject} roomObject={roomObject} chatRoomNo={chatRoomNo} searchMessage={searchMessage} />
                <Divider />
                <MsgInput2 socket={socket} message={message} messageFunction={messageFunction} />
            </Grid>
        </div>
    );

}
