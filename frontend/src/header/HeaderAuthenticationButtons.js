import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faBell as solidBell, faPlus} from '@fortawesome/free-solid-svg-icons';

import HeaderDropdownTemp from './HeaderAuthenticationToggleTemplate';
import Thumbnail from '../components/Thumbnail';
import { NavLink } from 'react-router-dom';
import CircleDiv from '../assets/styles/CircleDiv';


const AccountHeaderButtons = ({handleAuthentication, userInfo}) =>{

    const [hiddenProfile,setHiddenProfile] = useState(true);
    const [hiddenAlarm,setHiddenAlarm] = useState(true);
    const [hiddenTemp,setHiddenTemp] = useState(true);
    const toggleContainer = useRef(null);

    

    function handleSetAlarm (){
        if(!hiddenProfile){
            setHiddenProfile(true);
        }

        if(hiddenAlarm){
            setHiddenAlarm(false);
        }else{
            setHiddenAlarm(true);
        }
    }

    function handleSetProfile (){
        if(!hiddenAlarm){
            setHiddenAlarm(true);
        }

        if(hiddenProfile){
            setHiddenProfile(false);
        }else{
            setHiddenProfile(true);
        }
    }

    function handleClose(){
        setHiddenAlarm(true);
        setHiddenProfile(true);
        setHiddenTemp(true);
    }
    
    useEffect(()=>{
        if(!hiddenAlarm || !hiddenProfile){
            setHiddenTemp(false);
        }

        return (()=>{
            setHiddenTemp(true);
        })

    },[hiddenAlarm,hiddenProfile])

    useEffect(()=>{
        if(!hiddenTemp){   
           window.addEventListener('click',onClickOutsideHandler);
        }

        return (() =>{
            window.removeEventListener('click',onClickOutsideHandler);
        });

    },[hiddenTemp])
    
    function onClickOutsideHandler(e){
        if (!toggleContainer.current.contains(e.target)) {
            handleClose();
        }
    }

    return(
        <AccountHeaderProfileDiv ref={toggleContainer}>
            <CreateChatRoomButton to="/chat/chatroom/create">
                <FontAwesomeIcon icon={faPlus} size="1x" color="#fff" />
                <span>채팅방 개설</span>
            </CreateChatRoomButton>
            <DropdownButton onClick={() => handleSetAlarm()}>
                {
                    hiddenAlarm?
                    <FontAwesomeIcon icon={faBell} size="2x" color="#fff"/>
                    :
                    <FontAwesomeIcon icon={solidBell} size="2x" color="#fff"/>
                }
            </DropdownButton>
                    <DropdownButton onClick={() => handleSetProfile()}>
                    <ImageDiv>
                        <Thumbnail thumbnailUrl={userInfo.thumbnailUrl} nickname={userInfo.nickname}/>
                    </ImageDiv>
                    </DropdownButton>
            {
                hiddenTemp? null:
                <HeaderDropdownTemp
                    userInfo = {userInfo}
                    handleAuthentication = {handleAuthentication}
                    hiddenAlarm = {hiddenAlarm}
                    hiddenProfile = {hiddenProfile}
                    onClose = {handleClose}
                />
            }
        </AccountHeaderProfileDiv>
    );
}

export default AccountHeaderButtons;

const AccountHeaderProfileDiv = styled.div`
    display:flex;
    width:auto;
    margin-right: 1em;
    height: 100%;
    align-items:center;
    background-color: #00000000;

`
const DropdownButton = styled.button`
    width: 56px;
    height: 50px;
    background-color: #00000000;
    align-items: center;
    justify-content: center;
    border:1px solid #ffffff10;
    border-radius: 100%;


    & + & {
        margin-left: 5px;
    }

    &:hover {
        background-color: #00000010;
        transition-duration: .5s;
    }
`
const ImageDiv =styled(CircleDiv)`
    width:40px;
    height:40px;
    overflow:hidden;
    margin:0 auto;
`

const CreateChatRoomButton = styled(NavLink)`
    display: flex;
    width: fit-content;
    height: 30px;
    margin-right:5px;
    padding: 0 10px;
    align-items:center;
    
    border:1px solid #fff;
    border-radius:10px;
    font-size: .8rem;

    span{
        margin-left:6px;
        color:#fff;
        font-size:1rem;
    }

    &:hover {
        background-color: #00000010;
        transition-duration: .5s;
    }
`