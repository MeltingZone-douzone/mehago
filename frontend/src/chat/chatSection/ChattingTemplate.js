import React from 'react';
import styled from 'styled-components';

import Chatting from './Chatting';
import MsgInput from './MsgInput';
import Dialogs from '../dialogs/Dialogs';


export default function ChattingTemplate({socket, messageFunction, participantObject, roomObject, chatRoomNo, searchMessage, hiddenSearchInput, cursor, message, buttonFunction, todoOpen, noticeOpen, fileUploadOpen}) {
    return(
        <Template>
                <Chatting socket={socket} 
                    messageFunction={messageFunction} 
                    participantObject={participantObject} 
                    roomObject={roomObject} 
                    chatRoomNo={chatRoomNo} 
                    searchMessage={searchMessage}
                    // setCurrentParticipants={setCurrentParticipants} 
                    hiddenSearchInput={hiddenSearchInput}
                    cursor={cursor} />
                <MsgInput socket={socket} message={message} messageFunction={messageFunction} buttonFunction={buttonFunction} />
                <Dialogs buttonFunction={buttonFunction} todoOpen={todoOpen} noticeOpen={noticeOpen} fileUploadOpen={fileUploadOpen} />
        </Template>
    )
}

const Template = styled.div`
    width: 100%;
    height: 100%;
`