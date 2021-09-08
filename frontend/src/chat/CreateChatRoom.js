import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Button, ThemeProvider, makeStyles } from '@material-ui/core';
import { theme } from '../assets/styles/material/MaterialTheme';
import ChipInput from 'material-ui-chip-input';

import { CreateChattingRoom } from "../../api/ChatApi";
import BoxShapeDiv from "../assets/styles/BoxShapeDiv";
import CreateChatForm from "./components/CreateChatForm";
import CreateChatImage from "./components/CreateChatImage";

const styles = makeStyles({
    root: {
        width: "100%",
        height: "100%",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    TextField: {
        marginTop: "10px"
    },
    password: {
        marginTop: "10px",
        display: "flex"
    },
    passwordInput: {
        width: "100%"
    },
    buttons: {
        marginTop: "10px",
        marginLeft: "auto",
        marginRight: "1em"
    },
    button: {
        marginLeft: "10px"
    }
})

export default function CreateChatRoom({history}) {

    const [chatRoom, setChatRoom] = useState(
        {
            title: "",
            secretRoom: false, // TODO:  ㅎㅇ
            password: "",
            thumbnailUrl: "",
            limitedUserCount: 10,
            onlyAuthorized: false,
            searchable: false,
            tagName: []
        }
    );

    useEffect(() =>{
        if(!chatRoom.secretRoom) {
            setChatRoom({ ...chatRoom, password: ""});
        }
    },[chatRoom.secretRoom])
    

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setChatRoom({ ...chatRoom, [name]: (name === "secretRoom" || name === "onlyAuthorized" || name === "searchable" ? checked : value) });
    };

    const handleAddTagName = (name) => {
        const addArray = [...chatRoom.tagName, name.replaceAll(" ", "")];
        setChatRoom({ ...chatRoom, tagName: addArray })
    }

    const handleDeleteTagName = (name) => {
        const deleteArray = chatRoom.tagName.filter(tag => tag !== name);
        setChatRoom({ ...chatRoom, tagName: deleteArray })

    }

    const createChatRoom = (e) => {
        e.preventDefault();
        try {
            CreateChattingRoom(chatRoom).then((res) => {
                if (res.statusText === "OK") {
                    // history.push('/chat');
                }
                history.replace('/chat');
            });
        } catch (err) {
            console.error(err);
        }
    }

    const classes = styles();
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <h1>오픈 채팅방을 만들어 보세요</h1>
                <CreateTemplate>
                    <FormTemplate onSubmit={(e) => createChatRoom(e)}>
                        <FormWrapper>
                            <InfoFormWrapper>
                                <CreateChatForm classes={classes} chatRoom={chatRoom} handleChange={handleChange} handleAddTagName={handleAddTagName} handleDeleteTagName={handleDeleteTagName}/>
                            </InfoFormWrapper>
                            <CropperWrapper>
                                <CreateChatImage />
                            </CropperWrapper>
                        </FormWrapper>
                        <ButtonWrapper>
                            <div className={classes.buttons}>
                                <Button className={classes.button} variant="outlined" color="primary" type="submit" >채팅방 개설하기</Button>
                            </div>
                        </ButtonWrapper>

                    </FormTemplate>
                </CreateTemplate>
            </Container>
        </ThemeProvider >
    )
}



const Container = styled.div`
    display: flex;
    flex-direction: column;

    justify-content:center;
    align-items: center;
    width: 100%;
    height: 100%;

    h1{
        font-Size: 1.5rem;
        font-weight: bold;
        margin:1em 0;
    }
`

const CreateTemplate = styled(BoxShapeDiv)`
    width:70%;
    height:70%;
    padding: 3em;
`

const FormTemplate = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

const FormWrapper = styled.div`
    display:flex;
    width: 100%;
    height:90%;
`

const InfoFormWrapper = styled.div`
    width: 40%;
    height: 100%;
    margin-right:auto;
`

const CropperWrapper = styled.div`
    width: 55%;
    height: 100%;
`

const ButtonWrapper = styled.div`
    margin-left: auto;
`
