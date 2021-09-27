import { Button, TextField } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

export default function ChatRoomModalNickname({ nickname, handleChange, nicknameValidation, wrongNickname, hiddenNicknameInput, basicEnterRoom }) {
    
    console.log(hiddenNicknameInput);
    
    const showNicknameInput = () => {
        // nickname 중복일 경우에도 helperText에 표시해야함 
        return <TextField id="chat-room-modal-nickname-input" variant="outlined" type="text" name="nickname" label="2 ~ 20자의 한글, 영문의 닉네임을 입력하세요." onChange={e => handleChange(e)} value={nickname} helperText={wrongNickname ? "중복된 닉네임입니다." : null} />
    }
    
    return (
        <ContentTemplate>
            {
                hiddenNicknameInput ? null : showNicknameInput()
            }
            <Button className={"joinButton"} onClick={() => { hiddenNicknameInput ? basicEnterRoom() : nicknameValidation() }} variant="contained" color="primary" disableElevation>방 입장하기</Button>
        </ContentTemplate>
    )
}

const ContentTemplate = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
`