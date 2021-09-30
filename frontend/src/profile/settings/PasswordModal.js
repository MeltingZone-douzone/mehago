import React,{ useState } from 'react';
import styled from 'styled-components';
import { Button, ThemeProvider, TextField, makeStyles } from '@material-ui/core';
import { theme } from '../../assets/styles/material/MaterialTheme';
import { ValidationExp } from '../../utils/ValidationExp';
const styles = makeStyles({
    root:{
        marginTop:"10px",
        marginBottom: "20px"
    },
    submitBtn:{
        width: "30%",
        marginLeft: "auto",
        marginRight: "1em"
    }
})

export default function PasswordModal({ onClose, setPasswordApi }) {
    const classes = styles();

    const [passwords, setPasswords] = useState({ prevPassword: "", newPassword:"", checkPassword:""});
    const [resultMsg, setResultMsg] = useState();

    const validate = (e) =>{
        if(!ValidationExp.passwordExp.test(e.target.value)){
            setResultMsg("8 ~ 10자 영문, 숫자의 비밀번호를 입력하세요.");
        } else {
            setResultMsg("");
        }
    }

    return(
        <ModalContainer>
            <ThemeProvider theme={ theme }>
                <TextField className={classes.root} name={"prevPassword"} type="password" label="이전 비밀번호" variant="outlined" color="primary" onChange={e => setPasswords({...passwords, [e.target.name] : e.target.value}) } value={passwords.prevPassword} onBlur={(e) => validate(e)}/>
                <TextField className={classes.root} name={"newPassword"}  type="password" label="새 비밀번호" variant="outlined" color="primary" onChange={e => setPasswords({...passwords, [e.target.name] : e.target.value}) } value={passwords.newPassword} onBlur={(e) => validate(e)}/>
                <TextField className={classes.root} name={"checkPassword"} type="password" label="비밀번호 확인" variant="outlined" color="primary" onChange={e => setPasswords({...passwords, [e.target.name] : e.target.value}) } value={passwords.checkPassword} onBlur={(e) => validate(e)}/>
                <div style={{display:'flex'}}>
                    {resultMsg? <ErrorMsgWrapper>{resultMsg}</ErrorMsgWrapper>: null}
                    <Button className={classes.submitBtn} variant="contained" color="primary" onClick={() =>{
                        if(!resultMsg) {
                            setPasswordApi(passwords).then(result=> {
                                if(result === true) {
                                    onClose();
                                } else {
                                    setResultMsg(result);
                                }
                            })
                        }
                    }}>저장하기</Button>
                </div>
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

const ErrorMsgWrapper = styled.span`
    align-self: center;
    font-size: .8rem;
    color: red;
    margin-left: 2em;
`