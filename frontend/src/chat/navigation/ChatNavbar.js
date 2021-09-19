import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../assets/sass/chat/ChatNav.scss';
import { colors } from '../../assets/styles/properties/Colors';
import { Link } from 'react-router-dom';
import { getMyChatListApi, updateFavoriteRoomApi , getFavoriteRoomList, exitRoomApi} from '../../../api/ChatApi';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import HomeIcon from '@material-ui/icons/Home';

import ParticipatingRoom from './ParticipatingRoom';
import ParticipatingMember from './ParticipatingMember';
import { Avatar, makeStyles } from '@material-ui/core';


export default function ChatNavbar({currentParticipants, userInfo, participants, fetchRooms, participatingRoom}){
    const classes = madeStyles();

    const [chatList, setChatList] = useState(true);
    const [chatMember, setChatMember] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [favoriteRoom, setFavoriteRoom] = useState([]);
    const [favoriteCheck, setFavoriteCheck] = useState(false);
    
    useEffect(()=> {
        console.log(`fetchRooms() fetchFavoriteRooms(); useEffect`);
        fetchRooms();
        fetchFavoriteRooms();
    },[favoriteCheck]);

    // const fetchRooms = () => {
    //     try {
    //         getMyChatListApi().then(res => {
    //             if(res.data.result == "fail"){
    //                 return false;
    //             }
    //             setParticipatingRoom(res.data.data);
    //         });
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    const fetchFavoriteRooms = () => {
        try {
            getFavoriteRoomList().then(res => {
                setFavoriteRoom(res.data);
            });
        } catch (e) {
            console.log(e);
        }
    }

    const updateFavoriteRoom = (chatRoomNo, favoriteStatus) => {
        console.log(favoriteStatus);
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
                console.log(res);
            })
            fetchRooms(); // useEffect에서 하게해야? 아니면 res로 그냥 받을까 이대로? ㅇㅋ  TODO:
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
        <div className={"ChatNav"} onClick={(e)=>e.stopPropagation()}>
            <div className={"ChatNavbar"}>
                <div className={"BasicNav"}>
                    <Link to="/chat"><NaviButton><HomeIcon /></NaviButton></Link>
                    <NaviButton active={chatList} onClick={() => handleChatList()}><ForumOutlinedIcon /></NaviButton>
                    <NaviButton active={chatMember} onClick={() => handleChatMember()}><PeopleAltOutlinedIcon /></NaviButton>
                </div>
                <div className={"FavoriteNav"}>
                    {
                        favoriteRoom && favoriteRoom.map((favorite,index) =>{
                            return(
                                <Link to={`/chat/${favorite.no}`} key={index}> 
                                    <NaviButton ><Avatar className={classes.favoriteRoom} alt="프로필 사진" src={favorite.thumbnailUrl} key={favorite.no}/></NaviButton>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            <div className={"ChatList"}>
                {chatList? <ParticipatingRoom participatingRoom={participatingRoom} setSearchValue={setSearchValue} searchValue={searchValue} updateFavoriteRoom={updateFavoriteRoom} exitRoom={exitRoom} setFavoriteCheck={setFavoriteCheck}/>: null}
                {chatMember? <ParticipatingMember currentParticipants={currentParticipants} userInfo={userInfo} participants={participants}/>: null}
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
    color: ${ props => props.active ? colors.mainThemeColor : "gray" };
`

const madeStyles = makeStyles({
    favoriteRoom: {
        width:"30px",
        height:"30px"                      
    }
})
