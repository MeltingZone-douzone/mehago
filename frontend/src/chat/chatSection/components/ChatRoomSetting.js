import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button, ThemeProvider, makeStyles } from '@material-ui/core';
import { theme } from '../../../assets/styles/material/MaterialTheme';

import { vaildatePassword, deleteChatRoom } from "../../../../api/ChatApi";
import Thumbnail from '../../../components/Thumbnail';
import SettingChatForm from "../../components/SettingChatForm";
import UpdateChatImage from "../../components/UpdateChatImage";
import SettingDialog from "../../dialogs/SettingDialog";
import DeleteDialog from "../../dialogs/DeleteDialog";


export default function ChatRoomSetting({ roomObject, settingRoomFunction, passwordDialog }) {
    const history = useHistory();
    const [chatRoom, setChatRoom] = useState({});
    const [isSecretRoom, setIsSecretRoom] = useState(false);


    useEffect(() => {
        setChatRoom({ ...chatRoom, roomObject });
    }, [roomObject]);

    useEffect(() => {
        if (!chatRoom.secretRoom) {
            setChatRoom({ ...chatRoom, newPassword: "" });
        }
    }, [chatRoom.secretRoom])


    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setChatRoom({ ...chatRoom, [name]: (name === "secretRoom" || name === "onlyAuthorized" || name === "searchable" ? checked : value) });
    };

    const handleAddTagName = (name) => {
        const addArray = chatRoom.tagName === undefined ? [...roomObject.tagName, name.replaceAll(" ", "")] : [...chatRoom.tagName, name.replaceAll(" ", "")];
        setChatRoom({ ...chatRoom, tagName: addArray })
    }

    const handleDeleteTagName = (name) => {
        const deleteArray = chatRoom.tagName === undefined ? roomObject.tagName.filter(tag => tag !== name) : chatRoom.tagName.filter(tag => tag !== name);
        setChatRoom({ ...chatRoom, tagName: deleteArray })

    }
    const [image, setImage] = useState();
    const [imageName, setImageName] = useState();
    const [cropImage, setCropImage] = useState();
    const [cropper, setCropper] = useState();

    useEffect(() => {
        if (cropImage) {
            updateChatRoom();
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

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            cropper.getCroppedCanvas().toBlob(blob => {
                setCropImage(blob);
            });
        }
    };


    // const [passwordDialog, setPasswordDialog] = useState(false);
    const [isCorrectPassword, setIsCorrectPassword] = useState(false);
    const [isWrongPassword, setIsWrongPassword] = useState(true);
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [vaildateNewPassword, setVaildateNewPassword] = useState();

    const passwordFunction = {
        open: (e) => {
            e.preventDefault();
            settingRoomFunction.dialogOpen();
        },
        close: () => {
            settingRoomFunction.dialogClose();
        },
        isCorrectPassword: async (e) => {
            setPassword(e.target.value);
            const result = await vaildatePassword(roomObject.no, e.target.value).then(res => res);
            setIsCorrectPassword(result.data);

        },
        onChangeNewPassword: (e) => {
            setNewPassword(e.target.value);
        },
        isWrongPassword: (e) => {
            setVaildateNewPassword(e.target.value);
            newPassword === e.target.value ? setIsWrongPassword(true) : setIsWrongPassword(false);
        },
        passwordChangeSubmit: (e) => {
            e.preventDefault();
            if (isCorrectPassword === true && isWrongPassword === true) {
                settingRoomFunction.passwordChangeSubmit(e.target.newPassword.value);
            } else {
                return;
            }
        }

    }

    const updateChatRoom = () => {
        const { title, password, limitedUserCount, onlyAuthorized, searchable, tagName, owner, secretRoom } = chatRoom;
        let form = new FormData();

        form.append("no", roomObject.no);
        form.append("title", title ? title : roomObject.title);
        form.append("password", password ? password : roomObject.password);
        form.append("limitedUserCount", limitedUserCount ? limitedUserCount : roomObject.limitedUserCount);
        form.append("onlyAuthorized", onlyAuthorized ? onlyAuthorized : roomObject.onlyAuthorized);
        form.append("searchable", searchable ? searchable : roomObject.searchable);
        form.append("tagName", tagName ? tagName : roomObject.tagName);
        form.append("owner", owner ? owner : roomObject.owner);
        form.append("secretRoom", secretRoom ? secretRoom : roomObject.secretRoom);

        if (roomObject.thumbnailUrl && chatRoom.thumbnailUrl === undefined) {
            form.append("thumbnailUrl", roomObject.thumbnailUrl);
        }

        if (cropImage) {
            form.append("file", cropImage);
        }

        settingRoomFunction.updateChatRoom(form);

    }

    const [deleteDialog, setDeleteDialog] = useState(false);
    const deleteFunction = {
        open: () => { setDeleteDialog(true) },
        close: () => { setDeleteDialog(false) },
        deleteChatRoom: () => {
            deleteChatRoom(roomObject)
                .then(res => {
                    if (res.data.result === "fail") {
                        window.alert('권한이 없습니다.');
                        history.goBack();
                        return;
                    };
                    window.alert(`${chatRoom && chatRoom.title !== undefined ? chatRoom.title : roomObject.title} 채팅방이 삭제되었습니다.`);
                    history.push('/chat')
                    return;
                })
        },
    }

    const classes = styles();

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <FormTemplate onSubmit={(e) => { e.preventDefault(); image ? getCropData() : updateChatRoom() }} >
                    <FormWrapper>
                        {roomObject.thumbnailUrl && chatRoom.thumbnailUrl === undefined ?
                            <ImageWrapper>
                                <Button className={classes.deleteButton} color="secondary" onClick={(e) => { e.preventDefault(); setChatRoom({ ...chatRoom, thumbnailUrl: null }) }}>X</Button>
                                <Thumbnail thumbnailUrl={chatRoom.thumbnailUrl === undefined ? roomObject.thumbnailUrl : chatRoom.thumbnailUrl} classes={classes.thumbnail} />
                            </ImageWrapper>
                            :
                            <CropperWrapper>
                                <UpdateChatImage image={image} imageName={imageName} thumbnail={chatRoom ? chatRoom.thumbnailUrl : null} setCropper={setCropper} onChange={handleImageChange} />
                            </CropperWrapper>
                        }
                        <InfoFormWrapper>
                            <SettingChatForm classes={classes} chatRoom={chatRoom} roomObject={roomObject} handleChange={handleChange} handleAddTagName={handleAddTagName} handleDeleteTagName={handleDeleteTagName} passwordFunction={passwordFunction} settingRoomFunction={settingRoomFunction} isSecretRoom={isSecretRoom} />
                        </InfoFormWrapper>
                        <ButtonWrapper>
                            <div className={classes.buttons}>
                                <Button className={classes.button} variant="outlined" color="primary" type="button" onClick={() => { setChatRoom({}); }}>취소</Button>
                                <Button className={classes.button} variant="outlined" color="primary" type="submit" >채팅방 정보 변경하기</Button>
                                <Button className={classes.button} variant="contained" color="secondary" type="button" onClick={deleteFunction.open}>채팅방 삭제하기</Button>
                            </div>
                        </ButtonWrapper>
                    </FormWrapper>
                </FormTemplate>
                <SettingDialog passwordDialog={passwordDialog} classes={classes} passwordFunction={passwordFunction} isCorrectPassword={isCorrectPassword} isWrongPassword={isWrongPassword} password={password} vaildateNewPassword={vaildateNewPassword} />
                <DeleteDialog deleteDialog={deleteDialog} deleteFunction={deleteFunction} />

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



const FormTemplate = styled.form`
    display: flex;  
    flex-direction: column;
    width: 100%;
    height: 100%;
`

const FormWrapper = styled.div`
    display:flex;
    flex-direction: column;
    margin-top: 20px;
    width: 100%;
    height:90%;
`

const InfoFormWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin-right:auto;
`

const CropperWrapper = styled.div`
    width: 55%;
    height: 100%;
    margin: 0 auto;
`

const ImageWrapper = styled.div`
    width: 55%;
    height: 55%;
    margin: 0 auto;
`

const ButtonWrapper = styled.div`
    margin-left: auto;
`

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
        marginTop: "10px",
        width: "90%"
    },
    password: {
        marginTop: "10px",
        display: "flex"
    },
    passwordInput: {
        width: "60%"
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
    },
    deleteButton: {
        position: "absolute",
    }

})