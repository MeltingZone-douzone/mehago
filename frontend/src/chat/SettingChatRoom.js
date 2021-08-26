import React, { useState } from "react";
import { Button, ThemeProvider, TextField, makeStyles, FormControlLabel, Switch } from '@material-ui/core';
import { theme } from '../assets/styles/material/MaterialTheme';

const styles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column"
    },
    TextField: {
        padding: "10px",
    },
    buttons: {
        marginLeft: "auto",
        marginRight: "1em"
    },
    button: {
        marginLeft: "10px"
    }
})

export default function SettingChatRoom() {
    const [chatRoom, setChatRoom] = useState(
        {
            title: "",
            secretRoom: false,
            password: "",
            thumbnailUrl: "",
            limitedUserCount: "",
            onlyAuthorized: false,
            searchable: false,
            tagName: ""
        });

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        console.log(chatRoom);
        if (name === "secretRoom" && checked === false) {
            setChatRoom({ ...chatRoom, password: "" });
        }
        setChatRoom({ ...chatRoom, [name]: (value ? value : checked) });
    };

    const classes = styles();
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <TextField
                    required
                    className={classes.TextField}
                    label="방 이름을 입력하세요"
                    variant="outlined"
                    name="title"
                    value={chatRoom.title}
                    onChange={handleChange}
                />
                <TextField
                    className={classes.TextField}
                    label="태그를 입력하세요"
                    placeholder="#태그명"
                    multiline
                    variant="outlined"
                    name="tagName"
                    value={chatRoom.tagName}
                    onChange={handleChange}
                />
                <div>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={chatRoom.secretRoom}
                                onChange={handleChange}
                                name="secretRoom"
                                color="primary"
                            />
                        }
                        label="password"
                    />
                    {chatRoom.secretRoom ?
                        <TextField
                            className={classes.TextField}
                            type="password"
                            variant="outlined"
                            name="password"
                            size="small"
                            value={chatRoom.password}
                            onChange={handleChange}
                        />
                        : ""}
                </div>
                <div className={classes.buttons}>
                    <Button className={classes.button} variant="contained" color="primary" >취소</Button>
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => setNicknameApi()}>저장하기</Button>
                </div>
            </div>
        </ThemeProvider>
    )

}