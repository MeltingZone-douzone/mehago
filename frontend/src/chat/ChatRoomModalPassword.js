import React from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';

export default function ChatRoomModalPassword({ password, handleChange, passwordValidation, wrongPassword, account }) {
    return (
        <ContentTemplate>
            <TextField id="chat-room-modal-password-input" variant="outlined" type="password" name="password" label="비밀번호" onChange={e => handleChange(e)} value={password} helperText={wrongPassword ? "비밀번호가 틀렸습니다" : null} />
            <Button className={"joinButton"} onClick={() => { passwordValidation() }} variant="contained" color="primary" disableElevation>{account ? `방 입장하기` : `비밀번호 확인`}</Button>
        </ContentTemplate>
    )
}

const ContentTemplate = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
`