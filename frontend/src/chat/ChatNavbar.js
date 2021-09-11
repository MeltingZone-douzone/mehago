import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../assets/sass/chat/Chat.scss';
import { colors } from '../assets/styles/properties/Colors';
import { Link } from 'react-router-dom';

import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import HomeIcon from '@material-ui/icons/Home';

import ParticipatingRoom from './ParticipatingRoom';
import ParticipatingMember from './ParticipatingMember';


export default function ChatNavbar({currentParticipants, userInfo, participants}){
    const [chatList, setChatList] = useState(true);
    const [chatMember, setChatMember] = useState(false);

    const handleChatList = () => {
        setChatList(true);
        setChatMember(false);

    }

    const handleChatMember = () => {
        setChatList(false);
        setChatMember(true);
    }

    return (
        <div className={"Chat"} onClick={(e)=>e.stopPropagation()}>
            <div className={"ChatNavbar"}>
                <div className={"BasicNav"}>
                    <Link to="/chat"><NaviButton><HomeIcon /></NaviButton></Link>
                    <NaviButton active={chatList} onClick={() => handleChatList()}><ForumOutlinedIcon /></NaviButton>
                    <NaviButton active={chatMember} onClick={() => handleChatMember()}><PeopleAltOutlinedIcon /></NaviButton>
                </div>
                <div className={"FavoriteNav"}>
                    <NaviButton>즐겨찾기</NaviButton>
                    <NaviButton>이미지</NaviButton>
                    <NaviButton>버튼들</NaviButton>
                    <NaviButton>넣으면</NaviButton>
                    <NaviButton>될듯</NaviButton>
                </div>
            </div>
            <div className={"ChatList"}>
                {chatList? <ParticipatingRoom />: null}
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
