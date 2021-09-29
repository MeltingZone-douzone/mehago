import React from 'react';
import styled from 'styled-components';

import { Button } from '@material-ui/core';

export default function ChatRoomModalIsFull({ isFull, onlyAuthorized }) {

    return (
        <ContentTemplate>
            {isFull ?
                <Button className={"joinButton"} variant="contained" color="primary" disabled >인원이 가득 차 입장할 수 없습니다.</Button>
                : onlyAuthorized ?
                    <Button className={"joinButton"} variant="contained" color="primary" disabled >회원만 입장 가능한 방입니다.</Button>
                    : null}
        </ContentTemplate>
    )
}

const ContentTemplate = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
`