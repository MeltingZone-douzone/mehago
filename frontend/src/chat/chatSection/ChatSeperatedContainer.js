import React, { useEffect } from 'react';
import styled from 'styled-components';
import { fadeIn, fadeOut } from '../../assets/styles/properties/Fade';

import ChattingTemplate from './ChattingTemplate';
import UtilsTemplate from './UtilsTemplate';

export default function ChatSeperatedContainer({ socket, messageFunction, participantObject, roomObject, chatRoomNo, searchMessage, hiddenSearchInput, cursor, message, buttonFunction, todoOpen, noticeOpen, fileUploadOpen, isSeperated, handleDeleteNotice, notice, fileList, userInfo }) {

    useEffect(() => {
        console.log(isSeperated);
    }, [isSeperated])


    return (
        <Container>
            <ChatWrapper isSeperated={isSeperated}>
                <ChattingTemplate
                    socket={socket}
                    messageFunction={messageFunction}
                    participantObject={participantObject}
                    roomObject={roomObject}
                    chatRoomNo={chatRoomNo}
                    searchMessage={searchMessage}
                    // setCurrentParticipants={setCurrentParticipants} 
                    hiddenSearchInput={hiddenSearchInput}
                    cursor={cursor}

                    message={message} buttonFunction={buttonFunction}
                    todoOpen={todoOpen} noticeOpen={noticeOpen} fileUploadOpen={fileUploadOpen}
                />
            </ChatWrapper>

            <UtilsWrapper isSeperated={isSeperated}>
                <UtilsTemplate
                    isOnChatSection={true}
                    participantObject={participantObject}
                    chatRoomNo={chatRoomNo}/* 네비랑 같이 쓰는데 css를 위함 */
                    handleDeleteNotice={handleDeleteNotice}
                    notice={notice}
                    fileList={fileList}
                    userInfo={userInfo}
                />
            </UtilsWrapper>
        </Container>
    )
}

const Container = styled.div`
    width:100%;
    height:90%;
    max-height: 90%;
    display:flex;
    justify-content: center;
    align-items: center;
`

const ChatWrapper = styled.div`
    width: ${({ isSeperated }) => isSeperated ? "45%" : "100%"};
    height: ${({ isSeperated }) => isSeperated ? "90%" : "100%"};

    transition: all .5s ease-in-out;

    background-color: #F5F5F5;
    border:1px soild #eee;
    border-radius: 8px;
    margin: auto;

    
`

const UtilsWrapper = styled.div`
    display: ${({ isSeperated }) => isSeperated ? "block" : "none"};
    animation: ${(isSeperated) => isSeperated ? fadeIn : fadeOut} 1s ease-out;
    width: 45%;
    height: 95%;
    margin: auto;
    margin-top: 1rem;
    border-radius: 8px;
    overflow: hidden;
`