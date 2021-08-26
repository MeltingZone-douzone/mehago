import React, { useState } from 'react';
import { Button, ThemeProvider, TextField, makeStyles } from '@material-ui/core';
import { theme } from '../assets/styles/material/MaterialTheme';
import styles from '../assets/sass/account/Form.scss';

import { isExistApi ,signUpApi } from "../../api/AccountApi";
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default function SignUpForm() {
    //TODO: css 고치기!
    const classes = madeStyles();

    const [user, setUser] = useState({ email: '', password: '', name: '', nickname: '',  phoneNumber: ''});
    const [validation, setValidation] = useState({ email: false, password: false, name: false, nickname: false, phoneNumber: false});
    const [errorMessage, setErrorMessage] = useState({ email: '', password: '', name: '', nickname: '', phoneNumber: ''});
  
    const isExist = (name, value) => {
      isExistApi(name, value).then(response => {
            if(response.data !== null) {  // 이미 있을 경우
              console.log(`이미 ${name} : ${response.data} 가 있음`);
              setValidation({...validation, [name]: false })
              setErrorMessage({...errorMessage, [name]: `이미 가입한 ${name} 입니다.` }) // label props해서 여기서도?
              return false;
            }
            console.log(response.data, ' 사용가능함'); // null 이면 사용가능한 이메일
            setValidation({...validation, [name]: true })
        })
    }
  
    const validate = {
      email: function(e) { // DB중복, 유효성 체크
        if(e.target.value === '') {
          setValidation({ ...validation, [e.target.name]: false })
          return false;
        }
        console.log(e.target.value);
        const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
        if(regExp.test(e.target.value)) {
          isExist(e.target.name, e.target.value)
        } else {
          setValidation({...validation, [e.target.name]: false })
          setErrorMessage({...errorMessage, [e.target.name]: "올바른 형식의 이메일을 입력하세요." })
        }
        console.log(validation);
      },
      password: function(e)  { // 유효성 체크
        if(e.target.value === '') {
          setValidation({ ...validation, [e.target.name]: false })
          return false;
        }
        console.log(e.target.value);
        const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/  // 8 ~ 10자 영문, 숫자 조합
        if(regExp.test(e.target.value)) {
          setValidation({...validation, [e.target.name]: true })
        } else {
          setValidation({...validation, [e.target.name]: false })
          setErrorMessage({...errorMessage, [e.target.name]: "8 ~ 10자 영문, 숫자의 비밀번호를 입력하세요." })
        }
        console.log(validation);
      },
      name: function(e)  { // 유효성 체크
        if(e.target.value === '') {
          setValidation({ ...validation, [e.target.name]: false })
          return false;
        }
        console.log(e.target.value);
        const regExp = /^[가-힣]{2,10}$/  //  2~10글자 한글
        if(regExp.test(e.target.value)) {
          setValidation({...validation, [e.target.name]: true })
        } else {
          setValidation({...validation, [e.target.name]: false })
          setErrorMessage({...errorMessage, [e.target.name]: "2 ~ 10 자의 한글 이름을 입력하세요." })
        }
        console.log(validation);
      },
      nickname: function(e) { // 유효성 체크 // 특수문자 제외
        if(e.target.value === '') {
          setValidation({ ...validation, [e.target.name]: false })
          return false;
        }
        console.log(e.target.value);
        const regExp = /^[가-힣a-zA-Z]{2,20}$/  //  2~20글자 한글 영문
        if(regExp.test(e.target.value)) {
          isExist(e.target.name, e.target.value)
        } else {
          setValidation({...validation, [e.target.name]: false })
          setErrorMessage({...errorMessage, [e.target.name]: "2 ~ 20자의 한글, 영문의 닉네임을 입력하세요." })
        }
        console.log(validation);
      },
      phoneNumber: function(e)  { // DB중복, 유효성 체크
        if(e.target.value === '') {
          setValidation({ ...validation, [e.target.name]: false })
          return false;
        }
        console.log(e.target.value);
        const regExp = /^01([0|1|6|7|8|9]?)([0-9]{3,4})([0-9]{4})$/ // (-) 없는 정규식 
        if(regExp.test(e.target.value)) {
          isExist(e.target.name, e.target.value)
        } else {
          setValidation({...validation, [e.target.name]: false })
          setErrorMessage({...errorMessage, [e.target.name]: "(-)를 제외한 숫자만 입력하세요." })
        }
        console.log(validation);
      },
    }
  
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }
  
    const apiFunction = {
      emailCheck: function() {
      },
      SignUp: function(user) {
          console.log(validation.email, "/", validation.password, "/", validation.name, "/", validation.nickname, "/", validation.phoneNumber, "/",);
  
          if(validation.email && validation.password && validation.name && validation.nickname && validation.phoneNumber) {
            
           
            signUpApi(user).then(res => {
                console.log(res.statusText === "OK");
                console.log(res.data);
                console.log(res.data === "signup failed");
                if(res.statusText === "OK") {
                  if(res.data === false) {
                    console.log('회원가입 실패');
                    return false;
                  }
                }
                console.log('회원가입 성공');
              })
            // setUser({ email: '', password: '', name: '', nickname: '', phoneNumber: ''}) // 안해도 되는거아이가
          }
      }
    }
    return(
        <div className={styles.ContentContainer}>
            <div className={styles.TitleWrapper}>
                <h1>회원가입</h1>
                <div className={styles.TitleInfo}>
                    <span>회원가입을 통해 mehago를 이용해 보세요.</span>
                </div>
            </div>
                <form>
                    <ThemeProvider theme={theme}>
                        <div>
                            <TextField
                                error={user.email !== '' && !validation.email ? true : false} // 빈 값이 아니고, 유효성을 통과 못했을 때
                                className={classes.root}
                                type="text"
                                label="이메일"
                                variant="outlined"
                                size="medium"
                                autoComplete="off"
                                name="email"
                                helperText={user.email !== '' && !validation.email ? errorMessage.email : '' }
                                onChange={handleChange}
                                onBlur={validate.email}
                            />
                            <TextField
                                className={classes.root}
                                error={user.password !== '' && !validation.password ? true : false}
                                type="password"
                                label="패스워드"
                                variant="outlined"
                                size="medium"
                                name="password"
                                helperText={user.password !== '' && !validation.password ? errorMessage.password : '' }
                                onChange={handleChange}
                                onBlur={validate.password}
                            />
                            <TextField 
                                className={classes.root}
                                error={user.name !== '' && !validation.name ? true : false}
                                type="text"
                                label="이름"
                                variant="outlined"
                                size="medium"
                                autoComplete="off"
                                name="name"
                                helperText={user.name !== '' && !validation.name ? errorMessage.name : '' }
                                onChange={handleChange}
                                onBlur={validate.name}
                            />
                            <TextField
                                className={classes.root}
                                error={user.nickname !== '' && !validation.nickname ? true : false}
                                type="text"
                                label="닉네임"
                                variant="outlined"
                                size="medium"
                                autoComplete="off"
                                name="nickname"
                                helperText={user.nickname !== '' && !validation.nickname ? errorMessage.nickname : '' }
                                onChange={handleChange}
                                onBlur={validate.nickname}
                            />
                            <TextField
                                className={classes.root}
                                error={user.phoneNumber !== '' && !validation.phoneNumber ? true : false}
                                type="text"
                                label="휴대폰 번호"
                                variant="outlined"
                                size="medium"
                                autoComplete="off"
                                name="phoneNumber"
                                helperText={user.phoneNumber !== '' && !validation.phoneNumber ? errorMessage.phoneNumber : '' }
                                onChange={handleChange}
                                onBlur={validate.phoneNumber}
                            />
                        </div>

                        <div className={styles.ButtonWrapper}>
                            <Button
                                className={classes.root}
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={() => apiFunction.SignUp(user)}>
                                가입하기
                            </Button>
                            <NavLink to={"/account/login"}>
                                <Button 
                                    className={classes.root}
                                    variant="outlined" 
                                    color="primary"
                                    size="large"
                                    >
                                    취소하기
                                </Button>
                            </NavLink>
                        </div>
                    </ThemeProvider>
                </form>
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