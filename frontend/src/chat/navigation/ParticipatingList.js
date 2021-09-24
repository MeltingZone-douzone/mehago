import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import Modal from "react-modal";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import defaultImage from "../../assets/images/black-mehago.png";
import '../../assets/sass/chat/ChatProfile.scss';
import '../../assets/sass/chat/modal.scss';


Modal.setAppElement('body');

export default function ParticipatingList({ socket, room, updateFavoriteRoom, exitRoom, setFavoriteCheck, handleReceivedMsg }) {
    const classes = madeStyles();

    useEffect(() => {
        socket.on(`chat:message:room${room.no}`, (msg) => {
            handleReceivedMsg(msg);
        })
    }, [])

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function timeForToday(leastMessageAt) {
        const today = new Date();
        const timeValue = new Date(leastMessageAt);

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
        if (betweenTimeDay < 2) {
            return `${betweenTimeDay}일전`;
        }
        const getMonth = `${timeValue.getMonth() + 1 > 9 ? timeValue.getMonth() + 1 : '0' + (timeValue.getMonth() + 1)}`
        const getDate = `${timeValue.getDate() > 9 ? timeValue.getDate() : '0' + timeValue.getDate()}`;
        const result = `${timeValue.getFullYear()}-${getMonth}-${getDate}`
        return result;
    }

    return (
        <div className={"chatProfile"}>
            <List className={"container"}>
                {/* <Button onClick={() => updateFavoriteRoom(room.no)}> */}
                <div className={"profileHeader"}>
                    <Button
                        className={classes.favoriteButton}
                        onClick={() => {
                            setFavoriteCheck(room.favoriteRoom ? false : true)
                            updateFavoriteRoom(room.no, room.favoriteRoom)
                        }}>
                        {
                            room.favoriteRoom ?
                                <StarRateRoundedIcon style={{ color: '#f4e02d' }} />
                                :
                                <StarRateRoundedIcon style={{ color: '#c0c0c0' }} />
                        }
                    </Button>
                    <Button className={classes.exitRoom} onClick={() => setModalIsOpen(true)}><ExitToAppRoundedIcon /></Button>
                </div>
                <Link to={`/chat/${room.no}`}>
                    <ListItem button key={`${room.no}`} className={classes.roomContainer} >
                        <ChattingRoomImage>
                            <img className={room.thumbnailUrl ? classes.thumbnail : classes.defaultImage} src={room.thumbnailUrl ? room.thumbnailUrl : defaultImage} alt={`${room.title}의 이미지`} />
                        </ChattingRoomImage>
                        <ChattingRoomContent>
                            <div className={classes.content}>
                                <div className={classes.title} > {room.title} </div>
                                <div className={classes.participantCount}>{room.participantCount === 1 ? ' ' : room.participantCount}</div>
                                <div className={classes.leastMessageAt}>{timeForToday(room.leastMessageAt)}</div>
                            </div>
                            <div className={classes.content}>
                                <div className={classes.leastMessage}>{room.leastMessage ? room.leastMessage : '새로운 채팅방입니다.'}</div> <div className={classes.notReadCount}>{room.notReadCount === 0 ? ' ' : room.notReadCount}</div>
                            </div>
                        </ChattingRoomContent>
                    </ListItem>
                </Link>
            </List>
            <Modal
                className={"modal"}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                shouldCloseOnOverlayClick={true}
                contentLabel="채팅방 나가기">
                <div className={"top"}>
                    <Button variant="contained" onClick={() => setModalIsOpen(false)}>x</Button>
                </div>
                <ListItemText align="center" primary={`[${room.title}] 채팅방에서 나가시겠습니까?`} secondary={'나가면 바보'} />
                <Button onClick={() => { setModalIsOpen(false) }} variant="contained" color="primary" disableElevation>취소</Button>
                <Button onClick={() => { exitRoom(room.no); setModalIsOpen(false); }} variant="contained" color="primary" disableElevation>확인</Button>
            </Modal>
        </div >
    )
}


const ChattingRoomImage = styled.div`
    width: 60px;
    height: 50px;

    overflow:hidden;

    border: 1px solid #ccc;
    border-color: rgba(0,0,0,.2);
    border-radius:20px;
`
const ChattingRoomContent = styled.div`
   margin-left:10px;
   display: flex;
   flex-direction: column;
   width:100%;
   color: #000000;
`


const madeStyles = makeStyles({
    roomContainer: {
        padding: "5px",
    },
    content: {
        width: "100%",
        height: "50%",
        margin: "5px 0",
    },
    thumbnail: {
        width: "50px",
        height: "50px",
    },
    defaultImage: {
        width: "inherit",
        marginTop: "20px",
    },
    title: {
        fontWeight: "bolder",
        maxWidth: "140px",
        float: "left",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    },
    participantCount: {
        fontSize: "0.7em",
        marginTop: "inherit",
        float: "left",
        paddingLeft: "1em"
    },
    leastMessageAt: {
        float: "right",
        marginRight: " 10px",
        fontSize: "0.8em"
    },
    leastMessage: {
        fontSize: "0.9em",
        float: "left",
        maxWidth: "200px",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap"
    },
    notReadCount: {
        float: "right"
    },
    favoriteButton: {
        minHeight: "2px",
        minWidth: "2px",
        padding: 0,
        paddingLeft: "2px"
    },
    exitRoom: {
        minHeight: "0.5px",
        float: "right",
        minWidth: "1px",
        padding: 0,
        paddingRight: "5px"
    }
})