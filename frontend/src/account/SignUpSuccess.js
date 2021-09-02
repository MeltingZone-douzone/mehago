import React, { Route } from "react";
import Button from "@material-ui/core/Button";
import styles from "../assets/sass/account/SignUpForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { signUpApi } from "../../api/AccountApi";

export default function SignUpSuccess() {
  //TODO : need to modify
  return (
    <div className={styles.SignUpForm}>
      <div className={styles.Message}>
        <h1>회원가입 완료</h1>
        <br/>
        <FontAwesomeIcon icon={faCheckCircle} className="search" size={'4x'} color={'#34d12c'}/>
        {/* <Route exact path={`${match.path}/login`} component={LoginForm}/> */}
      </div>
    </div>
  );
}