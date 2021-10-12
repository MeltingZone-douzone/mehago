import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/black-mehago.png';
import { Avatar, makeStyles } from '@material-ui/core';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import styled from 'styled-components';
import { colors } from '../../assets/styles/properties/Colors';
import '../../assets/sass/chat/ChatNav.scss';
import localStorage from "local-storage";

import { updateFavoriteRoomApi, getFavoriteRoomList, exitRoomApi } from '../../../api/ChatApi';
import { createNonMember } from '../../../api/AccountApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faUserFriends } from '@fortawesome/free-solid-svg-icons';

import ParticipatingRoom from './ParticipatingRoom';
import ParticipatingMember from './ParticipatingMember';

export default function ChatNavbar({ socket, currentParticipants, userInfo, participants, setParticipants, fetchRooms, participatingRoom, updateParticipatingRoom, updateParticipatingRoomMessage, deletedParticipatingRoom, setParticipatingRoom, deletedRoom }) {
    const classes = madeStyles();
    const [trigger, setTrigger] = useState(false);

    const [chatList, setChatList] = useState(()=>{
        return window.innerWidth <= 1024 ? false: true;
    });
    const [chatMember, setChatMember] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [favoriteRoom, setFavoriteRoom] = useState([]);
    const [favoriteCheck, setFavoriteCheck] = useState(false);

    useEffect(()=>{
        fetchRooms(); // 사이즈가 작아지면 패치가 안되기 때문에 다시 패치룸을 호출
        
        const delay = 300;
        let timer = null;

        window.addEventListener('resize', function (){
            this.clearTimeout(timer);

            timer = this.setTimeout(()=>{
                if(this.window.innerWidth <= 1024){
                    closeAll();
                } else if (!trigger) {
                    setChatList(true);
                }

            },delay)
        })

        return () => {
            this.clearTimeout(timer);
            window.removeEventListener('resize');
        }
    },[])

    useEffect(() => {
        socket.on(`room:updateInfo`, (msg) => {
            setFavoriteRoom(
                favoriteRoom.map((room) =>
                    room.no === msg.roomObject.no ? { ...room, ["thumbnailUrl"]: msg.roomObject.thumbnailUrl } : room)
            );
        })
    }, [favoriteRoom]);

    useEffect(() => {
        if (deletedRoom !== undefined) {
            setFavoriteRoom(
                favoriteRoom.filter((room) =>
                    room.no !== deletedRoom)
            );
        }
    }, [deletedRoom]);

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
                    setFavoriteRoom([]);
                    return;
                }
                setFavoriteRoom(res.data.data);
            });
        } catch (e) {
            console.log(e);
        }
    }

    const closeAll = () => {
        setTrigger(false);
        setChatList(false);
        setChatMember(false);
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
    
    const exitRoom = (chatRoomNo) => {
        try {
            exitRoomApi(chatRoomNo).then((res) => {
                socket.emit('leave:chat-room', chatRoomNo, res.data.data.no, res.data.data.chatNickname);
                if (userInfo === undefined) {
                    createNonMember().then((res) => {
                        localStorage.set('token', res.data);
                    })
                };
                fetchRooms();
                fetchFavoriteRooms();
            })
        } catch (error) {
            console.log();
        }
    }

    const handleChatList = () => {
        setChatList(true);
        setChatMember(false);
        setTrigger(true);
    }

    const handleChatMember = () => {
        setChatList(false);
        setChatMember(true);
        setTrigger(true);
    }

    return (
        <ChatNav onClick={(e) => e.stopPropagation()}>
            <ChatNavbarStyled>
                <div className={"BasicNav"}>
                    <Link to="/chat"><NaviButton onClick={() => handleChatList()}><HomeIcon /></NaviButton></Link>
                    <NaviButton active={chatList} onClick={() => handleChatList()}>
                        <FontAwesomeIcon icon={faComment} style={{
                            fontSize: '1.25em',
                            fill: 'currentColor',
                            width: '1em', 
                            height: '1em',
                            display: 'inline-block',
                            transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                            flexShrink: '0',
                            marginLeft: '4px',
                            userSelect: 'none'}} 
                            />
                    </NaviButton>
                    <NaviButton active={chatMember} onClick={() => handleChatMember()}><FontAwesomeIcon icon={faUserFriends} style={{
                            fontSize: '1.6em',
                            fill: 'currentColor',
                            width: '1em', 
                            height: '1em',
                            display: 'inline-block',
                            transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                            flexShrink: '0',
                            marginLeft: '2px',
                            userSelect: 'none'}} 
                            /></NaviButton>
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
            </ChatNavbarStyled>
            <ChatNavStyled trigger={trigger}>
                {trigger? <CloseTrigger onClick={()=>closeAll()}><ArrowBackIcon/></CloseTrigger>: null}
                {chatList ? <ParticipatingRoom socket={socket} userInfo={userInfo} participatingRoom={participatingRoom} setSearchValue={setSearchValue} searchValue={searchValue} updateFavoriteRoom={updateFavoriteRoom} exitRoom={exitRoom} setFavoriteCheck={setFavoriteCheck} updateParticipatingRoom={updateParticipatingRoom} updateParticipatingRoomMessage={updateParticipatingRoomMessage} deletedParticipatingRoom={deletedParticipatingRoom} /> : null}
                {chatMember ? <ParticipatingMember socket={socket} currentParticipants={currentParticipants} userInfo={userInfo} participants={participants} /> : null}
            </ChatNavStyled>


        </ChatNav>
    );
}

const madeStyles = makeStyles({
    favoriteRoom: {
        width: "30px",
        height: "30px"
    }
})

const NaviButton = styled.button`
    padding: 5px 5px;
    margin-top: 10px;
    margin-left: 4px;

    border:none;
    border-radius: 8px;

    background-color:#fff;
    color: ${props => props.active ? colors.mainThemeColor : "gray"};

`

const ChatNav = styled.div`
    display: flex;
    height:100%;
    width:23%;
    overflow-x: hidden;

    @media ${(props) =>props.theme.laptop}{
        width: 40px;
    }
`

const ChatNavbarStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: #fff;
    min-width: 40px;
    max-width: 3.5em;
`

const ChatNavStyled = styled.div`
    width: 100%;
    height: 100%;
    background-color:#fff;
    border-right: 1px solid #ccc;
    transition: transform 0.3s ease-in-out;

    @media ${(props) =>props.theme.laptop}{
        position:absolute;
        z-index:10;

        width: 300px;
        transform: ${({ trigger }) => trigger ? 'translateX(37px)' : 'translateX(-100%)'};
    }
`

const CloseTrigger = styled.div`
    position:absolute;
    z-index:1;
    padding: 10px;
    left: 250px;
    top:10px;
`