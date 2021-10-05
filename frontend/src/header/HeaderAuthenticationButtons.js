import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faBell as solidBell} from '@fortawesome/free-solid-svg-icons';

import AlarmPoint from '../components/AlarmPoint';
import HeaderDropdownTemp from './HeaderAuthenticationToggleTemplate';
import Thumbnail from '../components/Thumbnail';
import { NavLink } from 'react-router-dom';
import CircleDiv from '../assets/styles/CircleDiv';
import { getAlarmsApi, updateAlarmsApi } from '../../api/AlarmApi';


const AccountHeaderButtons = ({handleAuthentication, userInfo, setUserInfo}) =>{

    const [hiddenProfile,setHiddenProfile] = useState(true);
    const [hiddenAlarm,setHiddenAlarm] = useState(true);
    const [hiddenTemp,setHiddenTemp] = useState(true);
    const [alarms, setAlarms] = useState([]);
    const [alarmsCount, setAlarmsCount] = useState("");
    const [updated, setUpdated] = useState(false);
    const toggleContainer = useRef(null);

    useEffect(()=>{
        if(userInfo){
            getAlarmsApi().then((res) =>{
                if(res.data.result === 'fail') {
                    return;
                }
                setAlarms(res.data.data);
                setAlarmsCount(res.data.data.length);
            })
        }
    },[userInfo]);

    useEffect(() =>{

        if(!hiddenAlarm && !updated) {
            updateAlarmsApi().then(res => {
                console.log(res);
                if(res.data.result === 'fail') {
                    return ;
                }
                setUpdated(true);
            });
        }
    },[hiddenAlarm])

    function handleSetAlarm (){
        if(!hiddenProfile){
            setHiddenProfile(true);
        }

        if(hiddenAlarm){
            setHiddenAlarm(false);
            setAlarmsCount(0);
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
            <CreateChatRoomButton to="/chat">
                <span>방 둘러보기</span>
            </CreateChatRoomButton>
            <AlarmsCount>
            <DropdownButton onClick={() => handleSetAlarm()}>
                {
                    hiddenAlarm?
                    <>
                        <FontAwesomeIcon icon={faBell} size="2x" color="#fff"/>
                        {alarmsCount ? <AlarmPoint num={alarmsCount} left={"30px"} top={"20px"}/> : null}
                    </>
                    :
                    <FontAwesomeIcon icon={solidBell} size="2x" color="#fff"/>
                }
            </DropdownButton>
            </AlarmsCount>
            <DropdownButton onClick={() => handleSetProfile()}>
                <ImageDiv>
                    <Thumbnail thumbnailUrl={userInfo.thumbnailUrl} nickname={userInfo.nickname}/>
                </ImageDiv>
            </DropdownButton>
            {
                hiddenTemp? null:
                <HeaderDropdownTemp
                    userInfo = {userInfo}
                    alarms = {alarms}
                    alarmsCount = {alarmsCount}
                    handleAuthentication = {handleAuthentication}
                    hiddenAlarm = {hiddenAlarm}
                    hiddenProfile = {hiddenProfile}
                    onClose = {handleClose}
                    setUserInfo={setUserInfo}
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
    height: 44px;
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
    width:30px;
    height:30px;
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
        color:#fff;
        font-size:1rem;
    }

    &:hover {
        background-color: #00000010;
        transition-duration: .5s;
    }
`

const AlarmsCount = styled.div`
    position: relative;
`