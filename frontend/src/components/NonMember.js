import React from "react";
import styles from "../assets/sass/account/Nonmember.scss";

export default function NonMembers() {
  return (
    <div className={styles.NonMembers}>
      <span>
        <a href="#">비회원으로 시작하기</a>
      </span>
    </div>
  );
}