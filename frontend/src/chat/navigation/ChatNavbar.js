import { Avatar, makeStyles } from '@material-ui/core';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import HomeIcon from '@material-ui/icons/Home';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import localStorage from "local-storage";
import styled from 'styled-components';
import '../../assets/sass/chat/ChatNav.scss';
import { colors } from '../../assets/styles/properties/Colors';
import Logo from '../../assets/images/black-mehago.png';
import { updateFavoriteRoomApi, getFavoriteRoomList, exitRoomApi } from '../../../api/ChatApi';
import { createNonMember } from '../../../api/AccountApi';

import ParticipatingRoom from './ParticipatingRoom';
import ParticipatingMember from './ParticipatingMember';

export default function ChatNavbar({ socket, currentParticipants, userInfo, participants, fetchRooms, participatingRoom, updateParticipatingRoom, updateParticipatingRoomMessage, deletedParticipatingRoom, setParticipatingRoom}) {
    const classes = madeStyles();

    console.log(participants);

    const [chatList, setChatList] = useState(true);
    const [chatMember, setChatMember] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [favoriteRoom, setFavoriteRoom] = useState([]);
    const [favoriteCheck, setFavoriteCheck] = useState(false);
    const [leaveMessage, setLeaveMessage] = useState('');
    useEffect(() => {
        socket.on(`room:updateInfo`, (msg) => {
            setFavoriteRoom(
                favoriteRoom.map((room) =>
                    room.no === msg.roomObject.no ? { ...room, ["thumbnailUrl"]: msg.roomObject.thumbnailUrl } : room)
            );
        })
    }, [favoriteRoom])

    useEffect(() => {
        fetchRooms();
        fetchFavoriteRooms();
    }, [favoriteCheck]);

    useEffect(() => {
        // DB에 저장 된 채팅 방 모두 입장
        if (participatingRoom.length >= 1) {
            let rooms = [];
            participatingRoom.map((room) =>
                rooms.push(`room${room.no}`)
            )
            socket.emit("join", rooms)
        }
    }, [participatingRoom]);

    const fetchFavoriteRooms = () => {
        try {
            getFavoriteRoomList().then(res => {
                if (res.data.result === "fail") {
                    return false;
                }
                setFavoriteRoom(res.data.data);
            });
        } catch (e) {
            console.log(e);
        }
    }

    const updateFavoriteRoom = (chatRoomNo, favoriteStatus) => {
        try {
            updateFavoriteRoomApi(chatRoomNo, favoriteStatus).then((res) => {
                setFavoriteCheck(''); // 이전에 다른방 즐겨찾기 체크한 값들 초기화
            });
        } catch (e) {
            console.log(e);
        }
    }
    // setNotice(
        // notice.filter((notice) => notice.no !== msg.no)

    const exitRoom = (chatRoomNo) => {
        try {
            exitRoomApi(chatRoomNo).then((res) => {
                if (res.data.data.hasData) {
                    const leaveMessage = res.data.data.chatNickname + "님이 퇴장하였습니다."
                    socket.emit('chat message', leaveMessage, 0);
                }
                socket.emit('leave:chat-room', chatRoomNo, res.data.data.no);
                if (userInfo === undefined) {
                    createNonMember().then((res) => {
                        localStorage.set('token', res.data);
                    })
                };
            })
            fetchRooms(); TODO:
            fetchFavoriteRooms();
        } catch (error) {
            console.log();
        }
    }

    const handleChatList = () => {
        setChatList(true);
        setChatMember(false);
    }

    const handleChatMember = () => {
        setChatList(false);
        setChatMember(true);
    }

    return (
        <div className={"ChatNav"} onClick={(e) => e.stopPropagation()}>
            <div className={"ChatNavbar"}>
                <div className={"BasicNav"}>
                    <Link to="/chat"><NaviButton onClick={() => handleChatList()}><HomeIcon /></NaviButton></Link> {/* 일단 홈 클릭하면 채팅방리스트으로 보이게 해놓음 */}
                    <NaviButton active={chatList} onClick={() => handleChatList()}><ForumOutlinedIcon /></NaviButton>
                    <NaviButton active={chatMember} onClick={() => handleChatMember()}><PeopleAltOutlinedIcon /></NaviButton>
                </div>
                <div className={"FavoriteNav"}>
                    {
                        favoriteRoom && favoriteRoom.map((favorite, index) => {
                            return (
                                <Link to={`/chat/${favorite.no}`} key={index}>
                                    <NaviButton ><Avatar className={classes.favoriteRoom} alt="프로필 사진" src={favorite.thumbnailUrl ? favorite.thumbnailUrl : Logo} key={favorite.no} /></NaviButton>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            <div className={"ChatList"}>
                {chatList? <ParticipatingRoom socket={socket} userInfo={userInfo} participatingRoom={participatingRoom} setSearchValue={setSearchValue} searchValue={searchValue} updateFavoriteRoom={updateFavoriteRoom} exitRoom={exitRoom} setFavoriteCheck={setFavoriteCheck} updateParticipatingRoom={updateParticipatingRoom} updateParticipatingRoomMessage={updateParticipatingRoomMessage} deletedParticipatingRoom={deletedParticipatingRoom}/>: null}
                {chatMember? <ParticipatingMember socket={socket} currentParticipants={currentParticipants} userInfo={userInfo} participants={participants}/>: null}
            </div>


        </div>
    );
}


const NaviButton = styled.button`
    padding: 5px 5px;
    margin-top: 10px;

    border:none;
    border-radius: 8px;

    background-color:#fff;
    color: ${props => props.active ? colors.mainThemeColor : "gray"};
`

const madeStyles = makeStyles({
    favoriteRoom: {
        width: "30px",
        height: "30px"
    }
})
