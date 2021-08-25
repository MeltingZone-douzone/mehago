import React, {useState} from 'react';
import styled from 'styled-components';
export default function MsgInput({socket}) {

    const [message, setMessage] = useState("");

    const onChanageMessage = (e) =>{
        setMessage(e.target.value);
    }

    const onSubmitMessage = (e) => {
        e.preventDefault();
        if(message){
            socket.emit('chat message', message);
            setMessage('');
        }
    }

    return(
        <MsgForm>
            <form onSubmit={ onSubmitMessage }>
                    <input value={ message } onChange={ onChanageMessage }/>
            </form>
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