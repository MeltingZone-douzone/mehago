import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { colors } from '../../assets/styles/properties/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';


export default function UserSettingsNavigation() {

    return(
        <SettingsTitleContainer>
            <FontAwesomeIcon icon={faUser}/><p>계정 설정 페이지</p>
        </SettingsTitleContainer>
    );
}

const SettingsTitleContainer = styled.div`
    width:100%;
    display:flex;
    font-size:1.5rem;
    color:${colors.mainThemeColor};

    p{
        margin-left: 10px;
    }
`

