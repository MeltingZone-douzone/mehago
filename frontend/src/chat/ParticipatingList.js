import { Avatar, List, ListItem, ListItemText, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import '../assets/sass/chat/ChatProfile.scss';
import '../assets/sass/chat/modal.scss';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

export default function ChattingRoom({
    key, no, title, limitedUserCount, onlyAuthorized, owner, searchable, tagName, thumbnailUrl, room, ketword, participantCount, lastMessage}) {

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
            <Link to ={`/chat/${no}`}>
            <List className={"container"}>
                <ListItem button key={`${no}`} className={"roombutton"} >
                    <Avatar className={"item1"} alt="프로필 사진" src = {thumbnailUrl} />
                    <ListItemText className={"item2"} primary={title}></ListItemText>
                    <ListItemText className={"item3"} primary={"참여중: " + participantCount}></ListItemText>
                    <ListItemText className={"item4"} primary={timeForToday(lastMessage)}></ListItemText>
                    {/* { tagName.map((tag, index)=> {
                                    return(
                                        <Chip
                                        icon={<LocalOfferIcon />}
                                        variant="outlined"
                                        label={tag}
                                        />
                                    )}) 
                                } */}
                </ListItem>
            </List>
            </Link>
        </div>
    )
}
