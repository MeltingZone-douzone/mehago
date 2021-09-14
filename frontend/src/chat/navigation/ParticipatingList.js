import { List, ListItem, makeStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import '../../assets/sass/chat/ChatProfile.scss';
import '../../assets/sass/chat/modal.scss';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';

import styled from 'styled-components';
import defaultImage from "../../assets/images/black-mehago.png";

export default function ParticipantingList({ room, updateFavoriteRoom, exitRoom, setFavoriteCheck}) {
    const classes = madeStyles();

    // console.log(room);

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
    
    const updateFavoriteCheck = () => {

    }
    // console.log(typeof(room.favoriteRoom)); // fa fa tr tr        string
    // console.log(room.favoriteRoom === "true");
    return (
        <div className={"chatProfile"}>
            <List className={"container"}>
                {/* <Button onClick={() => updateFavoriteRoom(room.no)}> */}
                <Button onClick={() => {
                        setFavoriteCheck(room.favoriteRoom === "true" ? "false" : "true")
                        updateFavoriteRoom(room.no, room.favoriteRoom)
                    }}>
                    {
                        room.favoriteRoom === "true" ? 
                        <StarRateRoundedIcon style={{color: '#f4e02d'}}/>
                        :
                        <StarRateRoundedIcon style={{color: '#c0c0c0'}}/>
                    }
                </Button>
                <Button onClick={() => exitRoom(room.no)}><ExitToAppRoundedIcon /></Button>
                <Link to={`/chat/${room.no}`}>
                <ListItem button key={`${room.no}`} className={classes.roomContainer} >
                    <ChattingRoomImage>
                        <img className={room.thumbnailUrl ? classes.thumbnail : classes.defaultImage} src={room.thumbnailUrl ? room.thumbnailUrl : defaultImage} alt={`${room.title}의 이미지`} />
                    </ChattingRoomImage>
                    <ChattingRoomContent>
                        <div className={classes.content}>
                            <span className={classes.title} > {room.title} </span>
                            <span className={classes.participantCount}>{room.participantCount === 1 ? ' ' : room.participantCount}</span>
                            <span className={classes.leastMessageAt}>{timeForToday(room.leastMessageAt)}</span>
                        </div>
                        <div className={classes.content}>
                            <span className={classes.leastMessage}>{room.leastMessage ? room.leastMessage : ' '}</span> <span>{room.notReadCount === 0 ? ' ' : room.notReadCount}</span>
                        </div>
                    </ChattingRoomContent>
                </ListItem>
                </Link>
            </List>
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
    },
    participantCount: {
        fontSize: "0.7em",
    },
    leastMessageAt: {
        float: "right",
        marginRight: " 10px",
        fontSize: "0.8em",
    },
    leastMessage: {
        fontSize: "0.9em",
    }
})