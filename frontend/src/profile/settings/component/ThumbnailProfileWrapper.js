import React from 'react';
import styled from 'styled-components';

import Thumbnail from '../../../components/Thumbnail';

export default function ThumbnailProfileWrapper({thumbnailUrl, nickname}) {

    return(
        <ProfileWrapper>
            <ImageDiv>
                <Thumbnail thumbnailUrl={thumbnailUrl} nickname={nickname} />
            </ImageDiv>
            <h1>프로필 사진</h1>
            <p>사진을 추가하면 다른 사람이 나를 알아보기 쉬워집니다</p>
        </ProfileWrapper>
    );
}

const ProfileWrapper = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;

    height:100%;

    h1 {
        font-size: 1.5rem;
        margin: 20px 0;
    }

    p {
        text-align:center;
        width: 80%;
    }
`

const ImageDiv = styled.div`
    width: 280px;
    height: 280px;
    
    border:1px solid #00000000;
    border-radius: 100%;
    overflow: hidden;
    margin: 0 auto;
`