import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/sass/account/Links.scss";

export default function Links() {
  return (
    <div className={"Links"}>
      <ul>
        <li>
          <NavLink to="/account/idsearch" >이메일 찾기</NavLink>
        </li>
        <li>
          <NavLink to="/account/passwordsearch" >비밀번호 찾기</NavLink>
        </li> 
      </ul>
      <NavLink className={"MemberJoin"} to="/account/signup" >회원가입</NavLink>
    </div>
  );
}