import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Button, ThemeProvider, makeStyles } from '@material-ui/core';
import { theme } from '../assets/styles/material/MaterialTheme';

import { getRoomInfo, vaildatePassword, changePassword, updateChatRoomInfo, deleteChatRoom } from "../../api/ChatApi";
import Thumbnail from '../components/Thumbnail';
import BoxShapeDiv from "../assets/styles/BoxShapeDiv";
import SettingChatForm from "./components/SettingChatForm";
import UpdateChatImage from "./components/UpdateChatImage";
import SettingDialog from "./dialogs/SettingDialog";
import DeleteDialog from "./dialogs/DeleteDialog";

export default function SettingChatRoom({ match, history }) {
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
        console.log(files[0]);
        reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            cropper.getCroppedCanvas().toBlob(blob => {
                setCropImage(blob);
            });
        }
    };


    const [passwordDialog, setPasswordDialog] = useState(false);
    const [isCorrectPassword, setIsCorrectPassword] = useState(false);
    const [isWrongPassword, setIsWrongPassword] = useState(true);
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [vaildateNewPassword, setVaildateNewPassword] = useState();

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
            const result = await vaildatePassword(chatRoomNo, e.target.value).then(res => res);
            setIsCorrectPassword(result.data);

        },
        onChangeNewPassword: (e) => {
            setNewPassword(e.target.value);
        },
        isWrongPassword: (e) => {
            setVaildateNewPassword(e.target.value);
            newPassword === e.target.value ? setIsWrongPassword(true) : setIsWrongPassword(false);
        },
        passwordChangeSubmit: async (e) => {
            e.preventDefault();
            if (isCorrectPassword === true && isWrongPassword === true) {
                await changePassword(chatRoomNo, newPassword, chatRoom.owner).then(res => {
                    if (res.data.result === "fail") {
                        window.alert('권한이 없습니다.');
                        history.goBack();
                        return;
                    } else {
                        setPasswordDialog(false);
                        history.go(0);

                    }
                }
                );
            }
            else { return; }
        }
    }

    const updateChatRoom = () => {
        const { title, password, limitedUserCount, onlyAuthorized, searchable, tagName, owner } = chatRoom;

        let form = new FormData();

        form.append("no", chatRoomNo);
        form.append("title", title);
        form.append("password", password);
        form.append("limitedUserCount", limitedUserCount);
        form.append("onlyAuthorized", onlyAuthorized);
        form.append("searchable", searchable);
        form.append("tagName", tagName);
        form.append("owner", owner);

        if (chatRoom.thumbnailUrl) {
            form.append("thumbnailUrl", chatRoom.thumbnailUrl);
        }

        if (cropImage) {
            form.append("file", cropImage);
        }

        try {
            updateChatRoomInfo(form).then((res) => {
                if (res.data.result === "fail") {
                    window.alert('권한이 없습니다.');
                    history.goBack();
                    return;
                };
                window.alert('수정되었습니다. ');
                history.go(0);
                return;
            });
        } catch (err) {
            console.error(err);
        }
    }

    const [deleteDialog, setDeleteDialog] = useState(false);
    const deleteFunction = {
        open: () => { setDeleteDialog(true) },
        close: () => { setDeleteDialog(false) },
        deleteChatRoom: () => {
            deleteChatRoom(chatRoom)
                .then(res => {
                    if (res.data.result === "fail") {
                        window.alert('권한이 없습니다.');
                        history.goBack();
                        return;
                    };
                    window.alert(`${chatRoom.title} 채팅방이 삭제되었습니다.`);
                    // 먹게 해주세요...
                    history.push('/chat')
                    return;
                })
        },
    }

    const classes = styles();
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <h1>채팅방 정보를 수정하세요</h1>
                <CreateTemplate>
                    <FormTemplate onSubmit={(e) => { e.preventDefault(); { image ? getCropData() : null } updateChatRoom() }} >
                        <FormWrapper>
                            <InfoFormWrapper>
                                <SettingChatForm classes={classes} chatRoom={chatRoom} handleChange={handleChange} handleAddTagName={handleAddTagName} handleDeleteTagName={handleDeleteTagName} passwordFunction={passwordFunction} />
                            </InfoFormWrapper>

                            {chatRoom.thumbnailUrl ?
                                <ImageWrapper>
                                    <Button className={classes.deleteButton} color="secondary" onClick={(e) => { e.preventDefault(); setChatRoom({ ...chatRoom, thumbnailUrl: null }) }}>X</Button>
                                    <Thumbnail thumbnailUrl={chatRoom.thumbnailUrl} classes={classes.thumbnail} />
                                </ImageWrapper>
                                : <CropperWrapper>
                                    <UpdateChatImage image={image} imageName={imageName} thumbnail={chatRoom ? chatRoom.thumbnailUrl : null} setCropper={setCropper} onChange={handleImageChange} />
                                </CropperWrapper>
                            }

                        </FormWrapper>
                        <ButtonWrapper>
                            <div className={classes.buttons}>
                                <Button className={classes.button} variant="outlined" color="primary" type="button" onClick={() => { history.goBack(); }}>취소</Button>
                                <Button className={classes.button} variant="outlined" color="primary" type="submit" >채팅방 정보 변경하기</Button>
                                <Button className={classes.button} variant="contained" color="secondary" type="button" onClick={deleteFunction.open}>채팅방 삭제하기</Button>
                            </div>
                        </ButtonWrapper>
                    </FormTemplate>
                </CreateTemplate>
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

const ImageWrapper = styled.div`
    width: 55%;
    height: 55%;
    margin: auto 0;
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
    },
    deleteButton: {
        position: "absolute",
    }

})
