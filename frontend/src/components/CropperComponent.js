import React from 'react';
import styled from 'styled-components';

import Cropper from 'react-cropper';
import "cropperjs/dist/cropper.css";

import TextFileUploader from './TextFileUploader';

export default function CropperComponent({handleCropper, cropperStyle, aspectRatio, image, imageName, title}) {

    return(
        <>
            {/* <TextFileUploader imageName={imageName} isMultiple={false} onChange={onChange}/> */}
            <ChangeDescription>이미지를 변경하려면 위 영역 사진 업로드를 클릭하여 프로필 사진을 변경하세요</ChangeDescription>
            <Cropper 
                style={cropperStyle}
                src={image}
                viewMode={3}
                guides={true}
                minCropBoxHeight={100}
                minCropBoxWidth={30}
                background={true}
                responsive={true}
                autoCropArea={1}
                aspectRatio={aspectRatio}
                checkOrientation={false}
                onInitialized={(instance) => {
                    handleCropper(instance);
                }}
            />
            <ThumbnailDescription>원하는 영역을 드래그한 후 '{title}'을 클릭하세요</ThumbnailDescription>
        </>
    )
}

const ChangeDescription = styled.span`
    margin: 1em 0;
    font-size:0.8rem;
`

const ThumbnailDescription = styled.span`
    margin: 1em auto;
`