import React, { Fragment } from 'react';
import styled from 'styled-components';
import UserSettingsContainer from '../../profile/settings/ProfileSettings';
import localStorage from 'local-storage';

import { updateNicknameApi, updatePasswordApi, updateThumbnailApi, updateUserInfoApi } from '../../../api/AccountApi';

import 'regenerator-runtime';

export default function ProfileSettingsPage({ handleAuthentication,userInfo, reloadUser }) {

    const settingsApi = {
        
        setUserInfo: (newUserInfo) => {
            updateUserInfoApi(newUserInfo).then(res => {
                console.log(res);
                if (res.data.result === 'fail') {
                    alert(res.data.message);
                } else {
                    reloadUser();
                }
            });
        },

        setPassword: async (passwords) => {
            const { newPassword, checkPassword } = passwords;
            let result;

            if (checkPassword != newPassword) {
                return "비밀번호가 맞지 않습니다. 다시 입력해주세요.";
            }

            await updatePasswordApi(passwords).then(res => {
                console.log(res);
                if (res.data.result === 'fail') {
                    result = res.data.message;
                } else {
                    result = res.data.data;
                }
            })

            return result;
        },

        setNickname: async (newNickname) => {
            const { nickname } = newNickname;
            let result;
            await updateNicknameApi(newNickname).then(res => {
                if (res.data.result === 'fail') {
                    result = res.data.message;
                } else {
                    localStorage.set("token", res.data.data);
                    reloadUser();
                    result = true;
                }
            })

            return result;
        },

        setThumbnail: async (form) => {
            let result;
            await updateThumbnailApi(form).then(res => {
                if(res.data.result === 'fail') {
                    result = res.data.message;
                } else {
                    reloadUser();
                    result = true;
                }
            })

            return result;
        }

    }

    return (
        <Template>
            <Fragment>
                <UserSettingsContainer handleAuthentication={handleAuthentication} user={userInfo} settingsApi={settingsApi} />
            </Fragment>
        </Template>
    );
}

const Template = styled.div`
    display:flex;
    width: 100%;
    justify-content: center;
`