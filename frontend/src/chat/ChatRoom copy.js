import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/sass/chat/ChatRoomButton.scss';
import { Avatar, ButtonBase, ListItem, ListItemText, Chip, makeStyles, Card, CardActionArea, CardMedia, Typography } from '@material-ui/core';
import Logo from '../assets/images/black-mehago.png';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

import ReactModal from "react-modal";
ReactModal.setAppElement('body');

import {isExistsPasswords, checkPassword, nicknameValidation} from '../../api/ChatApi';

export default function ChatRoom({ no, title, limitedUserCount, onlyAuthorized, owner, searchable, tagName, thumbnailUrl, room, keyword, participantCount, lastMessage }) {
    const classes = materialStyles();
    const tagNames = () => {
        var tagNames = [];
        for (var i = 0; i < tagName.length; i++) {
            tagNames[i] = "#" + tagName[i];
        }
        return tagNames.join(' ');// TODO: 태그클릭
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
        <div className={"ChatRoomButtonContainer"}>
            <NavLink to={`/chat/${no}`}>
                <Card className={classes.cardStyle}>
                    <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="채팅방 사진"
                        height="10%"
                        image={thumbnailUrl? thumbnailUrl : Logo}
                        title="채팅방 사진"
                    />
                    <Typography className={classes.cardTitle} gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography className={classes.cardTitle} gutterBottom variant="h5" component="h2">
                        참여중 : {participantCount}
                    </Typography>

                    
                    { tagName.map((tag, index)=> {
                                    return(
                                        <Chip
                                        key={index}
                                        icon={<LocalOfferIcon />}
                                        variant="outlined"
                                        label={tag}
                                        />
                                    )}) 
                    }
                    </CardActionArea>
                </Card>
            </NavLink>
        </div>
    )
}

const materialStyles = makeStyles((theme) => ({
    cardStyle: {
        width:"100%",
        height: "auto"
    },

    cardTitle: {
        textAlign:"center"
    },

    titleText:{
        fontSize:'2rem',
        fontFamily:'Gill Sans, sans-serif'
      },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    closed : {
        minWidth:"20px",
        height:"20px",
        position: "absolute",
        right: "0.8rem",
        top :  "0.8rem",
        cursor : "pointer",
        background: "none",
        padding:"0"
    },
    particpant :{
        fontSize:'0.8rem'
    }
      
}));