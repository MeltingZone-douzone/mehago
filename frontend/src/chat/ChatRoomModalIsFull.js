import React from 'react';
import styled from 'styled-components';

import { Button } from '@material-ui/core';

export default function ChatRoomModalIsFull() {

    return (
        <ContentTemplate>
            <Button className={"joinButton"} variant="contained" color="primary" disabled >인원이 가득 차 입장할 수 없습니다.</Button>
        </ContentTemplate>
    )
}

const ContentTemplate = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
`