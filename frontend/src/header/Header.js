import React from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../assets/images/white-mehago.png';
import styled from 'styled-components';
import { colors } from '../assets/styles/properties/Colors';
import HeaderAuthenticationButtons from './HeaderAuthenticationButtons';


export default function Header({ handleAuthentication, authentication, userInfo ,setUserInfo, alarms, alarmsCount, setAlarmsCount}) {

    return (
        <HeaderContainer>
            <NavLink to="/"><LogoImg src={Logo} alt="LogoImage"></LogoImg></NavLink>
            {/* <div style={{marginLeft:"5rem"}}>navi</div> */}
            {authentication && userInfo ?
                <HeaderAuthenticationButtons handleAuthentication={handleAuthentication} userInfo={userInfo} setUserInfo={setUserInfo} alarms={alarms} alarmsCount={alarmsCount} setAlarmsCount={setAlarmsCount}/>
                :
                <AuthenticationWrapper>
                    <NavLinkButton to="/account/login">로그인</NavLinkButton>
                    <NavLinkButton to="/account/signup">회원가입</NavLinkButton>
                </AuthenticationWrapper>
            }
        </HeaderContainer>
    );
}

const HeaderContainer = styled.div`
    width:100%;
    height:50px;
    top:0;
    background: ${colors.mainThemeColor};
    backdrop-filter: saturate(180%) blur(4px);
    border-bottom: 1px solid ${colors.mainThemeColor} ;
    position:fixed;
    display:flex;
    align-items:center;
    justify-content: space-between;
    
    z-index:100;
`

const LogoImg = styled.img`
    margin-left: 1em;
    width: 8em;
`

const AuthenticationWrapper = styled.div`
    display: flex;
    margin-right: 20px;
`

const NavLinkButton = styled(NavLink)`

    padding: .5rem;
    color: #fff;
    border:1px solid #fff;
    border-radius: 8px;
    font-weight: bold;

    &: hover{
        background-color:${colors.mainThemeColor};
    }

    & + & {
        margin-left: 10px;
    }
`