import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../assets/sass/account/Links.scss";

export default function Links() {
  return (
    <div className={styles.Links}>
      <ul>
        <li>
          <NavLink to="/account/idsearch" >아이디 찾기</NavLink>
        </li>
        <li>
          <NavLink to="/account/passwordsearch" >비밀번호 찾기</NavLink>
        </li>
      </ul>
      <NavLink className={styles.MemberJoin} to="/account/signup" >회원가입</NavLink>
    </div>
  );
}