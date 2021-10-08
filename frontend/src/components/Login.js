import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/sass/account/Login.scss";

export default function Login() {
  return (
    <div className={"login"}>
      <span>
          <NavLink to="/account/login">로그인 하기</NavLink>
      </span>
    </div>
  );
}