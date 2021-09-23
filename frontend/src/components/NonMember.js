import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/sass/account/Nonmember.scss";

export default function NonMembers({ isExistToken, getNonMemberToken }) {

  return (
    <div className={"NonMembers"}>
      <span>
        {
          isExistToken ?
            <NavLink to="/chat">비회원으로 시작하기</NavLink>
            :
            <a href="#" onClick={(e) => { getNonMemberToken(e); return false; }}>비회원으로 시작하기</a>
        }
      </span>
    </div>
  );
}