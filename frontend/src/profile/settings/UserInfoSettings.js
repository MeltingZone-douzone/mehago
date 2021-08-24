import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextField, ThemeProvider, Button, makeStyles } from '@material-ui/core';
import { theme } from '../../assets/styles/material/MaterialTheme';

const useStyles = makeStyles({
    root : {
        marginTop: "20px",
        marginLeft: "auto",
        marginRight: "15%"
    }
})

export default function UserInfoSettings({name, phoneNumber, setUserInfoApi}) {
    const classes = useStyles();

    const [newName, setNewName] = useState(name);
    const [newPhoneNumber, setNewphoneNumber] = useState(phoneNumber);
    

    useEffect(() => {
        setNewName(name);
        setNewphoneNumber(phoneNumber);
        
    }, [name, phoneNumber])

    return (
        <UserInfoSettingsForm>
            <ThemeProvider theme = { theme } >
                <MatalTextFieldStyle label="이름" variant="outlined" color="primary" onChange={e => setNewName(e.target.value)} value={newName}/>
                <MatalTextFieldStyle label="전화번호" variant="outlined" color="primary" onChange={e => setNewphoneNumber(e.target.value)} value={newPhoneNumber}/>

                <Button className={classes.root} variant="contained" color="primary" onClick={() => setUserInfoApi({name:newName, phoneNumber:newPhoneNumber})} >
                    변경하기
                </Button>
            </ThemeProvider>
        </UserInfoSettingsForm>
    )
}

const UserInfoSettingsForm = styled.div`
    display:flex;
    flex-direction: column;
    margin: 2rem 0;
    align-items: center;
`
const MatalTextFieldStyle = styled(TextField)`
    width: 70%;
    & + & {
        margin-top: 20px;
    }
`