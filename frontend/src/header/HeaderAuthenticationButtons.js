import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faBell as solidBell} from '@fortawesome/free-solid-svg-icons';

import HeaderDropdownTemp from './HeaderAuthenticationToggleTemplate';
import Thumbnail from '../components/Thumbnail';


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
            <DropdownButton onClick={() => handleSetAlarm()}>
                {
                    hiddenAlarm?
                    <FontAwesomeIcon icon={faBell} size="2x" color="#fff"/>
                    :
                    <FontAwesomeIcon icon={solidBell} size="2x" color="#fff"/>
                }
            </DropdownButton>
            <DropdownButton onClick={() => handleSetProfile()}>
                 <Thumbnail nickname={userInfo.nickname}/>
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
    width: 50px;
    height: 50px;
    background-color: #00000000;
    align-items: center;
    justify-content: center;
    border:1px solid #ffffff10;
    border-radius: 100%;


    & + & {
        margin-left: 5px;
    }
`