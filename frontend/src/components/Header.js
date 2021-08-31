import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../assets/images/white-mehago.png';
import styled from 'styled-components';
import { colors } from '../assets/styles/properties/Colors';

export default function Header() {

    

    return(
        <HeaderContainer>
            <NavLink to="/"><LogoImg src={Logo} alt="LogoImage"></LogoImg></NavLink>
            {/* <div style={{marginLeft:"5rem"}}>navi</div> */}
            <AuthenticationWrapper>
                <NavLink to="/account/login">로그인</NavLink>
                <NavLink to="/account/signup">회원가입</NavLink>
            </AuthenticationWrapper>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.div`
    width:100%;
    height:50px;
    top:0;
    background: #2c8ae8de;
    backdrop-filter: saturate(180%) blur(4px);
    border-bottom: 1px solid ${colors.mainThemeColor} ;
    position:fixed;
    display:flex;
    align-items:center;
    place-content:space-around;
    z-index:100;
`

const LogoImg = styled.img`
    margin-left: 1em;
    width: 8em;
`

const AuthenticationWrapper = styled.div`
    display: flex;
    

    a {
        padding: .5rem;
        color: #fff;
        border:1px solid #fff;
        font-weight: bold;
    }

    a + a {
        margin-left: 10px;
    }
`