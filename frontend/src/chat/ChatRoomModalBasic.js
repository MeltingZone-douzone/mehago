import { Button, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import '../assets/sass/chat/modal.scss';


export default function ChatRoomModalBasic({ basicEnterRoom, limitCountMsg }) {

    const showResultMsgText = () => {
        return <Typography id="chat-room-modal-resultMsg-text" variant="subtitle2" noWrap>인원이 가득 차 입장할 수 없습니다.</Typography>
    }

    return(
        <ContentTemplate>
            {
                limitCountMsg ? showResultMsgText() : null
            }
            <Button className={"joinButton"} variant="contained" color="primary" onClick={() => { basicEnterRoom() }} >방 입장하기</Button>
        </ContentTemplate>
    )
}

const ContentTemplate = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
`