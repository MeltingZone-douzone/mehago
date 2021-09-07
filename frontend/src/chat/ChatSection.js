import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getParticipantInfo, getRoomInfo, getSearchMessage } from "../../api/ChatApi";
import '../assets/sass/chat/ChatList.scss';
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
    //     return() =>{
    //         console.log("unmount");
    //     }
    // }, []);

    useEffect(async () => {
        if (joinSuccess) {
            await socket.emit('join', roomObject, participantObject);
            await socket.emit('participant:join:updateRead');
        }
    }, [joinSuccess]);

    const messageFunction = { // 헤더 search도 넣을꺼라서 이름 바꾸기
        onChangeMessage: (e) => {
            const { value } = e.target;
            setMessage(value);
        },
        onSubmitMessage: (e) => {
            e.preventDefault();
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
                      setSearchMessage([
                          ...res.data.data,
                          searchKeyword]);
                    //   ]);
                  };
                });
            }
        },
        leaveRoom: (e) => {
            socket.emit('leave', data); // roomName
        }
    }
    // console.log(searchMessage);
    return (
        <div className={"chatSection"}>
            <Grid container>
                <ChatHeader socket={socket} messageFunction={messageFunction} />
                <Chatting2 socket={socket} messageFunction={messageFunction} participantObject={participantObject} roomObject={roomObject} chatRoomNo={chatRoomNo} searchMessage={searchMessage} />
                <Divider />
                <MsgInput2 socket={socket} message={message} messageFunction={messageFunction} />
            </Grid>
        </div>
    );

}
