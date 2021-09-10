import React from 'react';
import styled from 'styled-components';
import { fadeIn, fadeOut } from '../../assets/styles/properties/Fade';

import Cropper from 'react-cropper';
import "cropperjs/dist/cropper.css";

import ImageFileUploader from '../../components/ImageFileUpload';
import TextFileUploader from '../../components/TextFileUploader';


export default function CreateChatImage({image, imageName, setCropper, onChange}) {

    return(
        <>
        { !image ? 
            <BeforeUploadImage visible={ image ? true : false }>
                <ImageFileUploader imageSize={"10em"} imageColor={"#c8c8c8"} isMultiple={false} onChange={e => onChange(e)}/>
                <span>그림을 눌려 채팅방 배경 사진을 설정하세요</span>
            </BeforeUploadImage>
            :
            <AfterUploadImage visible={ image ? true : false }>
                <TextFileUploader imageName={imageName} isMultiple={false} onChange={e => onChange}/>
                <ChangeDescription>이미지를 변경하려면 위 영역 사진 업로드를 클릭하여 프로필 사진을 변경하세요</ChangeDescription>
                <Cropper
                    style={{ height: "auto", width: "auto", maxWidth:400, maxHeight:300}}
                    src={image}
                    viewMode={1}
                    minCropBoxHeight={100}
                    minCropBoxWidth={100}
                    zoomable={true}
                    zoomOnWheel={true}
                    background={true}
                    responsive={true}
                    autoCropArea={1}
                    aspectRatio={16/9}
                    checkOrientation={false}
                    onInitialized={(instance) => {
                        setCropper(instance);
                    }}
                />
                <ThumbnailDescription>원하는 영역을 드래그한 후 '채팅방 개설하기'을 클릭하세요</ThumbnailDescription>
            </AfterUploadImage>
        }
        </>
    )

}

const UploadImageDiv = styled.div`
    display: flex;
    flex-direction: column;

    align-items:center;
    justify-content:center;

    width:100%;
    height:100%;
`

const BeforeUploadImage = styled(UploadImageDiv)`
    animation: ${(props) => props.visible ? fadeOut : fadeIn} .15s ease-out;

    span {
        margin-top: 15px;
        font-weight: bold;
        color: #c8c8c8;
    }
`

const AfterUploadImage = styled(UploadImageDiv)`
    animation: ${(props) => props.visible ? fadeIn : fadeOut} 1s ease-out;
`

const ChangeDescription = styled.span`
    margin: 1em 0;
    font-size:0.8rem;
`

const ThumbnailDescription = styled.span`
    margin: 1em auto;
`