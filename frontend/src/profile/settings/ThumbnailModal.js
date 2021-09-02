import React, { useState } from 'react';
import styled from 'styled-components';
import { updateThumbnailApi } from '../../../api/AccountApi';


export default function ThumbnailModal() {
    const [file, setFile] = useState();

    const fileHandleChange = (e) =>{
        setFile(e.target.files[0]);
    }

    const submit = (e) =>{
        e.preventDefault();

        console.log(file);
        if(file) {
            let form = new FormData();
            form.append("file", file);

            updateThumbnailApi(form).then(res =>{
                console.log(res);
            })
        }
        
    }

    return(
        <ModalContainer>
            <input type='file' accept={"image/*"} multiple={false} onChange={e => fileHandleChange(e)} />
            <button onClick={e => submit(e)}>저장하기</button>
        </ModalContainer>
    )
}

const ModalContainer = styled.div`
    padding:1em;
    margin:2rem 0;
    display:flex;
    flex-direction: column;
`