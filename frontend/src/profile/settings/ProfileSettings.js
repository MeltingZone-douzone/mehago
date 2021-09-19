import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import UserSettingsTitle from './ProfileSettingsTitle';
import UserSettingsTemplate from './ProfileSettingsTemplate';


export default function UserSettingsContainer({handleAuthentication, user, settingsApi}) {

    return(
        <SettingsContainer>            
            <UserSettingsTitle />
            <UserSettingsTemplate handleAuthentication={handleAuthentication} user={user} settingsApi={settingsApi}/>
        </SettingsContainer>
    );
}

const SettingsContainer = styled.div`
    margin-top:2em;
    padding:0 2rem;
    width:70%;
`