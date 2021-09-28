import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser , faCog} from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components';

export default function UserSettingsNavigation() {

    return(
        <SettingsTitleContainer>
            <FontAwesomeIcon icon={faUser}/><p>계정 설정 페이지</p>
            <SettingIcon icon={faCog}/>
        </SettingsTitleContainer>
    );
}

const SettingsTitleContainer = styled.div`
    width:100%;
    display:flex;
    font-size:1.5rem;
    color: #555555;
    margin-left:2em;
    
    p{
        margin-left: 10px;
    }
`
const settingRotate = keyframes`
    0%{transform: rotate( 0deg );}
    25%{transform: rotate( 90deg );}
    50%{transform: rotate( 180deg );}
    75%{transform: rotate( 270deg );}
    100%{transform: rotate( 360deg );}
`
const SettingIcon = styled(FontAwesomeIcon)`
    position:relative;
    font-size:1.4rem;
    left:auto;
    margin-bottom:1rem;
    animation-name: ${settingRotate};
    animation-duration: 10s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
`