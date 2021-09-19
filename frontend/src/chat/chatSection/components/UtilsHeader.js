import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faClipboardList, faFolder, faCog } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../../../assets/styles/properties/Colors';

export default function UtilsHeader({isOnChatSection, handleActivity, activity}) {

    return(
        <HeaderTemplate onSection={isOnChatSection}>
            <UtilsNavItem onSection={isOnChatSection} active={activity=="notice"? true : false } name={"notice"} onClick={() => handleActivity("notice")}><FontAwesomeIconStyled icon={faBullhorn}/><span>공지사항</span></UtilsNavItem>
            <UtilsNavItem onSection={isOnChatSection} active={activity=="todo"? true : false } name={"todo"} onClick={() => handleActivity("todo")}><FontAwesomeIconStyled icon={faClipboardList}/><span>해야 할 일</span></UtilsNavItem>
            <UtilsNavItem onSection={isOnChatSection} active={activity=="file"? true : false } name={"file"} onClick={() => handleActivity("file")}><FontAwesomeIconStyled icon={faFolder}/><span>파일리스트</span></UtilsNavItem>
            <UtilsNavItem onSection={isOnChatSection} active={activity=="setting"? true : false } name={"setting"} onClick={() => handleActivity("setting")}><FontAwesomeIconStyled icon={faCog}/><span>채팅방 설정</span></UtilsNavItem>
        </HeaderTemplate>
    )

}

const HeaderTemplate = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    font-size: ${({onSection}) => onSection? ".9rem" : ".8rem" };
`

const UtilsNavItem = styled.div`
    width: 25%;
    height: 100%;

    display:flex;
    justify-content: center;
    align-items: center;

    // background-color: ${({active}) => active? colors.mainThemeColor : "#fff" };
    border-bottom:2px solid ${({active}) => active? colors.mainThemeColor : "#00000000" };
    color: ${({active}) => active? colors.mainThemeColor : colors.lightTextColor };

    cursor: pointer;

    &:hover{
        background-color: ${({active}) => active? "#fff" : "#00000005" };
        color: ${colors.mainThemeColor};
    }

    span {
        display: ${({onSection}) => onSection? "inherait" : "none"};
        margin-left: 5px;
    }
`

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`

`