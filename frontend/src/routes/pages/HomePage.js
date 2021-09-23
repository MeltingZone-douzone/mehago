import React from 'react';
import Logo from '../../assets/images/black-mehago.png';
import "../../assets/sass/account/AccountPage.scss";
import localStorage from "local-storage";
import { Button, makeStyles } from '@material-ui/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment , faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

export default function HomePage({userInfo, handleAuthentication, history}) {
    const classes = styles();

    function handleLogout(){
        handleAuthentication(false);
        localStorage.remove("token");
        history.push("/account/login");
    }
    function chatting(){
        history.push("/chat");
    }
    
    return(
        <div className={"PageContainer"}>
            <div className={"Page"}>
                <img src={Logo} alt={"logo"} className={"logo"}/>
                {
                    (userInfo.name !== "")?(
                        <div className={"home"}>
                            <div className={"homePage"}>
                                <span className={"nickname"}>{userInfo.nickname}</span>
                                <img className={"thumbnailUrl"} src={userInfo.thumbnailUrl} />
                            </div>
                            <div className={"handleButton"}>
                                <Button className={classes.button} variant="contained" onClick={(e) =>{chatting(e)}}><FontAwesomeIcon icon={faComment} className="search" size={'2x'} />채팅 계속하기</Button>
                                <Button className={classes.button} variant="contained" onClick={(e) =>{handleLogout(e)}}><FontAwesomeIcon icon={faSignOutAlt} className="search" size={'2x'} />로그아웃</Button>
                            </div>
                        </div>
                    ):(<span>asdk;jas;</span>)
                }
                
            </div>
        </div>
    )
}

const styles = makeStyles({
    button: {
        backgroundColor: "white",
        width: "7em",
        border: "none",
        fontSize: "smaller",

    }
});