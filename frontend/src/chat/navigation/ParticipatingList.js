import { Avatar, List, ListItem, ListItemText, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import '../../assets/sass/chat/ChatProfile.scss';
import '../../assets/sass/chat/modal.scss';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function ParticipatingList({room, favoriteRoom}) {

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
        <div className={"chatProfile"}>
            <List className={"container"}>
                <Button onClick={() => favoriteRoom(`${room.no}`)}><StarBorderIcon /></Button> // FIXME: 이름바꾸기
                <Link to ={`/chat/${room.no}`}>
                <ListItem button key={`${room.no}`} className={"roombutton"} >
                    <Avatar className={"item1"} alt="프로필 사진" src = {room.thumbnailUrl} />
                    <ListItemText className={"item2"} primary={room.title}></ListItemText>
                    <ListItemText className={"item3"} primary={"참여중: " + room.participantCount}></ListItemText>
                    <ListItemText className={"item4"} primary={timeForToday(room.lastMessage)}></ListItemText>
                    {/* { room.tagName.map((tag, index)=> {
                                    return(
                                        <Chip
                                        icon={<LocalOfferIcon />}
                                        variant="outlined"
                                        label={tag}
                                        />
                                    )}) 
                                } */}
                </ListItem>
                </Link>
            </List>
        </div>
    )
}
