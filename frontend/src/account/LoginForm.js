import React, { useState } from "react";
import { Button, ThemeProvider, TextField, makeStyles } from '@material-ui/core';
import { theme } from "../assets/styles/material/MaterialTheme";
import "../assets/sass/account/Form.scss";
import localStorage from "local-storage";

import { loginApi } from '../../api/AccountApi'
import NonMembers from "../components/NonMember";

export default function LoginForm({history, setAuthentication}) {
  const classes = madeStyles();
  const [memberVo, setMemberVo] = useState({ email: "", password: "" });
  const [loginFail, setLoginFail] = useState(false);

  const submitLogin = (e) => {
    e.preventDefault();
    try {
      loginApi(memberVo).then((res) => {
        if (res.statusText === "OK") {
          if (res.data == "cant find Account") {
            // 틀렸을 경우에
            setLoginFail(true);
            setMemberVo({ ...memberVo, password: "" });
          } else {
            // 성공하면 메인화면 가기
            localStorage.set("token", res.data);
            setAuthentication(true);
            history.replace('/chat');
          }
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemberVo({ ...memberVo, [name]: value });
  };

  return (
    <div className={"ContentContainer"}>
      <div className={"TitleWrapper"}>
        <h1>로그인</h1>
        <div className={"TitleInfo"}>
          <span>로그인을 통해 mehago를 이용해 보세요.</span>
        </div>
      </div>
      <form>
        <ThemeProvider theme={theme}>
        <div>
          <TextField
            className={classes.root}
            type="text"
            label="이메일"
            variant="outlined"
            size="medium"
            autoComplete="off"
            name="email"
            value={memberVo.email}
            onChange={(e) => handleChange(e)}
          />
        
          <TextField
            className={classes.root}
            type="password"
            label="패스워드"
            variant="outlined"
            size="medium"
            name="password"
            value={memberVo.password}
            onChange={(e) => handleChange(e)}
          />
      
        {loginFail === false ? (
          ""
        ) : (
          <div className={"ErrorMessage"}>
            <span>가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.</span>
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
            onClick={e => submitLogin(e)}
            >
            로그인
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