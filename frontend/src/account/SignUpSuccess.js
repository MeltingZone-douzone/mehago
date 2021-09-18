import React, { useEffect } from "react";
import "../assets/sass/account/SignUpForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";

export default function SignUpSuccess() {

  const history = useHistory();
  
  useEffect(()=>{
    setTimeout(function(){
       history.replace("/account/login");
   },2000);
  },[]);

  //TODO : need to modify
  return (
    <div className={"SignUpForm"}>
      <div className={"Message"}>
        <h1>회원가입 완료</h1>
        <br/>
        <FontAwesomeIcon icon={faCheckCircle} className="search" size={'2x'} color={'#34d12c'}/>
      </div>
    </div>
  );
}