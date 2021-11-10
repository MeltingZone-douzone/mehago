import React, { useState } from "react";
import { Button, ThemeProvider, TextField, makeStyles } from '@material-ui/core';
import { theme } from '../assets/styles/material/MaterialTheme';
import "../assets/sass/account/Form.scss";
import axios from "axios";

import NonMembers from "../components/NonMember";
import Login from "../components/Login";

export default function PasswordSearch() {

  const classes = madeStyles();
  const [accounts, setAccount] = useState({name:"", email:""});
  const [sendMassege, setSendMassege] = useState("");
  
  const onChangeUserInput = (e) => {
    const { name, value } = e.target;
    setAccount({
      ...accounts,
      [name]:value}
    );
  };

  const emailSend = () => {
    try {
        setSendMassege(true);
        const url = `/api/account/findByNameAndEmail`;
        const account = {
            name : accounts.name,
            email : accounts.email
        }
        axios.post(url, account , {headers:{'Context-Type': 'application/json'}})
        .then(res => {console.log(res.data);
            if(res.data == false){
                setSendMassege(false);
            } else {
                setSendMassege(true);
            }
        });
        setAccount({name: "", email:""});

        
    } catch (e) {
        console.log(e);
    }
  }

  return (
    <div className={"ContentContainer"}>
      <div className={"TitleWrapper"}>
        <h1>비밀번호 찾기</h1>
        <div className={"TitleInfo"}>
          <span>입력하신 이메일로 임시 비밀번호가 발송됩니다.</span>
        </div>
      </div>
      <form>
        <ThemeProvider theme={theme} >
          <div>
            <TextField
              label="이름"
              className={classes.root}
              type="text"
              variant="outlined"
              size="medium"
              autoComplete="off"
              name="name"
              value={accounts.name} 
              onChange={(e) => {onChangeUserInput(e)}}/>
            <TextField
              label="이메일"
              className={classes.root}
              type="text"
              variant="outlined"
              size="medium"
              name="email"
              value={accounts.email} 
              onChange={(e) => {onChangeUserInput(e)}}/>
              {sendMassege === false ? ( 
                <div className={"ErrorMessage"} name="loginFail">
                    <span>가입되지 않은 이름거나, 잘못된 이메일 입니다.</span>
                </div>
                ) : (
                <div className={"CorrectMessage"} name="loginFail">
                    <span>{sendMassege === true ? "요청하신 이메일로 비밀번호를 전송 하였습니다." : ''}</span>
                </div>
              )}
          </div>
          <div className={"ButtonWrapper"}>
            <Button
              className={classes.root}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              onClick={(e) =>{ e.preventDefault(); emailSend();}}
            >
              보내기
            </Button>
          </div>
        </ThemeProvider>
      </form>
      <Login />
    </div>
  );
}


const madeStyles = makeStyles({
  root: {
    fontSize: "1rem",
    marginTop: "10px",
    width: "80%",
    maxWidth: "320px"
  }
})