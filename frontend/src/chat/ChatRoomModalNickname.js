import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

export default function ChatRoomModalNickname() {
    return(
        <ContentTemplate>
            <Button className={"joinButton"}  variant="contained" color="primary" disableElevation>방입장하기</Button>
        </ContentTemplate>
    )
}

const ContentTemplate = styled.div`

`