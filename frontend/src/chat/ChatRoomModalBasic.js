import { Button } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import '../assets/sass/chat/modal.scss';


export default function ChatRoomModalBasic({ basicEnterRoom, updateParticipatingRoom}) {

    return(
        <ContentTemplate>
            <Button className={"joinButton"} variant="contained" color="primary" onClick={() => { basicEnterRoom(), updateParticipatingRoom()}} >방 입장하기</Button>
        </ContentTemplate>
    )
}

const ContentTemplate = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
`