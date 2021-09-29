import React, { useEffect } from 'react';
import Logo from '../../assets/images/black-mehago.png';
import chattingPage from '../../assets/images/mehago-chat.png';
import "../../assets/sass/account/AccountPage.scss";
import localStorage from "local-storage";
import { Link } from 'react-router-dom';
import { Avatar, makeStyles, Button } from '@material-ui/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAltSlash, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import Thumbnail from '../../components/Thumbnail';


export default function HomePage({ authentication, userInfo, handleAuthentication, history, setUserInfo }) {
    const classes = madeStyles();

    function handleLogout() {
        handleAuthentication(false);
        setUserInfo({ nickname: "", name: "", phoneNumber: "", thumbnailUrl: "" });
        localStorage.remove("token");
        history.push("/account/login");
    }

    function chatting() {
        history.push("/chat");
    }

    function loginPage() {
        history.push("/account/login");
    }

    return (
        <div className={"PageContainer"}>
            <div className={"Page"}>
                <img src={Logo} alt={"logo"} className={"logo"} />
                <div className={"home"}>
                    {
                        (userInfo && userInfo.name !== "") ? (
                            <div className={"homePage"}>
                                <span className={"selectAcount"} ></span>
                                <div className={"thumbnailUrl"}>
                                    <Thumbnail thumbnailUrl={userInfo.thumbnailUrl} nickname={userInfo.nickname} />
                                </div>
                                <div className={"container"}>
                                    <button className={"accountButton"} onClick={(e) => { chatting(e) }}>
                                        <Avatar className={classes.logoImg} alt="프로필 사진" src={userInfo.thumbnailUrl} />
                                        <div className={"userInfo"}>
                                            <p className={"nickname"}>{userInfo.nickname}</p>
                                            <p>{userInfo.email}</p>
                                        </div>
                                        <span>계속하기</span>
                                    </button>
                                    <button className={"accountButton"} onClick={(e) =>{handleLogout(e)}} >
                                        <FontAwesomeIcon icon={faUserCircle} className="search" size={'2x'} />
                                        <p>다른 계정 사용하기</p>
                                    </button>

                                </div >
                            </div>

                        ) : (
                            <div className={"homePage"}>
                                <span className={"selectAcount"} >지금 당장 MEHAGO를 사용해 보세요</span>
                                <img src={chattingPage} className={"nonMemberLogo"} alt={"logo"} />
                                <div className={"container"}>
                                    <button className={"loginPageButton"} onClick={(e) => { loginPage(e) }} >
                                        <FontAwesomeIcon icon={faUserCircle} className="search" size={'2x'} />
                                        <p>로그인 페이지로 이동</p>
                                    </button>
                                </div >
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

const madeStyles = makeStyles({
    logoImg: {
        display: "flex",
        alignSelf: "center"

    }
});

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