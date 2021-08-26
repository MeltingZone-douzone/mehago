import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../assets/styles/properties/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

import AccountModalTemp from './AccountModalTemp';
import Thumbnail from '../../components/thumbnail';
import CircleDiv from '../../assets/styles/CircleDiv';


const AccountSettings = ({nickname, thumbnailUrl, settingsApi}) =>{

    const [openContainer,setOpenContainer] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalTitle, setModalTitle] = useState(null);
    const [modalButton, setModalButton] = useState(null);

    function callTemplate(e){
        if(e.target.name != undefined){
            setModalContent(e.target.name);
            switch(e.target.name){
                case 'thumbnail' : setModalTitle("프로필 사진 선택"); setModalButton("프로필 사진으로 설정");
                    break;
                case 'nickname' : setModalTitle("닉네임 설정"); setModalButton("해당 닉네임으로 변경");
                    break;
                case 'password' : setModalTitle("비밀번호 설정"); setModalButton("해당 비밀번호로 변경");
                    break;
            }
        }
    }

    useEffect(()=>{
        if(modalContent != null)
            setOpenContainer(true);
    },[modalContent]);

    function closeTemplate(){
        setOpenContainer(false);
        setModalContent(null);
    }

    return(
        <Fragment>
        <SettingContainer>
            <LineSettingButton name ="thumbnail" onClick={(e)=>callTemplate(e)}>
                <span>사진</span> <CurrentInformation/><ImageDiv>
                    <Thumbnail nickname={nickname} />
                    </ImageDiv>
            </LineSettingButton>
            
            <LineSettingButton name ="nickname" onClick={(e)=>callTemplate(e)}>
                <span>닉네임</span> <CurrentInformation>{nickname}</CurrentInformation>
                <FontAwesomeIcon  icon={faChevronCircleRight} size="lg"/>
            </LineSettingButton>
            

            <LineSettingButton name ="password" onClick={(e)=>callTemplate(e)}>
                <span>비밀번호</span> <CurrentInformation name ="password">&middot; &middot; &middot; &middot; &middot;</CurrentInformation>
                <FontAwesomeIcon icon={faChevronCircleRight} size="lg"/>
            </LineSettingButton>

            
        </SettingContainer>
        { openContainer ? 
            <AccountModalTemp nickname={nickname} title={modalTitle} updateButton={modalButton} content={modalContent} settingsApi={settingsApi} onClose={closeTemplate}/>
          : null}
        </Fragment>
    );
}

export default AccountSettings;

const SettingContainer = styled.div`
    
    & : first-child {
        border-radius: 8px 8px 0 0;
    }

    & : last-child {
        border-radius: 0 0 8px 8px;
    }
`

const LineSettingButton = styled.button`
    display:flex;
    flex-direction:row;
    text-align:start;
    align-items:center;
    justify-content:space-between;
    padding:1.5rem;
    width:100%;
    background-color:#fff;
    border:none;
    border-bottom: 1px solid #ccc;
    color:#636466;


    & : span{
        font-size:0.8rem;
    }

    & : last-child{
        border-radius:100%;
    }
    
    &:hover{
        background-color:${colors.lightMainThemeColor};
        color:${colors.mainThemeColor};
    }
`

const CurrentInformation = styled.div`
    width:4em;
    margin-right:50%;
    font-size:1.2rem;
    color:#000;

`
const ImageDiv =styled(CircleDiv)`
    width:50px;
    height:50px;
`