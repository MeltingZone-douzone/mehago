import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../assets/sass/chat/ChatNav.scss';
import { colors } from '../../assets/styles/properties/Colors';
import { Link } from 'react-router-dom';
import { getMyChatListApi, joinFavoriteRoom , favoriteRoomList} from '../../../api/ChatApi';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import HomeIcon from '@material-ui/icons/Home';

import ParticipatingRoom from './ParticipatingRoom';
import ParticipatingMember from './ParticipatingMember';
import { Avatar } from '@material-ui/core';


export default function ChatNavbar({currentParticipants, userInfo, participants}){
    const [chatList, setChatList] = useState(true);
    const [chatMember, setChatMember] = useState(false);
    const [participatingRoom, setParticipatingRoom] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [favoriteRoomThumbnail, setFavoriteRoomThumbnail] = useState([]);
    
    useEffect(()=> {
        try {
            getMyChatListApi().then(res => {
                if(res.data.result == "fail"){
                    return false;
                }
                // console.log(res.data.data);
                setParticipatingRoom(res.data.data);
            });
        } catch (e) {
            console.log(e);
        }
    },[]);

    useEffect(()=> {
        try {
            favoriteRoomList().then(res => {
                console.log(res.data.thumbnailUrl);
                setFavoriteRoomThumbnail(res.data);
            });
        } catch (e) {
            console.log(e);
        }
    },[]);

    const favoriteRoom = (no) => {
        try {
            joinFavoriteRoom(no).then((res) => {
                console.log(res.data);
            });
        } catch (error) {
            
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
                        favoriteRoomThumbnail && favoriteRoomThumbnail.map((favorite) =>{
                            return(
                                <NaviButton><Avatar alt="프로필 사진" src = {favorite.thumbnailUrl} /></NaviButton>
                            )
                        })
                    }
                </div>
            </div>
            <div className={"ChatList"}>
                {chatList? <ParticipatingRoom participatingRoom={participatingRoom} setSearchValue={setSearchValue} searchValue={searchValue} favoriteRoom={favoriteRoom}/>: null}
                {chatMember? <ParticipatingMember currentParticipants={currentParticipants}userInfo={userInfo} participants={participants}/>: null}
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
