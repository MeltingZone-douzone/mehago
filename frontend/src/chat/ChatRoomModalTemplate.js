import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Avatar, ListItem, makeStyles, Chip } from '@material-ui/core';
import '../assets/sass/chat/modal.scss';
import Logo from '../assets/images/mehago.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import localStorage from "local-storage";

import ChatRoomModalBasic from './ChatRoomModalBasic';
import ChatRoomModalPassword from './ChatRoomModalPassword';
import ChatRoomModalNickname from './ChatRoomModalNickname';
import ChatRoomModalDisabled from './ChatRoomModalDisabled';
import { vaildatePassword, vaildateNickname, enterRoomValidationApi } from '../../api/ChatApi';
import { ValidationExp } from '../utils/ValidationExp';
export default function ChatRoomModalTemplate({ socket, no, title, thumbnailUrl, participantCount, limitedUserCount, timeForToday, lastMessage, tagName, ownerNickname, ownerThumbnailUrl, secretRoom, onlyAuthorized, account }) {
    const classes = materialStyles();
    const history = useHistory();

    // const [status, setStatus] = useState(() => participantCount >= limitedUserCount ? "isFull" : !account && onlyAuthorized ? "onlyAuthorized" : secretRoom ? "secret" : account ? "basic" : "nickname");
    const [status, setStatus] = useState(() => !account && onlyAuthorized ? "onlyAuthorized" : secretRoom ? "secret" : account ? "basic" : "nickname");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [hiddenPasswordInput, setHiddenPasswordInput] = useState(true);
    const [hiddenNicknameInput, setHiddenNicknameInput] = useState(true);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [wrongNickname, setWrongNickname] = useState(false);
    const [limitCountMsg, setLimitCountMsg] = useState(false);

    const getContent = () => {
        /* switch (status) { 
            case "secret": return <ChatRoomModalPassword handleChange={handleChange} account={account} password={password} wrongPassword={wrongPassword} basicEnterRoom={basicEnterRoom} passwordValidation={passwordValidation} hiddenPasswordInput={hiddenPasswordInput} status={status} handleKeyPress={handleKeyPress} limitCountMsg={limitCountMsg} />
            case "nickname": return <ChatRoomModalNickname nickname={nickname} handleChange={handleChange} nicknameValidation={nicknameValidation} wrongNickname={wrongNickname} hiddenNicknameInput={hiddenNicknameInput} basicEnterRoom={basicEnterRoom} handleKeyPress={handleKeyPress} limitCountMsg={limitCountMsg} />
            case "basic": return <ChatRoomModalBasic basicEnterRoom={basicEnterRoom} limitCountMsg={limitCountMsg} />
            case "onlyAuthorized": return <ChatRoomModalDisabled isFull={false} onlyAuthorized={true} />
            // case "isFull": return <ChatRoomModalDisabled isFull={true} onlyAuthorized={false} />
        } */
        return {
            secret: <ChatRoomModalPassword handleChange={handleChange} account={account} password={password} wrongPassword={wrongPassword} basicEnterRoom={basicEnterRoom} passwordValidation={passwordValidation} hiddenPasswordInput={hiddenPasswordInput} status={status} handleKeyPress={handleKeyPress} limitCountMsg={limitCountMsg} />,
            nickname: <ChatRoomModalNickname nickname={nickname} handleChange={handleChange} nicknameValidation={nicknameValidation} wrongNickname={wrongNickname} hiddenNicknameInput={hiddenNicknameInput} basicEnterRoom={basicEnterRoom} handleKeyPress={handleKeyPress} limitCountMsg={limitCountMsg} />,
            basic: <ChatRoomModalBasic basicEnterRoom={basicEnterRoom} limitCountMsg={limitCountMsg} />,
            onlyAuthorized: <ChatRoomModalDisabled isFull={false} onlyAuthorized={true} />
            // case "isFull": return <ChatRoomModalDisabled isFull={true} onlyAuthorized={false} />
        }[status]
    }
    // return { 
    //     secret :  <ChatRoomModalPassword handleChange={handleChange} account={account} password={password} wrongPassword={wrongPassword} basicEnterRoom={basicEnterRoom} passwordValidation={passwordValidation} hiddenPasswordInput={hiddenPasswordInput} status={status} handleKeyPress={handleKeyPress} limitCountMsg={limitCountMsg} />,
    //     nickname:  <ChatRoomModalNickname nickname={nickname} handleChange={handleChange} nicknameValidation={nicknameValidation} wrongNickname={wrongNickname} hiddenNicknameInput={hiddenNicknameInput} basicEnterRoom={basicEnterRoom}  handleKeyPress={handleKeyPress} limitCountMsg={limitCountMsg}/>,
    //     basic:  <ChatRoomModalBasic basicEnterRoom={basicEnterRoom} limitCountMsg={limitCountMsg}/>,
    //     onlyAuthorized:  <ChatRoomModalDisabled isFull={false} onlyAuthorized={true} />
    //     // case "isFull": return <ChatRoomModalDisabled isFull={true} onlyAuthorized={false} />
    // }[status]

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "password": setPassword(value);
                break;
            case "nickname": setNickname(value);
                break;
        }
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            switch (status) {
                case 'secret': hiddenPasswordInput ? basicEnterRoom() : passwordValidation();
                    break;
                case 'nickname': hiddenNicknameInput ? basicEnterRoom() : nicknameValidation();
                    break;
            }
            return;
        }
    }

    const basicEnterRoom = () => {
        try {
            enterRoomValidationApi(no).then(res => {
                if (res.data.result === 'success') { // 새입장
                    if (participantCount >= limitedUserCount) {
                        setLimitCountMsg(true);
                        return;
                    }
                    if (res.data.data === 'noNickname') {  // 비회원이고 닉네임이 없는경우 닉네임 필드를 보여줌
                        return setHiddenNicknameInput(false);
                    }
                    switch (status) {
                        case 'secret': setHiddenPasswordInput(false); break;
                        case 'nickname': setHiddenNicknameInput(false); break;
                        default: { enterRoom(); } break;
                    }
                } else {
                    enterRoom();
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    const passwordValidation = () => {
        if (password === '') {
            return;
        }
        try {
            vaildatePassword(no, password).then((res) => {
                if (res.data == true) {
                    enterRoom();
                } else {
                    setPassword("");
                    setWrongPassword(true);
                    return;
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    const nicknameValidation = () => {
        try {
            if (ValidationExp.nicknameExp.test(nickname)) {
                vaildateNickname(no, nickname).then((res) => {
                    if (res.data.result === "success") {
                        socket.emit('leave:chat-room', res.data.data.chatRoomNo, res.data.data.participantNo, res.data.data.nickname);
                        localStorage.set("token", res.data.data.token);
                        enterRoom();
                    } else {
                        setWrongNickname(true);
                        return;
                    }
                })
            } else {
                setWrongNickname(true);
            }
        } catch (err) {
            console.log(err);
        }
    }


    const enterRoom = () => {
        history.push(`/chat/${no}`);
    }

    return (
        <ModalTemplate>
            <ModalHeader url={thumbnailUrl}>
                <Avatar className={classes.large} alt="프로필 사진" src={ownerThumbnailUrl} />
                <InfoArea>
                    <OwnerNickname><FontAwesomeIcon icon={faCrown} color={'#F6C328'} size={'1x'} /><span>{ownerNickname}</span></OwnerNickname>
                    <span style={{ marginBottom: 10 }}>오픈 채팅</span>
                    <h1>{title}</h1>
                    <span>{"참여중: " + participantCount + "/" + limitedUserCount}</span>
                    <span>{timeForToday(lastMessage)}</span>
                </InfoArea>
            </ModalHeader>
            <div className={"tagsContainer"}>
                {tagName != "" && <ListItem className={"tag"}>
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
                </ListItem>}
            </div>
            <ContentWrapper>
                {getContent()}
            </ContentWrapper>
        </ModalTemplate>
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

const ModalTemplate = styled.div`
    display: flex;
    flex-direction: column;
`

const ModalHeader = styled.div`
    min-height: 350px;
    background-color: rgb(230 230 230);
    background-image: ${({ url }) => url ? `url(${url})` : `url(${Logo})`};
    background-repeat : no-repeat;
    background-size : ${({ url }) => url ? `cover` : `contain`};

`

const InfoArea = styled.div`
    width:100%;
    background-color: #00000040;
    color:white;
    padding: 2em 0;
    
    text-align:start;

    h1 {
        margin-left: 1rem;
        font-size: 2.2rem;
        margin-bottom: 30px;
        padding-top: 0.3em;
        overflow-wrap: break-word;
        padding-right: 0.5em;
    }

    span {
        margin-left: 1rem;
    }
    span+span {
        margin-left:20px;
    }
`

const ContentWrapper = styled.div`
    padding: 10px;
`

const OwnerNickname = styled.div`
    margin-left: 1rem;
    display:flex;
    font-size: 1.2rem;
    margin-bottom: 20px;

    span {
        margin-left: 10px;
    }
`