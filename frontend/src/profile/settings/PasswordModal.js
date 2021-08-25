import React from 'react';
import styled from 'styled-components';
import { Button, ThemeProvider, TextField, makeStyles } from '@material-ui/core';
import { theme } from '../../assets/styles/material/MaterialTheme';

const styles = makeStyles({
    root:{
        padding:"10px",
        marginBottom: "20px"
    },
    submitBtn:{
        width: "30%",
        marginLeft: "auto",
        marginRight: "1em"
    }
})

export default function PasswordModal() {
    const classes = styles();
    return(
        <ModalContainer>
            <ThemeProvider theme={ theme }>
                <TextField className={classes.root} label="이전 비밀번호" variant="outlined" color="primary"/>
                <TextField className={classes.root} label="새 비밀번호" variant="outlined" color="primary"/>
                <TextField className={classes.root} label="비밀번호 확인" variant="outlined" color="primary"/>
                <Button className={classes.submitBtn} variant="contained" color="primary">저장하기</Button>
            </ThemeProvider>
        </ModalContainer>
    )
}

const ModalContainer = styled.div`
    padding:1em;
    margin:2rem 0;
    display:flex;
    flex-direction: column;
`