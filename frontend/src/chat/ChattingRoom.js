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
import { isExistsPasswords, checkPassword, nicknameValidation } from '../../api/ChatApi';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
ReactModal.setAppElement('body');

export default function ChattingRoom({
    key, no, title, limitedUserCount, onlyAuthorized, owner, searchable, tagName, thumbnailUrl, room, ketword, participantCount, lastMessage, history }) {
    const classes = materialStyles();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [nicknameModalOpen, setNicknameModalOpen] = useState(false);
    const [isExistsPassword, setIsExistsPassword] = useState(false);
    const [password, setPassword] = useState({password:""});
    const [account, setAccount] = useState(true);
    const [joinValidationRoom , setJoinValidationRoom] = useState(true);
    const [nickname, setNickname ] = useState({nickname:""})
    const [validateNickname, setValidateNickname] = useState(""); // 비회원 닉네임 validation  validateNicknameMsg 같이 이름 고치기

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

    const joinValidation = (no) => { // password check
        console.log(password);   // account 처리 해야함
        try {
            if (password !== "") (
                checkPassword(no, password).then((res) => {
                    console.log(res.data);
                    setPassword({ password: "" });
                    setJoinValidationRoom(res.data);
                })
            )
        } catch (err) {
            console.log(err);
        }

    }
    const checkNickname = (no) => {
        console.log(nickname, no);
        try {
            nicknameValidation(no, nickname).then((res) => {
                // console.log(res.data);
                setValidateNickname(res.data);
                setNickname({ nickname: "" });
            })
        } catch (err) {
            console.log(err);
        }
    }

    // function checkJoin(){
    //     if(account === false && joinValidationRoom === "비밀번호가 틀렸습니다."){
    //         joinValidation(`${no}`)
    //     } else if(account === false && joinValidationRoom === true){
    //         joinValidation(`${no}`) ,setModalIsOpen(false), setNicknameModalOpen(true)
    //     } else if(account === true && joinValidationRoom === true){
    //         joinValidation(`${no}`) 
    //     } else if(account === true && joinValidationRoom === "비밀번호가 틀렸습니다."){
    //         joinValidation(`${no}`)
    //     }
    // }

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
                <ListItem button key={`${no}`} className={"roombutton"} onClick={() => { setModalIsOpen(true), check(`${no}`) }}>
                    <Avatar className={"item1"} alt="프로필 사진" src={thumbnailUrl} />
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
                <Modal
                    className={"modal"}
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    shouldCloseOnOverlayClick={true}
                    contentLabel="채팅방">
                    <div className={"top"}>
                        <Button className={classes.closed} variant="contained" onClick={() => setModalIsOpen(false)}><CancelPresentationIcon /></Button>
                        <Avatar className={classes.large} alt="프로필 사진" src={thumbnailUrl} />
                    </div>
                    <ListItem className={"container"}>
                        <ListItemText classes={{ primary: classes.titleText }} primary={title}></ListItemText>
                        <ListItemText classes={{ primary: classes.particpant }} primary={"참여중: " + participantCount + "/" + limitedUserCount + "\t" + timeForToday(lastMessage)}></ListItemText>
                        {tagName != "" ? <ListItem className={"tag"}>
                            {tagName.map((tag, index) => {
                                return (
                                    <Chip
                                        key={index}
                                        icon={<LocalOfferIcon />}
                                        variant="outlined"
                                        label={tag}
                                    />
                                )
                            })
                            }
                        </ListItem> : null}

                    </ListItem>
                    {
                        isExistsPassword ?
                            <ListItemText>
                                <TextField
                                    className={"isExistsPassword"}
                                    label="비공개 방입니다."
                                    value={password.password}
                                    type="password"
                                    onChange={(e) => { setPassword(e.target.value) }} >
                                </TextField>
                            </ListItemText>
                            : 
                            null
                    }
                    {
                        joinValidationRoom ? <p>{joinValidationRoom}</p> : null
                    }
                    {
                        account ?
                        <Link to={`/chat/${no}`}>
                            <Button className={"joinButton"} onClick ={() => {joinValidation(no) }} variant="contained" color="primary" disableElevation>방입장하기</Button>
                        </Link>
                        :
                        <Button className={"joinButton"} onClick ={() => {joinValidation(no), setModalIsOpen(false), setNicknameModalOpen(true) }}  variant="contained" color="primary" disableElevation>방입장하기</Button>
                    }
                </Modal>
                {/* 비회원 입장시 */}
                <Modal
                    className={"modal"}
                    isOpen={nicknameModalOpen}
                    onRequestClose={() => setNicknameModalOpen(false)}
                    shouldCloseOnOverlayClick={true}
                    contentLabel="채팅방">
                    <div className={"top"}>
                        <Button className={classes.closed} variant="contained" onClick={() => setNicknameModalOpen(false)}><CancelPresentationIcon /></Button>
                        <Avatar className={classes.large} alt="프로필 사진" src={thumbnailUrl} />
                    </div>
                    <ListItemText>
                        <h1>사용할 닉네임을 설정해 주세요.</h1>
                        <TextField
                            label="닉네임"
                            value={nickname.nickname}
                            onChange={(e) => { setNickname(e.target.value) }}
                        >
                        </TextField>
                        {
                            validateNickname ? <p>{validateNickname}</p> : <p>{validateNickname}</p>
                        }

                    </ListItemText>
                    {/* { checkJoin() } */}
                    {
                        validateNickname ?
                            <Link to={`/chat/${no}`}>
                                <Button className={"joinButton"} onClick={() => { checkNickname(no) }} variant="contained" color="primary" disableElevation>방입장하기</Button>
                            </Link>
                            :
                            <div>
                                <p>{validateNickname}</p>
                                <Button className={"joinButton"} onClick={() => { checkNickname(no) }} variant="contained" color="primary" disableElevation>방입장하기</Button>
                            </div>
                    }

                </Modal>
            </List>
        </div>
    )
}

const materialStyles = makeStyles((theme) => ({

    titleText: {
        fontSize: '2rem',
        fontFamily: 'Gill Sans, sans-serif'
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    closed: {
        minWidth: "20px",
        height: "20px",
        position: "absolute",
        right: "0.8rem",
        top: "0.8rem",
        cursor: "pointer",
        background: "none",
        padding: "0"
    },
    particpant: {
        fontSize: '0.8rem'
    }

}));
