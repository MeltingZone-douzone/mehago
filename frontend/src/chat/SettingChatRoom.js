import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Button, ThemeProvider, makeStyles } from '@material-ui/core';
import { theme } from '../assets/styles/material/MaterialTheme';

import { getRoomInfo, vaildatePassword, updateChatRoom } from "../../api/ChatApi";
import BoxShapeDiv from "../assets/styles/BoxShapeDiv";
import SettingChatForm from "./components/SettingChatForm";
import UpdateChatImage from "./components/UpdateChatImage";
import SettingDialog from "./SettingDialog";

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
    },
    error: {
        fontSize: "0.8em",
        color: "red",
    }
})

export default function SettingChatRoom({ match }) {
    const chatRoomNo = match.params.no;
    const [chatRoom, setChatRoom] = useState({});

    useEffect(async () => {
        await getRoomInfo(chatRoomNo).then(res => {
            console.log(res);
            setChatRoom(res.data.data);
        });
    }, [chatRoomNo]);

    useEffect(() => {
        if (!chatRoom.isSecretRoom) {
            setChatRoom({ ...chatRoom, newPassword: "" });
        }
    }, [chatRoom.isSecretRoom])


    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setChatRoom({ ...chatRoom, [name]: (name === "isSecretRoom" || name === "onlyAuthorized" || name === "searchable" ? checked : value) });
    };

    const handleAddTagName = (name) => {
        const addArray = [...chatRoom.tagName, name.replaceAll(" ", "")];
        setChatRoom({ ...chatRoom, tagName: addArray })
    }

    const handleDeleteTagName = (name) => {
        const deleteArray = chatRoom.tagName.filter(tag => tag !== name);
        setChatRoom({ ...chatRoom, tagName: deleteArray })

    }

    const [passwordDialog, setPasswordDialog] = useState(false);
    const [isCorrectPassword, setIsCorrectPassword] = useState(false);
    const [isWrongPassword, setIsWrongPassword] = useState(false);
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const passwordFunction = {
        open: (e) => {
            e.preventDefault();
            setPasswordDialog(true);
        },
        close: () => {
            setPasswordDialog(false);
        },
        isCorrectPassword: async (e) => {
            setPassword(e.target.value);
            setIsCorrectPassword(true);
            // await vaildatePassword(chatRoomNo, password).then(res => console.log(res));
        },
        onChangeNewPassword: (e) => {
            setNewPassword(e.target.value);
        },
        isWrongPassword: (e) => {
            console.log(newPassword, e.target.value);
            newPassword === e.target.value ? setIsWrongPassword(true) : setIsWrongPassword(false);
        },
        passwordChangeSubmit: (e) => {
            e.preventDefault();
            if (isCorrectPassword === true && isWrongPassword === true) {
                setPasswordDialog(false);
                setChatRoom({ ...chatRoom, password: newPassword });
            }
            else { return; }
        }
    }

    const updateChatRoom = (e) => {
        e.preventDefault();
        try {
            updateChatRoom(chatRoom).then((res) => {
                history.replace(`/chat/${chatRoomNo}`);
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
                    <FormTemplate onSubmit={(e) => updateChatRoom(e)}>
                        <FormWrapper>
                            <InfoFormWrapper>
                                <SettingChatForm classes={classes} chatRoom={chatRoom} handleChange={handleChange} handleAddTagName={handleAddTagName} handleDeleteTagName={handleDeleteTagName} passwordFunction={passwordFunction} />
                            </InfoFormWrapper>
                            <CropperWrapper>
                                <UpdateChatImage />
                            </CropperWrapper>
                        </FormWrapper>
                        <ButtonWrapper>
                            <div className={classes.buttons}>
                                <Button className={classes.button} variant="outlined" color="primary" type="submit" >채팅방 개설하기</Button>
                            </div>
                        </ButtonWrapper>
                    </FormTemplate>
                </CreateTemplate>
                <SettingDialog passwordDialog={passwordDialog} classes={classes} passwordFunction={passwordFunction} isCorrectPassword={isCorrectPassword} isWrongPassword={isWrongPassword} password={password} newPassword={newPassword} />
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
