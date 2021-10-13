import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, makeStyles } from '@material-ui/core';
import localStorage from "local-storage";
import React from 'react';
import styled from 'styled-components';
import Logo from '../../assets/images/black-mehago.png';
import chattingPage from '../../assets/images/mehago-chat.png';
import "../../assets/sass/account/AccountPage.scss";
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
        <PageContainer>
            <div className={"Page"}>
                <img src={Logo} alt={"logo"} className={"logo"} />
                <div className={"home"}>
                        {
                            (userInfo && userInfo.name !== "")?(
                            <div className={"homePage"}>
                                <span className={"selectAcount"} ></span>
                                <ChattingRoomImage>
                                    <Thumbnail thumbnailUrl={userInfo.thumbnailUrl} nickname={userInfo.nickname} />
                                </ChattingRoomImage>
                                <div className={"container"}>
                                    <button className={"accountButton"} onClick={(e) => { chatting(e) }}>
                                        <Avatar className={classes.logoImg} alt="프로필 사진" src={userInfo.thumbnailUrl} />
                                        <div className={"userInfo"}>
                                            <p className={"account"}>{userInfo.nickname}</p>
                                            <p className={"account"}>{userInfo.email}</p>
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
        </PageContainer>
    )
}

const madeStyles = makeStyles({
    logoImg: {
        display: "flex",
        alignSelf: "center"

    }
});

const ChattingRoomImage = styled.div`
    width: 200px;
    

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


const PageContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 100vw;
    height: 93vh;

    @media only screen and (min-height: 700px) {
        height: 92vh;
    }

    @media only screen and (min-height: 600px) {
        height: 91vh;
    }

`