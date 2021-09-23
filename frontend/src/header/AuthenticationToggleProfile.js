import React from 'react';
import {Link, useHistory} from "react-router-dom";
import styled from 'styled-components';

import { Button, ThemeProvider, makeStyles } from '@material-ui/core';
import { colors } from '../assets/styles/properties/Colors';

import Thumbnail from '../components/Thumbnail';
import { theme } from '../assets/styles/material/MaterialTheme';

const styles = makeStyles({
    root:{
        margin: "10px 0"
    }
})

const AccountToggleProfile = ({handleAuthentication, userInfo, onClose}) =>{
    const classes = styles();
    let history = useHistory();

    function handleLogout(){
        handleAuthentication(false);
        localStorage.remove("token");
        onClose();
        history.push("/account/login");
    }

    return(
        <ToggleContainer>
            <>
                <AccountImage>
                    <Thumbnail thumbnailUrl={userInfo.thumbnailUrl} nickname={userInfo.nickname} />
                </AccountImage>
                <TextDiv isNickname = {true}><p>{userInfo.nickname}</p></TextDiv>
                <TextDiv><p>{userInfo.email}</p></TextDiv>
            </>
            <Line/>
            <ThemeProvider theme={theme}>
                <Button className={classes.root}><StyleLink to={"/profile"} onClick={()=> onClose()}>계정관리</StyleLink></Button>
                <Button className={classes.root} variant="contained" color="primary" onClick={handleLogout}>로그아웃</Button>
            </ThemeProvider>
        </ToggleContainer>
    )
}

export default AccountToggleProfile;

const ToggleContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: 1.5rem;
`

const StyleLink = styled(Link)`
    color: ${colors.mainThemeColor};
    width:100%;
    
`

const AccountImage = styled.div`
    width: 80px;
    height: 80px;

    overflow:hidden;
    margin:0 auto;

    border: 1px solid #ccc;
    border-color: rgba(0,0,0,.2);
    border-radius:100%;
    box-shadow: 0px 2px 12px rgba(0,0,0,.2);
`
const TextDiv = styled.div`
    padding-top: .5em;
    width: 100%;
    text-align:center;
    font-size:${({ isNickname })=> isNickname? "1.3rem": "1rem" };
`
const Line = styled.div`
    margin:1em 0;
    border-top: 1px solid rgba(0,0,0,.2);
`

const StyleButton = styled.button`
    margin: .5em 0;
    padding:.5rem;

    border: 1px solid #ccc;
    border-color: rgba(0,0,0,.2);
    border-radius:8px;
    box-shadow: 0px 2px 12px rgba(0,0,0,.2);

    font-size:1rem;
    font-weight:bold;
    color: rgba(0,0,0,.5);

    &:hover{
        color: #ffca08;
        border-color:#ffca08;
    }
`