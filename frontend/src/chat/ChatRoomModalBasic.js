import { Button } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import '../assets/sass/chat/modal.scss';


export default function ChatRoomModalBasic({ basicEnterRoom, onlyAuthorized, account }) {

    return(
        <ContentTemplate>
            <Button className={"joinButton"} variant="contained" color="primary" disabled={onlyAuthorized != account ? true : false} onClick={() => { basicEnterRoom() }}> { onlyAuthorized != account ? '회원만 이용가능한 방입니다.' : '방 입장하기'}</Button>
        </ContentTemplate>
    )
}

const ContentTemplate = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
`