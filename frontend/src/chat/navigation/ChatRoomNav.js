import { Avatar, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/sass/chat/ChatProfile.scss';

export default function ChattingRoom({ no, title, limitedUserCount, onlyAuthorized, owner, searchable, tagName, thumbnailUrl, room, ketword }) {

    const tagNames = () => {
        var tagNames = [];
        for (var i = 0; i < tagName.length; i++) {
            tagNames[i] = "#" + tagName[i];
        }
        return tagNames.join(' ');// TODO: 태그클릭
    }

    return (
        <div className={"chatProfile"}>
            <NavLink to={`/chat/${no}`}>
                <div className={"container"}>
                    <ListItem button key={`${no}`} className={"roombutton"}>
                        <Avatar className={"item1"} alt="프로필 사진" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        <ListItemText className={"item2"} primary={title}></ListItemText>
                        <ListItemText className={"item3"} primary="참여자 수"></ListItemText>
                        <ListItemText className={"item4"} primary="마지막 보낸 시간"></ListItemText>
                        <ListItemText className={"item5"} primary={tagNames()}></ListItemText>
                    </ListItem>
                </div>
            </NavLink>
        </div>
    )
}