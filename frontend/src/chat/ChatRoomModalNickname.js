import React from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';

export default function ChatRoomModalNickname({ nickname, handleChange, nicknameValidation, wrongNickname }) {
    return (
        <ContentTemplate>
            <TextField id="chat-room-modal-nickname-input" variant="outlined" type="text" name="nickname" label="닉네임" onChange={e => handleChange(e)} value={nickname} helperText={wrongNickname ? "2 ~ 20자의 한글, 영문의 닉네임을 입력하세요." : null} />
            <Button className={"joinButton"} onClick={() => { nicknameValidation() }} variant="contained" color="primary" disableElevation>방 입장하기</Button>
        </ContentTemplate>
    )
}

const ContentTemplate = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
`