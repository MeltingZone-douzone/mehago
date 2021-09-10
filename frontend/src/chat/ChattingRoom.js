import { Avatar, List, ListItem, ListItemIcon, ListItemText, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from "react-modal";
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import ReactModal from "react-modal";
import '../assets/sass/chat/ChatProfile.scss';
import '../assets/sass/chat/modal.scss';
import {isExistsPasswords, checkPassword} from '../../api/ChatApi';
import FaceIcon from '@material-ui/icons/Face';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
ReactModal.setAppElement('body'); 

export default function ChattingRoom({
    key, no, title, limitedUserCount, onlyAuthorized, owner, searchable, tagName, thumbnailUrl, room, ketword, participantCount, lastMessage, history}) {
    const classes = materialStyles();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isExistsPassword, setIsExistsPassword] = useState(false);
    const [password, setPassword] = useState({password:""});
    const [account, setAccount] = useState(true);
    const [joinValidationRoom , setJoinValidationRoom] = useState("");

    const tagNames = () => {
        var tagNames = [];
        for (var i = 0; i < tagName.length; i++) {
            tagNames[i] = "#" + tagName[i];
        }
        return tagNames.join(' ');// TODO: 태그클릭
    }

    const check = (no) => {
        try {
            isExistsPasswords(no).then((res) => {
                // console.log(res.data.account);
                setIsExistsPassword(res.data.isExistsPassword);
                setAccount(res.data.account);
            });
        } catch (err) {
            console.error(err);
        }
    }

    const joinValidation = (no) => {
        console.log(no);   // account 처리 해야함
        try {
            if(password != "")(
                checkPassword(no, password).then((res) => {
                    console.log(res.data);
                    setPassword({password:""});
                    setJoinValidationRoom(res.data);
                })
            )
        } catch (err) {
            console.log(err);
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
        <div className={"chatProfile"}>
            <List className={"container"}>
                <ListItem button key={`${no}`} className={"roombutton"}  onClick={ () => {setModalIsOpen(true) , check(`${no}`)} }>
                    <Avatar className={"item1"} alt="프로필 사진" imgProps={thumbnailUrl} />
                    <img src = {thumbnailUrl}></img>
                    <ListItemText className={"item2"} primary={title}></ListItemText>
                    <ListItemText className={"item3"} primary={"참여중: " + participantCount}></ListItemText>
                    <ListItemText className={"item4"} primary={timeForToday(lastMessage)}></ListItemText>
                    <ListItemText className={"item5"} primary={tagNames()}></ListItemText>
                </ListItem>
                <Modal 
                    className={"modal"}
                    isOpen={modalIsOpen}
                    onRequestClose={ () => setModalIsOpen(false) }
                    shouldCloseOnOverlayClick={ true }
                    contentLabel="채팅방">
                        <div className={"top"}>
                            <Button className={classes.closed} variant="contained" onClick={ () => setModalIsOpen(false) }><CancelPresentationIcon /></Button>
                            <Avatar className={classes.large} alt="프로필 사진" imgProps={thumbnailUrl} />
                        </div>
                        <ListItem className={"container"}>
                            <ListItemText classes={{primary:classes.titleText}} primary={title}></ListItemText>
                            <ListItemText classes={{primary:classes.particpant}} primary={"참여중: " + participantCount + "/" + limitedUserCount + "\t" + timeForToday(lastMessage)}></ListItemText>
                            {tagName!=""?<ListItem className={"tag"}>
                                { tagName.map((tag, index)=> {
                                    return(
                                        <Chip
                                        icon={<FaceIcon />}
                                        variant="outlined"
                                        label={tag}
                                        />
                                    )}) 
                                }
                            </ListItem>:null}
                            
                        </ListItem>
                        {
                            isExistsPassword ? 
                            <ListItemText>
                                <TextField 
                                    className={"isExistsPassword"}
                                    label="비공개 방입니다."
                                    value={password.password}
                                    onChange = {(e) => { setPassword(e.target.value)}} >
                                </TextField>
                            </ListItemText>
                            : null
                            
                        }
                        {
                            joinValidationRoom ? <p>{joinValidationRoom}</p> : null
                        }
                        <Button className={"joinButton"} onClick ={() => {joinValidation(`${no}`)}} variant="contained" color="primary" disableElevation>방입장하기</Button>
                </Modal>
            </List>
        </div>
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
