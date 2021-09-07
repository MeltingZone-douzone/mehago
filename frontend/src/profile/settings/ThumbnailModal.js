import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, ThemeProvider, makeStyles } from '@material-ui/core';
import { theme } from '../../assets/styles/material/MaterialTheme';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import ThumbnailUpload from './ThumbnailUpload';
import ThumbnailProfileWrapper from './component/ThumbnailProfileWrapper';

export default function ThumbnailModal({thumbnailUrl, nickname, onClose, setThumbnailApi}) {
    const classes = styles();
    
    const [updateForm, setUpdateForm] = useState(false);

    const handleUpdateForm = () =>{
        if(updateForm) {
            setUpdateForm(false);
        }
    }

    return(
        <ModalContainer>
            {updateForm ? 
            <ThumbnailUpload handleUpdateForm={handleUpdateForm} setThumbnailApi={setThumbnailApi} onClose={onClose}/> 
            :
            <>
            <ContentTemplate>
                <ThumbnailProfileWrapper thumbnailUrl={thumbnailUrl} nickname = {nickname} />
            </ContentTemplate>
            <ButtonWrapper>
                <ThemeProvider theme={theme}>
                    {/* TODO: color red*/}
                    <Button className={classes.button} variant="outlined" color="default" startIcon={<DeleteOutlineIcon/>}>제거</Button>
                    <Button className={classes.button} variant="contained" color="primary" startIcon={<CloudDownloadIcon/>} onClick={e => {e.preventDefault(); setUpdateForm(true)}}>변경</Button>
                </ThemeProvider>
            </ButtonWrapper>
            </>
            }
        </ModalContainer>
        )
}

const styles = makeStyles({
    button: {
        width:"49%",
        margin:"auto",
        fontSize:"1rem"
    }
})

const ModalContainer = styled.div`
    display:flex;
    flex-direction: column;

    padding:1em;
    margin:1rem 0;

    align-items:center;

`

const ContentTemplate = styled.div`
    display:flex;
    flex-direction: column;

    width:100%;
    height: 80%;
`

const ButtonWrapper = styled.div`
    display: flex;

    margin-top: 2em;
    width: 80%;

`