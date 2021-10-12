import React, { useState } from 'react';
import styled from 'styled-components';
import BoxShapeDiv from '../../assets/styles/BoxShapeDiv';
import FullColorButton from '../../assets/styles/FullColorButton';
import ReactModal from "react-modal";

import AccountSettings from './AccountSettings';
import UserInfoSettings from './UserInfoSettings';
import { Button, ListItemText , makeStyles, Typography } from '@material-ui/core';
import {leaveMember} from '../../../api/AccountApi';
import localStorage from "local-storage";
import '../../assets/sass/chat/modal.scss';

import { useHistory } from 'react-router';

ReactModal.setAppElement('body');

export default function UserSettingsTemplate({ handleAuthentication ,user, settingsApi}) {
    const history = useHistory();
    const classes = madeStyles();

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
            <div className={classes.dropButton}>
                <DropOutButton onClick={() => { setModalIsOpen(true) }}>회원 탈퇴</DropOutButton>
            </div>
            <ReactModal
                className={"modal"}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                shouldCloseOnOverlayClick={true}
                contentLabel="채팅방">
                    <div className={"top"}>
                        <Button className={classes.close} onClick={() => setModalIsOpen(false)}>&times;</Button>
                    </div>
                    <ListItemText className={classes.container} align="center" primary={<Typography style={{ fontSize:'1.1em' }}>{user.nickname}{'님 정말 탈퇴 하시겠습니까?'}</Typography>}/>
                    <div className={"modalButton"}>
                        <Button className={classes.cancelButton} onClick={() => { setModalIsOpen(false) }} variant="contained" color="primary" disableElevation>취소</Button>
                        <Button className={classes.okButton} onClick={() => { unregister();  setModalIsOpen(false); }} variant="contained" color="primary" disableElevation>확인</Button>
                    </div>
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
    width: 100%;
    margin-left:3em;


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
    border-color:#ff0606cc;
    background-color:#ff0606cc;
    padding: 10px;
    opacity:.9;
`

const madeStyles = makeStyles({
    close: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: '1.25rem'
    },
    container:{
        display: 'flex',
        alignItems: 'center',
        minHeight: '6rem',
        height: '100%',
        justifyContent: 'center',
    },
    cancelButton: {
        width: '11rem',
        backgroundColor: '#d9d9d9',
        border: '0px solid #a0a0a0',
        color: '#595959',
        '&:hover': {
            background: '#eaeaea',
        },
    },
    okButton: {
        width: '11rem',
        backgroundColor: '#1C90FC',
        color: '#ffffff',
        '&:hover': {
            background: '#40a3fd',
        },
    },
    dropButton:{
        minWidth: "100px",
        maxWidth: "800px",
        display: "flex",
        justifyContent: "flex-end"
    }
})