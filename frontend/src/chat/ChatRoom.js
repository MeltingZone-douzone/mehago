import { Chip, makeStyles } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import React, { useState } from 'react';
import ReactModal from "react-modal";
import Logo from '../assets/images/black-mehago.png';
import '../assets/sass/chat/ChatRoomButton.scss';
import '../assets/sass/chat/modal.scss';
import ChatRoomModalTemplate from './ChatRoomModalTemplate';

ReactModal.setAppElement('body');


export default function ChatRoom({ socket, userInfo, no, title, limitedUserCount, onlyAuthorized, owner, searchable, tagName, thumbnailUrl, room, keyword, participantCount, secretRoom, lastMessage, ownerNickname, ownerThumbnailUrl }) {
    const classes = madeStyle();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const getTags = () => {
        if (tagName && tagName.length > 6) {
            return tagName.slice(0, 6).map((tag, index) => {
                return (
                    index < 5 ?
                        <Chip
                            key={index}
                            variant="outlined"
                            icon={<LocalOfferIcon />}
                            label={tag} />
                        :
                        <Chip
                            key={index}
                            label={`외 ${tagName.length - 5}`} />
                )
            })
        } else {
            return tagName && tagName.map((tag, index) => {
                return (
                    <Chip
                        key={index}
                        variant="outlined"
                        icon={<LocalOfferIcon />}
                        label={tag} />
                );
            })
        }
        }
    

    function timeForToday(lastMessage) {
        const today = new Date();
        const timeValue = new Date(lastMessage);

        if (lastMessage == null) return "대화 없음";

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
        <div className={"ChatRoomButtonContainer"} onClick={() => { setModalIsOpen(true) /*, check(`${no}`)*/ }}>
            {/* <NavLink to={`/chat/${no}`}> */}
            <div className={"header"}>
                <div className={"imageDiv"}>
                    {
                        thumbnailUrl ?
                            <img className={"Img"} src={thumbnailUrl} alt="채팅방 섬네일" />
                            :
                            <img className={"LogoImg"} src={Logo} alt="기본 채팅방 섬네일" />
                    }
                </div>
                <span>{title}</span>
            </div>
            <div className={"RoomInfo"}>
                <div className={"ParticipantCount"}>
                    <FaceIcon /><span>{participantCount}명</span>
                </div>
                <div>{timeForToday(lastMessage)}</div>

            </div>
            <div className={"TagZone"}>
                { tagName.length !== 0 ?
                    getTags()
                    : <p className={classes.noTag}> 태그 없음 </p>
                }
            </div>
            <ReactModal
                className={"modal"}
                overlayClassName={"overlay"}
                isOpen={modalIsOpen}
                onRequestClose={(e) => { e.stopPropagation(); setModalIsOpen(false) }}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                contentLabel="채팅방">
                <ChatRoomModalTemplate
                    socket={socket}
                    no={no}
                    title={title}
                    thumbnailUrl={thumbnailUrl}
                    participantCount={participantCount}
                    limitedUserCount={limitedUserCount}
                    lastMessage={lastMessage}
                    tagName={tagName}
                    timeForToday={timeForToday}
                    secretRoom={secretRoom}
                    onlyAuthorized={onlyAuthorized}
                    account={userInfo ? true : false}
                    ownerThumbnailUrl={ownerThumbnailUrl}
                    ownerNickname={ownerNickname} />
            </ReactModal>
        </div>
    )
}

const madeStyle = makeStyles({
    noTag: {
        color: '#616161',
        padding: '1em'
    }
}) 