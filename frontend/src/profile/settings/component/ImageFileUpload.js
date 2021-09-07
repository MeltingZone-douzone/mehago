import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';

const ImageFileUploader = ({imageSize,imageColor,isMultiple,onChange}) =>{
    return(
        <label>
        <FileUploadTemp>
                <FontAwesome imagesize={imageSize} icon={faFileImage} color={imageColor}/>
            <FileInput
                type="file"
                accept="image/*"
                multiple = {isMultiple}
                onChange ={onChange}
            />
        </FileUploadTemp>
        </label>
    );
}

export default ImageFileUploader;

const FileUploadTemp = styled.div`
    width:100%;
    height:100%;
    text-align:center;
`
const FileInput = styled.input`
    display:none;
`
const FontAwesome = styled(FontAwesomeIcon)`
    font-size:${({imagesize}) => imagesize};
`