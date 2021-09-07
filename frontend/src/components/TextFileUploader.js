import React from 'react';
import styled from 'styled-components';

const TextFileUploader = ({imageName,isMultiple,onChange}) =>{

    return(
        <label>
            <TextSpan>사진 업로드 : <span>{imageName}</span></TextSpan>
            <Uploader 
                type="file"
                accept="image/*"
                multiple = {isMultiple}
                onChange ={onChange} />
        </label>
    )
}

export default TextFileUploader;

const TextSpan = styled.span`
    margin:1em 0;
    padding: 5px 0 ;
    font-family: sans-serif;
    font-size:0.8rem;
    border-bottom: 3px solid #000;
    span{
        font-weight:bold;
    }
`
const Uploader = styled.input`
    display:none;
`