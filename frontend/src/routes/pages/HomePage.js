import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/black-mehago.png';
import "../../assets/sass/account/AccountPage.scss";

export default function HomePage() {
    
    //TODO css 만들기
    
    return(
        <div className={"PageContainer"}>
            <div className={"Page"}>
                <img src={Logo} alt={"logo"} />
                <NavLink to="/chat" >채팅방으로 입장하기</NavLink>
                <p>이미지 넣자 이쁘게 만들어서</p>
            </div>
        </div>
    )
}