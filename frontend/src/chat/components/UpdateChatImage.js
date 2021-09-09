import React from 'react';
import ImageFileUploader from '../../components/ImageFileUpload';


export default function UpdateChatImage() {

    const onChange = () => {

    }


    return (
        <ImageFileUploader imageSize={"15em"} imageColor={"#c8c8c8"} isMultiple={false} onChange={onChange} />
    )

}