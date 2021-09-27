import React, { useState } from 'react';
import styled from 'styled-components';

import Chatting from './Chatting';
import MsgInput from './MsgInput';
import Dialogs from '../dialogs/Dialogs';
import { makeStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from '@fortawesome/free-solid-svg-icons'; 
import { Button } from '@material-ui/core';


export default function ChattingTemplate({socket, messageFunction, participantObject, roomObject, chatRoomNo, searchMessage, hiddenSearchInput, cursor, message, buttonFunction, todoOpen, noticeOpen, fileUploadOpen, notice, isSeperated}) {
    
    const classes = useStyles();

    const [expandable, setExpandable] = useState(false);
    
    return(
        <Template>
            {
            !isSeperated ? (
                    notice.length !== 0 ? (
                    <NoticeTemplate>
                        <Notice>
                            <span ><FontAwesomeIcon className={classes.noticeIcon} icon={faBullhorn}/></span>
                            <div className={classes.notice}>
                                <p>{notice[0].notice}</p>
                            </div>
                            <Button className={classes.dropDown} onClick={()=>{setExpandable(!expandable)}}>{expandable ? "▲" : "▼"}</Button>
                            {/* 여기에 버튼 만들어서 접어두기/열기 만들어야 함 */}
                        </Notice>
                        <WriterInfo expandable={expandable}>
                            <p>{notice[0].nickname}님이 등록</p>
                        </WriterInfo>
                    </NoticeTemplate>
                    ):(
                    null
                    )
            ):(
                null
            )
            }
            
                <Chatting socket={socket} 
                    messageFunction={messageFunction} 
                    participantObject={participantObject} 
                    roomObject={roomObject} 
                    chatRoomNo={chatRoomNo} 
                    searchMessage={searchMessage}
                    // setCurrentParticipants={setCurrentParticipants} 
                    hiddenSearchInput={hiddenSearchInput}
                    cursor={cursor}
                    notice={notice} />
                <MsgInput socket={socket} message={message} messageFunction={messageFunction} buttonFunction={buttonFunction} />
                <Dialogs buttonFunction={buttonFunction} todoOpen={todoOpen} noticeOpen={noticeOpen} fileUploadOpen={fileUploadOpen} />
        </Template>
    )
}

const Template = styled.div`
    width: 100%;
    height: 100%;
`
const NoticeTemplate = styled.div`
  width: 100%;
  min-height: 3em;
  position: absolute;
  z-index: 1;
  background-color: white;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: inset;
  box-sizing: border-box;
  padding-top: 0.5em;
`

const Notice = styled.div`
    display:flex;
    width: 100%;
    align-items: center;
`

const WriterInfo = styled.div`
    visibility: ${({expandable}) => expandable ? "visible" : "hidden"};
    widht: 100%;
    height: ${({expandable}) => expandable ? "50px" : "0"};
    display: flex;
    width: 100%;
    align-items: center;
    padding-left: 3em;
    font-size: smaller;
`

const useStyles = makeStyles((theme) => ({
    
    noticeIcon : { 
        paddingLeft:"1.5em",
        width:"10%"
      },
      notice:{
        paddingLeft:"1em",
        width:"70%"
      },
      dropDown:{
        display: "contents",
        justifyContent: "end",
        width:"10%"
      }
}))