import { Button, TextField } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import React from 'react';
import styled from 'styled-components';
import '../assets/sass/chat/modal.scss';

export default function ChatRoomModalPassword({ handleChange, account, password, wrongPassword, basicEnterRoom, passwordValidation, hiddenPasswordInput, handleKeyPress }) {

    const showPasswordInput = () => {
        return <TextField id="chat-room-modal-password-input" variant="outlined" type="password" name="password" label="비밀번호" placeholder="8 ~ 10자 영문, 숫자의 비밀번호를 입력하세요." onKeyPress={(e) => handleKeyPress(e)} onChange={(e) => handleChange(e)} value={password} helperText={wrongPassword ? "비밀번호가 틀렸습니다" : null}/>
    }

    return (
        <ContentTemplate>
            {
                hiddenPasswordInput ? null : showPasswordInput()
            }
            <Button className={"joinButton"} onClick={()=>{ hiddenPasswordInput ? basicEnterRoom() : passwordValidation() }} variant="contained" color="primary" disableElevation disabled={account ? false : true}><LockIcon style={{ paddingRight:'0.25em'}}/> {account ? '방 입장하기' : '비밀방은 회원만 이용가능합니다.'}  </Button>
        </ContentTemplate>
    )
}
 
const ContentTemplate = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
`