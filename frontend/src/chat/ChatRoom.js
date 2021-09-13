import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/sass/chat/ChatRoomButton.scss';
import '../assets/sass/chat/modal.scss'
import { Chip, makeStyles } from '@material-ui/core';
import Logo from '../assets/images/black-mehago.png';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import FaceIcon from '@material-ui/icons/Face';

import ReactModal from "react-modal";
ReactModal.setAppElement('body');

import {isExistsPasswords, checkPassword, nicknameValidation} from '../../api/ChatApi';
import ChatRoomModalContent from './ChatRoomModalContent';

export default function ChatRoom({ no, title, limitedUserCount, onlyAuthorized, owner, searchable, tagName, thumbnailUrl, room, keyword, participantCount, lastMessage }) {
    
    const [modalIsOpen, setModalIsOpen] = useState(false);


    const getTags = () => {
        
        if(tagName.length > 6) {
            return tagName.slice(0,6).map((tag, index)=> {
                return(
                    index < 5 ?
                    <Chip
                    key={index}
                    variant="outlined"
                    icon={<LocalOfferIcon />}
                    label={tag}/>
                    :
                    <Chip
                    key={index}
                    label={`외 ${tagName.length - 5}`}/>
                )
        })} else {

        return tagName.map((tag, index)=> {
                return(
                    <Chip
                    key={index}
                    variant="outlined"
                    icon={<LocalOfferIcon />}
                    label={tag}/>
                );
            })
        }
    }

    function timeForToday(lastMessage) {
        const today = new Date();
        const timeValue = new Date(lastMessage);

        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 365) {
            return `${betweenTimeDay}일전`;
        }

        return `${Math.floor(betweenTimeDay / 365)}년전`;
    }


    return (
        <div className={"ChatRoomButtonContainer"} onClick={ () => { setModalIsOpen(true) /*, check(`${no}`)*/} }>
            {/* <NavLink to={`/chat/${no}`}> */}
                <div className={"header"}>
                    <div className={"imageDiv"}>
                        {
                        thumbnailUrl?
                            <img className={"Img"} src={thumbnailUrl} alt="채팅방 섬네일"/>
                        :
                            <img className={"LogoImg"} src={Logo} alt="기본 채팅방 섬네일"/>
                        }
                    </div>
                    <span>{title}</span>
                </div>
                <div className={"RoomInfo"}>
                        <div className={"ParticipantCount"}>
                            <FaceIcon/><span>{participantCount}명</span>
                        </div>
                        <div>{timeForToday(lastMessage)}</div>
                        
                </div>
                <div className={"TagZone"}>
                    {getTags()}
                </div>
            <ReactModal
                className={"modal"}
                overlayClassName={"overlay"}
                isOpen={modalIsOpen}
                onRequestClose={ (e) => {e.stopPropagation();setModalIsOpen(false)}}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                contentLabel="채팅방">
                    <ChatRoomModalContent 
                        title={title}
                        thumbnailUrl={thumbnailUrl}
                        participantCount={participantCount}
                        limitedUserCount={limitedUserCount}
                        lastMessage={lastMessage}
                        tagName={tagName}
                        timeForToday={timeForToday}/>
            </ReactModal>
        </div>
    )
}

