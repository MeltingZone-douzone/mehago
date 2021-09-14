import React from "react";
import "../assets/sass/account/Nonmember.scss";

export default function NonMembers({nonMemberStart}) {
  
  return (
    <div className={"NonMembers"}>
      <span>
        <button onClick={(e)=>{nonMemberStart(e)}}>비회원으로 시작하기</button>
      </span>
    </div>
  );
}