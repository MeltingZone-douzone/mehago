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
    },
    onlyAuthorizedSwitch : {
        marginTop: "10px"
    },
    searchableSwitch : {
        marginTop: "10px"
    },
})

export default function CreateChatRoom({ history, fetchRooms}) {

    const [chatRoom, setChatRoom] = useState(
        {
            title: "",
            secretRoom: false, 
            password: "",
            limitedUserCount: 10,
            onlyAuthorized: false,
            searchable: true,
            tagName: []
            // TODO: 시간이 있다면 이 변수는 사람들이 들어오지 못하게 막는 변수.
        }
    );

    const [image, setImage] = useState();
    const [imageName, setImageName] = useState();
    const [cropImage, setCropImage] = useState();
    const [cropper, setCropper] = useState();

    useEffect(() => {
        if (!chatRoom.secretRoom) {
            setChatRoom({ ...chatRoom, password: "" });
        }
    }, [chatRoom.secretRoom])

    useEffect(() => {
        if (cropImage) {
            createChatRoom();
        }
    }, [cropImage])

    const handleImageChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
            setImageName(files[0].name);
        };
        reader.readAsDataURL(files[0]);
    };

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

    const createChatRoom = () => {
        const { title, password, secretRoom, limitedUserCount, onlyAuthorized, searchable, tagName } = chatRoom;

        let form = new FormData();

        form.append("title", title);
        form.append("password", password);
        form.append("secretRoom", secretRoom);
        form.append("limitedUserCount", limitedUserCount);
        form.append("onlyAuthorized", onlyAuthorized);
        form.append("searchable", searchable);
        form.append("tagName", tagName);

        if (cropImage) {
            form.append("file", cropImage);
        }

        try {
            CreateChattingRoom(form).then((res) => {
                if (res.statusText === "OK") {
                    // history.push('/chat');
                }
                fetchRooms();
                console.log(res);
                history.replace(`/chat/${res.data.data.chatRoomNo}`);
            });
        } catch (err) {
            console.error(err);
        }
    }

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            cropper.getCroppedCanvas().toBlob(blob => {
                setCropImage(blob);
            });
        }
    };


    const classes = styles();
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <h1>오픈 채팅방을 만들어 보세요</h1>
                <CreateTemplate>
                    <FormTemplate onSubmit={(e) => { e.preventDefault(); image ? getCropData() : createChatRoom() }}>
                        <FormWrapper>
                            <InfoFormWrapper>
                                <CreateChatForm classes={classes} chatRoom={chatRoom} handleChange={handleChange} handleAddTagName={handleAddTagName} handleDeleteTagName={handleDeleteTagName} />
                            </InfoFormWrapper>
                            <CropperWrapper>
                                <CreateChatImage image={image} imageName={imageName} setCropper={setCropper} onChange={handleImageChange} />
                            </CropperWrapper>
                        </FormWrapper>
                        <ButtonWrapper>
                            <div className={classes.buttons}>
                                <Button className={classes.button} variant="contained" color="primary" type="submit" >채팅방 개설하기</Button>
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
    opacity: .99;
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
