import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import Thumbnail from '../components/thumbnail';

export default function UserProfile({user}) {

    return(
        <UserProfileContainer>
            <SettingIcon icon={faCog}/>
            <UserThumbnailTemp>
                <Thumbnail nickname={user.nickname} />
            </UserThumbnailTemp>
            <UserInfoTemp>
                <ul>
                    <li>{user.nickname}</li>
                    <li>gender</li>
                    <li>etc</li>
                </ul>
            </UserInfoTemp>
        </UserProfileContainer>
    );
}

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
    left:90%;
    margin-bottom:1rem;
    animation-name: ${settingRotate};
    animation-duration: 10s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
`

const UserProfileContainer = styled.div`
    width:30%;
    height:70%;
    padding:0 1em;
    margin:auto;

    display:flex;
    flex-direction:column;
`

const UserThumbnailTemp = styled.div`
    max-width:300px;
    width: 100%;
    height: auto;
    margin:0 auto;
    border: 1px solid #ccc;
    border-color: rgba(0,0,0,.2);
    border-radius:10px;
    box-shadow: 0px 2px 12px rgba(0,0,0,.2);
`

const UserInfoTemp = styled.div`
    padding:0 10px;
    margin:20px auto;

    line-height:1.5rem;
    font-size:1.2rem;
`