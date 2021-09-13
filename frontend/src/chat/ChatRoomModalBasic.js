import React from 'react';
import styled from 'styled-components';

import { Button } from '@material-ui/core';

export default function ChatRoomModalBasic({enterRoom}) {

    return(
        <ContentTemplate>
            <Button className={"joinButton"} variant="contained" color="primary" onClick={() => {enterRoom()}} >방입장하기</Button>
        </ContentTemplate>
    )
}

const ContentTemplate = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
`