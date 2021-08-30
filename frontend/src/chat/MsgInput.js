import React, {useState} from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core'

export default function MsgInput({messageObject, messageFunction}) {
    return(
        <MsgForm>
            <form onSubmit={ messageFunction.onSubmitMessage }>
                    <input name='message' value={ messageObject.message } onChange={ messageFunction.onChangeMessage }/>
            </form>
            <Button value={'나가기'} onClick={ messageFunction.leaveRoom } />
        </MsgForm>
    );
}

const MsgForm = styled.div`
    width:90%;
    line-height: 1.5rem;
    input {
        width: 100%;
        height: 100%;
    }
`