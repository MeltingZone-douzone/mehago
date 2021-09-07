import React, { useState } from "react";
import { Button, ThemeProvider, TextField, makeStyles } from '@material-ui/core';
import { theme } from '../assets/styles/material/MaterialTheme';
import "../assets/sass/account/Form.scss";

import NonMembers from "../components/NonMember";
import axios from 'axios';

export default function IdSearch() {
  const classes = madeStyles();
  const [accounts, setAccount] = useState({name:"", phoneNumber:""});
  const [searchEmail, setSearchEmail] = useState("");
  const onChangeUserInput = (e)=>{
    const {name, value } = e.target;
    setAccount({
        ...accounts,
        [name]:value}
    );
  }

  const emailReceive = () => {
    try {
        const url = `/api/account/searchEmail`;
        const account = {
            name : accounts.name,
            phoneNumber : accounts.phoneNumber
        };

        axios.post(url, account , {headers:{'Context-Type': 'application/json'}})
            .then(res => {
                console.log(res.data);
                if(res.data == "cant find Account"){
                    setSearchEmail(false);
                } else {
                    setSearchEmail(res.data);
                }
        });
        setAccount({name: "", phoneNumber:""});
            
        
    } catch (e) {
        console.log(e);
    }
  }

  return (
    <div className={"ContentContainer"}>
      <div className={"TitleWrapper"}>
        <h1>이메일 찾기</h1>
        <div className={"TitleInfo"}>
          <span>이메일을 잊으셨나요?</span>
        </div>
      </div>
      <form>
        <ThemeProvider theme={theme}>
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
            onChange={(e)=>{onChangeUserInput(e)}}
          />
        
          <TextField
            label="휴대폰 번호"
            className={classes.root}
            type="text"
            variant="outlined"
            size="medium"
            name="phoneNumber"
            value={accounts.phoneNumber}
            onChange={(e)=>{onChangeUserInput(e)}}/>
          {searchEmail === false ? (
            <div className={"ErrorMessage"}>
              <span>가입되지 않은 이름거나, 잘못된 전화번호입니다.</span>
            </div>
            ) : (
            <div className={"CorrectMessage"} >
              <span>{searchEmail === '' ? '' : `이메일은 ${searchEmail} 입니다`}</span>
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
            onClick={(e) => { e.preventDefault(); emailReceive()}}>
            찾기
          </Button>
        </div>
        </ThemeProvider>
      </form>
      <NonMembers />
    </div>
  );
}

const madeStyles = makeStyles({
  root:{
      fontSize:"1rem",
      marginTop: "10px",
      width: "80%",
      maxWidth: "320px"
  }
})
