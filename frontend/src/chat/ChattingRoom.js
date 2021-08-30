import { Avatar, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/sass/chat/ChatProfile.scss';

export default function ChattingRoom({
                                        key, 
                                        no, 
                                        title, 
                                        limitedUserCount, 
                                        onlyAuthorized, 
                                        owner, 
                                        searchable, 
                                        secretRoom, 
                                        tagName, 
                                        thumbnailUrl,
                                        room,
                                        ketword}){
    
    return(
        
        <div className={styles.chatProfile}>
            <Link to="/chat/c1">
                <List className={styles.container}>
                    <ListItem button key="RemySharp" className={styles.roombutton}>
                        <Avatar className={styles.item1} alt="프로필 사진" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        <ListItemText className={styles.item2} primary={title}></ListItemText>
                        <ListItemText className={styles.item3} primary="참여자 수"></ListItemText>
                        <ListItemText className={styles.item4} primary="마지막 보낸 시간"></ListItemText>
                        <ListItemText className={styles.item5} primary="#태그 #태그 #태그 #태그 #태그 #태그 #태그 #태그 #태그 #태그 #태그 #태그"></ListItemText>
                    </ListItem>
                </List>
            </Link>
        </div>
    )
}