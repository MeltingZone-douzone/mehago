import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserProfile from '../../profile/UserProfile';
import UserSettingsContainer from '../../profile/settings/ProfileSettings';


import { getUserInfoApi, updateUserInfoApi } from '../../../api/AccountApi';
export default function ProfileSettingsPage({history}) {

    const [userInfo, setUserInfo] = useState({nickname:"", name:"", phoneNumber:"" , thumbnailUrl:"" });

    useEffect(() =>{
        getUserInfoApi().then(res =>{
            if(res.data.result === "fail") {
                alert(res.data.message);
                history.push("/");
            }

            setUserInfo(res.data.data);
        })
    },[])

    useEffect(() =>{
        console.log(userInfo);
    },[userInfo])


    const settingsApi = {
        setUserInfo : (newUserInfo) => {
            updateUserInfoApi(newUserInfo).then(res=> {
                console.log(res);
                if(res.data.result === 'fail') {
                    alert(res.data.message);
                } else {
                    setUserInfo(...userInfo, newUserInfo) 
                }
            });
        },

        setPassword : (passwords) =>{

        },

        setNickname : (newNickname) =>{

        },

        setThumbnail : () =>{
            console.log("thumbnail");
        }

    }

    return(
        <Template>
            <UserProfile user={userInfo} />
            <UserSettingsContainer user={userInfo} settingsApi={settingsApi}/>
        </Template>
    );
}

const Template = styled.div`
    display:flex;
`