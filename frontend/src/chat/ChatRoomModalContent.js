import React from 'react';
import styled from 'styled-components';
import { Avatar, Button, ListItem, ListItemText, makeStyles,Chip } from '@material-ui/core';
import '../assets/sass/chat/modal.scss';

import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
export default function ChatRoomModalContent ({title, thumbnailUrl, participantCount, limitedUserCount,timeForToday, lastMessage,tagName }) {
    const classes = materialStyles();
    return(
        <ModalTemplate>
            <div className={"top"}>
                            <Button className={classes.closed} variant="contained" onClick={ () => setModalIsOpen(false) }><CancelPresentationIcon /></Button>
                            <Avatar className={classes.large} alt="프로필 사진"  />
                        </div>
                        <ListItem className={"container"}>
                            <ListItemText classes={{primary:classes.titleText}} primary={title}></ListItemText>
                            <ListItemText classes={{primary:classes.particpant}} primary={"참여중: " + participantCount + "/" + limitedUserCount + "\t" + timeForToday(lastMessage)}></ListItemText>
                            {tagName!=""?<ListItem className={"tag"}>
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
                            </ListItem>:null}
                            
                        </ListItem>
        </ModalTemplate>
    )
}

const materialStyles = makeStyles((theme) => ({
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

const ModalTemplate = styled.div`

`