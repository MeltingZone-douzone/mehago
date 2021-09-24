import { Button, TextField } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import React, { useState } from 'react';
import styled from 'styled-components';
import '../assets/sass/chat/modal.scss';
import { enterRoomValidationApi } from '../../api/ChatApi';

export default function ChatRoomModalPassword({ handleChange, password, passwordEnterRoom, passwordValidation, hiddenPasswordInput }) {

    const showPasswordInput = () => {
        console.log('showPasswordInput')
        return <TextField id="chat-room-modal-password-input" variant="outlined" type="password" name="password" label="비밀번호" onChange={(e) => handleChange(e)} value={password} />
    }

    return(
        <ContentTemplate>
            {
                hiddenPasswordInput ? null : showPasswordInput()
            }
            <Button className={"joinButton"} onClick={()=>{ hiddenPasswordInput ? passwordEnterRoom() : passwordValidation() }} variant="contained" color="primary" disableElevation><LockIcon style={{ paddingRight:'0.25em'}}/>  방 입장하기</Button>
        </ContentTemplate>
    )
}

const ContentTemplate = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
`