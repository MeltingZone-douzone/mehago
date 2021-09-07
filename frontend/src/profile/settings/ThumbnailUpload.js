import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, ThemeProvider, makeStyles } from '@material-ui/core';
import { theme } from '../../assets/styles/material/MaterialTheme';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Cropper from 'react-cropper';
import "cropperjs/dist/cropper.css";

import ImageFileUploader from './component/ImageFileUpload';
import TextFileUploader from './component/TextFileUploader';

export default function ThumbnailUpload({handleUpdateForm, setThumbnailApi, onClose}) {
    const classes = styles();

    const [image, setImage] = useState();
    const [imageName, setImageName] = useState(null);

    const [cropper, setCropper] = useState();

    const getCropData = () => {
        if(typeof cropper !== "undefined") {
            cropper.getCroppedCanvas().toBlob((blob) => {
                let form = new FormData();
                form.append("file", blob);

                setThumbnailApi(form).then(res => {
                    if(res == true) {
                        onClose();
                    } else {
                        alert(res);
                    }
                });
            })
        }
        
    };

    const onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
          setImageName(files[0].name);
        };
        reader.readAsDataURL(files[0]);
    };


    return (
        <ModalContainer>
            <ContentTemplate>
                {image == null ? 
                <BeforeFileUpload>
                    <ImageFileUploader imageSize={"15em"} imageColor={"#c8c8c8"} isMultiple={false} onChange={onChange}/>
                    <DescriptionSpan>그림을 눌려 프로필 사진을 설정하세요</DescriptionSpan>
                </BeforeFileUpload>
                :
                <AfterFileUpload>
                    <TextFileUploader imageName={imageName} isMultiple={false} onChange={onChange}/>
                    <ChangeDescription>이미지를 변경하려면 위 영역 사진 업로드를 클릭하여 프로필 사진을 변경하세요</ChangeDescription>
                    <Cropper
                        style={{ height: "auto", width: "100%", maxWidth: 750}}
                        src={image}
                        viewMode={3}
                        guides={true}
                        minCropBoxHeight={100}
                        minCropBoxWidth={30}
                        background={true}
                        responsive={true}
                        autoCropArea={1}
                        aspectRatio={4/3}
                        checkOrientation={false}
                        onInitialized={(instance) => {
                            setCropper(instance);
                        }}
                    />
                    <ThumbnailDescription>원하는 영역을 드래그한 후 '프로필 사진으로 설정'을 클릭하세요</ThumbnailDescription>
               </AfterFileUpload>
            }
            </ContentTemplate>
            <ButtonWrapper>
                <ThemeProvider theme={theme}>
                    {/* TODO: color red*/}
                    <Button className={classes.button} variant="outlined" color="default" startIcon={<ArrowBackIcon/>} onClick={handleUpdateForm}>이전으로</Button>
                    <Button className={classes.button} variant="contained" color="primary" startIcon={<CloudDownloadIcon/>} onClick={e => {e.preventDefault(); getCropData()}} disabled={image ? false : true}>프로필 사진으로 설정</Button>
                </ThemeProvider>
            </ButtonWrapper>
        </ModalContainer>
    );
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
    width:100%;

    align-items:center;

`

const ContentTemplate = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;

    width:100%;
    height: 80%;
`

const ButtonWrapper = styled.div`
    display: flex;

    margin-top: 2em;
    width: 80%;

`
const DescriptionSpan = styled.span`
    position:absolute;
    font-weight: bold;
    color:#c8c8c8;

    bottom:20%;
    left:30%;
    @media only screen and (max-width: 900px){
        left:25%;
    }
    @media only screen and (max-width: 500px){
        left:15%;
    }
`

const BeforeFileUpload = styled.div`
    position:relative;
    
    width:80%;
    height:400px;
    padding-top:5%;
    
`

const AfterFileUpload = styled.div`
    display:flex;
    flex-direction:column;
    
    width: 90%;
    min-height:400px;
`

const ChangeDescription = styled.span`
    margin: 1em 0;
    font-size:0.8rem;
`

const ThumbnailDescription = styled.span`
    margin: 1em auto;
`
