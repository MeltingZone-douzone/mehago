import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, ThemeProvider, TextField, makeStyles } from '@material-ui/core';
import { theme } from '../../assets/styles/material/MaterialTheme';
import { ValidationExp } from '../../utils/ValidationExp';
import { isExistApi } from '../../../api/AccountApi';
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

export default function NicknameModal({ onClose, nickname, setNicknameApi }) {
    
    const classes = styles();
    const [newNickname, setNewNickname] = useState(nickname);
    const [resultMsg, setResultMsg] = useState();

    const validate = () =>{
        if(ValidationExp.nicknameExp.test(newNickname)){
            isExistApi("nickname", newNickname).then((response)=>{
                if(response.data !== null) {  // 이미 있을 경우
                    setResultMsg(`이미 가입한 닉네임 입니다.`) // label props해서 여기서도?
                    return false;
                }
                setResultMsg("");
            }) 
        } else {
            setResultMsg("2 ~ 20자의 한글, 영문의 닉네임을 입력하세요.");
        }
    }


    return(
        <ModalContainer>
            <ThemeProvider theme={ theme }>
                <TextField className={classes.root} label="닉네임" variant="outlined" color="primary" onChange={e => setNewNickname(e.target.value)} value={newNickname} onBlur={ validate }/>
                <div style={{display:'flex'}}>
                    {resultMsg? <ErrorMsgWrapper>{resultMsg}</ErrorMsgWrapper>: null}
                    <Button  className={classes.submitBtn} variant="contained" color="primary" onClick={()=> {
                        if(!resultMsg) {
                            setNicknameApi({nickname:newNickname}).then(result => {
                                if(result === true) {
                                    onClose();
                                } else {
                                    setResultMsg(result);
                                }
                            });
                        }
                    }}>저장하기</Button>
                </div>
            </ThemeProvider>
        </ModalContainer>
    )
}

const ModalContainer = styled.div`
    display:flex;
    flex-direction: column;
    padding:1em;
    margin:2rem 0;
`

const ErrorMsgWrapper = styled.span`
    align-self: center;
    color: red;
    margin-left: 2em;
`