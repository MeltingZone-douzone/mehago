import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Avatar } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import "../../../assets/sass/chat/ChatUtil.scss";

export default function ChatUtilNotice({ handleDeleteNotice, notice, userInfo }) {
    return (
        notice.length !== 0 ? (
            <div style={{ lineHeight: "1.5rem" }} className={"box"}>
            {notice.map((notice, index) => {
                return (
                    <div className={"notification"} key={index}>
                        <Avatar src={notice.thumbnailUrl} />
                        <div className={"text"}>
                            <p><span className={"notice"}>{notice.notice}</span></p><br />
                            <p className={"time"}>{notice.nickname} {notice.createdAt}</p>
                        </div>
                        {userInfo && notice.accountNo === userInfo.no ? (
                            <button className={"deleteNotice"} onClick={(e) => { handleDeleteNotice(notice.no) }}><FontAwesomeIcon icon={faEraser} size={'1x'} /></button>

                        ) :
                            null
                        }
                    </div>
                )
            })}

        </div>
        ):(
            <NonFile>
                <ErrorOutlineIcon/>
                <Text>공지사항이 없습니다.</Text>
            </NonFile>
        )
        
    )
}

const NonFile = styled.div`
    color: #272727;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding-top: 2em;
`
const Text = styled.div`
    text-align: center;
    width: 100%;
    padding-top:1em;
    color: #272727;
`