import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserProfile from '../../profile/UserProfile';
import UserSettingsContainer from '../../profile/settings/ProfileSettings';


import { getUserInfoApi, updateNicknameApi, updatePasswordApi, updateUserInfoApi } from '../../../api/AccountApi';

import 'regenerator-runtime';
import { Fragment } from 'react';
export default function ProfileSettingsPage({userInfo, reloadUser}) {

    const settingsApi = {
        setUserInfo : (newUserInfo) => {
            updateUserInfoApi(newUserInfo).then(res=> {
                console.log(res);
                if(res.data.result === 'fail') {
                    alert(res.data.message);
                } else {
                    reloadUser();
                }
            });
        },

        setPassword : async (passwords) =>{
            const { newPassword, checkPassword} = passwords;
            let result;

            if(checkPassword != newPassword ) {
                return "비밀번호가 맞지 않습니다. 다시 입력해주세요.";
            }

            await updatePasswordApi(passwords).then(res =>{
                console.log(res);
                if(res.data.result === 'fail') {
                    result = res.data.message;
                } else {
                    result = res.data.data;
                }
            })

            return result;
        },

        setNickname : async (newNickname) =>{
            const {nickname} = newNickname;
            let result;
            await updateNicknameApi(newNickname).then(res=>{
                if(res.data.result === 'fail') {
                    result = res.data.message;
                } else {
                    reloadUser();
                    result = res.data.data;
                }
            })

            return result;
        },

        setThumbnail : () =>{
            console.log("thumbnail");
        }

    }

    return(
        <Template>
            <Fragment>
            <UserProfile user={userInfo} />
            <UserSettingsContainer user={userInfo} settingsApi={settingsApi}/>
            </Fragment>
        </Template>
    );
}

const Template = styled.div`
    display:flex;
`