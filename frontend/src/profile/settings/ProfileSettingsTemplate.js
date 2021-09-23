import React, { useState } from 'react';
import styled from 'styled-components';
import BoxShapeDiv from '../../assets/styles/BoxShapeDiv';
import FullColorButton from '../../assets/styles/FullColorButton';
import ReactModal from "react-modal";

import AccountSettings from './AccountSettings';
import UserInfoSettings from './UserInfoSettings';
import { Button, ListItemText } from '@material-ui/core';
import {leaveMember} from '../../../api/AccountApi';
import localStorage from "local-storage";

import { useHistory } from 'react-router';

ReactModal.setAppElement('body');

export default function UserSettingsTemplate({ handleAuthentication ,user, settingsApi}) {
    const history = useHistory();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const unregister = () =>{
        // console.log(user.no);
        leaveMember(user.no).then((res) => {
            handleAuthentication(false);
            localStorage.remove("token");
            history.push("/account/login");
        })
    }

    return(
        <SettingsTemplate>
            <TitleText fontSize={"1.5rem"}><p>계정 정보</p></TitleText>
            <TitleText fontSize={".8rem"}><p>닉네임, 비밀번호와 같이 사용하는 계정 정보</p></TitleText>
            <SettingBox>
                <AccountSettings 
                    nickname = {user.nickname}
                    thumbnailUrl = {user.thumbnailUrl}
                    settingsApi = {settingsApi}/>
            </SettingBox>

            <TitleText fontSize={"1.5rem"}><p>개인 정보</p></TitleText>
            <TitleText fontSize={".8rem"}><p>이름, 전화번호 등등 개인 정보</p></TitleText>
            <SettingBox>
                <UserInfoSettings 
                        name = {user.name}
                        phoneNumber = {user.phoneNumber}
                        setUserInfoApi = {settingsApi.setUserInfo}/>
            </SettingBox>
            <DropOutButton onClick={() => { setModalIsOpen(true) }}>회원 탈퇴</DropOutButton>
            <ReactModal
                className={"modal"}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                shouldCloseOnOverlayClick={true}
                contentLabel="채팅방">
                <div className={"top"}>
                    <Button variant="contained" onClick={() => setModalIsOpen(false)}>x</Button>
                </div>
                <ListItemText align="center" primary={`[${user.nickname}]님 정말 탈퇴 하시겠습니까?`} secondary={'나가면 바보'} />
                <Button onClick={() => { setModalIsOpen(false) }} variant="contained" color="primary" disableElevation>취소</Button>
                <Button onClick={() => { unregister();  setModalIsOpen(false); }} variant="contained" color="primary" disableElevation>확인</Button>
            </ReactModal>
        </SettingsTemplate>
       
    );
}

const SettingsTemplate = styled.div`
    position:relative;
    top:0;
    left:0;
    
    display:flex;
    flex-direction:column;
    padding:16px;

`


const SettingBox = styled(BoxShapeDiv)`
    max-width: 800px;
    margin-bottom: 1em;

`

const TitleText = styled.div`
    font-size: ${({fontSize})=>fontSize};
    color:${({fontSize})=>fontSize =="1.5rem"? "#000":"#636466"};
    
    margin:.5rem;
`

const DropOutButton = styled(FullColorButton)`
    min-width: 100px;
    margin-left:auto;
    margin-right: 18%;
    
    border-color:#ff0606cc;
    background-color:#ff0606cc;

    opacity:.2;
`