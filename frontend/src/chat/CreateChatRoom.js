import React, { useState } from "react";
import styled from 'styled-components';
import { Button, ThemeProvider, TextField, makeStyles, FormControlLabel, Switch, FormControl, InputLabel, Select } from '@material-ui/core';
import { theme } from '../assets/styles/material/MaterialTheme';
import ChipInput from 'material-ui-chip-input';

import { CreateChattingRoom } from "../../api/ChatApi";
import BoxShapeDiv from "../assets/styles/BoxShapeDiv";

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

export default function CreateChatRoom() {

    const [chatRoom, setChatRoom] = useState(
        {
            title: "",
            secretRoom: false,
            password: "",
            thumbnailUrl: "",
            limitedUserCount: 10,
            onlyAuthorized: false,
            searchable: false,
            tagName: []
        });

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (name === "secretRoom" && checked === false) {
            // 이거 왜 안돼????
            setChatRoom({ ...chatRoom, password: "" });
        }
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
            });
        } catch (err) {
            console.error(err);
        }
    }

    const classes = styles();
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <h1>나의 채팅방을 만들어 보세요</h1>
                <p>뭐ㅜ머ㅜ머ㅜ머ㅜ머뭐뭐무머ㅜ머ㅜ머ㅜ 적어야댐</p>

                <CreateTemplate>
                    <FormWrapper onSubmit={(e) => createChatRoom(e)}>
                    <TextField
                        required className={classes.TextField}
                        label="방 이름을 입력하세요" variant="outlined"
                        name="title" value={chatRoom.title} onChange={handleChange} />

                    <ChipInput
                        className={classes.TextField} variant="outlined" name="tagName"
                        label='태그를 입력하세요' placeholder='Type and press enter to add Tag'
                        value={chatRoom.tagName}
                        onAdd={(name) => handleAddTagName(name)} onDelete={(name) => handleDeleteTagName(name)} />

                    <div className={classes.password}>
                        <FormControlLabel
                            control={
                                <Switch checked={chatRoom.secretRoom} onChange={handleChange}
                                    name="secretRoom" color="primary" />
                            }
                            label="password"
                        />
                        {chatRoom.secretRoom ?
                            <TextField
                                className={classes.TextField, classes.passwordInput}
                                type="password" variant="outlined" size="small"
                                name="password" value={chatRoom.password} onChange={handleChange} />
                            : ""}
                    </div>

                    <FormControl variant="outlined" className={classes.TextField}>
                        <InputLabel htmlFor="limitedUserCount">최대 인원 수</InputLabel>
                        <Select
                            native
                            value={chatRoom.limitedUserCount} onChange={handleChange}
                            name="limitedUserCount" inputProps={{
                                name: "limitedUserCount",
                                id: 'limitedUserCount',
                            }} >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                            <option value={40}>40</option>
                            <option value={50}>50</option>
                            <option value={60}>60</option>
                            <option value={70}>70</option>
                            <option value={80}>80</option>
                            <option value={90}>90</option>
                            <option value={100}>100</option>
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={
                            <Switch checked={chatRoom.onlyAuthorized} onChange={handleChange}
                                name="onlyAuthorized" color="primary" />}
                        label="회원만 이용 가능" />

                    <FormControlLabel
                        control={
                            <Switch checked={chatRoom.searchable} onChange={handleChange}
                                name="searchable" color="primary" />}
                        label="검색 허용" />

                    {/* 이미지 업로드 */}
                    
                    <div className={classes.buttons}>
                        <Button className={classes.button} variant="contained" color="primary" >취소</Button>
                        <Button className={classes.button} variant="contained" color="primary" type="submit" >저장하기</Button>
                    </div>
                    </FormWrapper>
                </CreateTemplate>
            </Container>
        </ThemeProvider >
    )
}



const Container = styled.div`
    display: flex;
    flex-direction: column;

    justify-content:center;
    width: 100%;
    height: 100%;
`

const CreateTemplate = styled(BoxShapeDiv)` 
    display:flex;
    width:80%;
    height:60%;
    padding: 3em;

    & 
`

const FormWrapper = styled.form`
    display:flex;
    flex-direction:column;

    width:50%;
    height: 100%;
`