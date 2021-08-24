import React, { useState } from 'react';
import styled from 'styled-components';
import BoxShapeDiv from '../../assets/styles/BoxShapeDiv';
import FullColorButton from '../../assets/styles/FullColorButton';

import AccountSettings from './AccountSettings';
import UserInfoSettings from './UserInfoSettings';
export default function UserSettingsTemplate({user, settingsApi}) {

    

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
            <DropOutButton>회원 탈퇴</DropOutButton>
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