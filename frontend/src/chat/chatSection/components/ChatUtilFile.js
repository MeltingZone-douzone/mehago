import React, { Fragment } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Folder from '../../../assets/images/folder.png';
import ZipFolder from '../../../assets/images/zip-folder.png';
import Document from '../../../assets/images/document.png';

export default function ChatUtilFile({ fileList, userInfo }) {


    return (
        <Container>
            <ImageContainer>
                {fileList.length ? fileList
                    .map((file, index) => {
                        return (
                            !fileList[index - 1] || moment(fileList[index - 1].createdAt).format('YY/MM') !== moment(file.createdAt).format('YY/MM') ?
                                <Fragment key={index}>
                                    <Text>{moment(file.createdAt).format('YYYY-MM')}</Text>
                                    <Border key={index}>
                                        {file.type === "jpg" || file.type === "png" || file.type === "img" || file.type === "svg" ?
                                            <Image src={file.url} />
                                            : file.type === "pptx" || file.type === "word" || file.type === "xlsx" || file.type === "txt" || file.type === "pdf" ?
                                                <Icon src={Document} />
                                                : file.type === "zip" ?
                                                    <Icon src={ZipFolder} />
                                                    : <Icon src={Folder} />
                                        }
                                        <FileData>
                                            <p>
                                                <FileName>{file.url.split("/")[3]}</FileName>
                                            </p>
                                            <br />
                                            <p>
                                                <FileDate>업로드 날짜: {moment(file.createdAt).format('YY/MM/DD')}</FileDate>
                                            </p>
                                        </FileData>
                                        <DownloadIcon>
                                            {userInfo ?
                                                <DownloadButton href={`/api/account/fileDownload/${file.no}`} >
                                                    <FontAwesomeIcon icon={faDownload} size='1x' style={{ color: "black" }} />
                                                </DownloadButton>
                                                : null}
                                        </DownloadIcon>
                                    </Border>
                                </Fragment>
                                :
                                <Border key={index}>
                                    {file.type === "jpg" || file.type === "png" || file.type === "img" || file.type === "svg" ?
                                        <Image src={file.url} />
                                        : file.type === "pptx" || file.type === "word" || file.type === "xlsx" || file.type === "txt" || file.type === "pdf" ?
                                            <Icon src={Document} />
                                            : file.type === "zip" ?
                                                <Icon src={ZipFolder} />
                                                : <Icon src={Folder} />
                                    }
                                    <FileData>
                                        <p>
                                            <FileName>{file.url.split("/")[3]}</FileName>
                                        </p>
                                        <br />
                                        <p>
                                            <FileDate>업로드 날짜: {moment(file.createdAt).format('YY/MM/DD')}</FileDate>
                                        </p>                                    </FileData>
                                    <DownloadIcon>
                                        {userInfo ?
                                            <DownloadButton href={`/api/account/fileDownload/${file.no}`} >
                                                <FontAwesomeIcon icon={faDownload} size='1x' style={{ color: "black" }} />
                                            </DownloadButton>
                                            : null}
                                    </DownloadIcon>
                                </Border>
                        )
                    })
                    :
                    <NonFile>
                        <Text>업로드 한 이미지가 없습니다.</Text>
                    </NonFile>

                }
            </ImageContainer>
        </Container >
    )
}

const Container = styled.div`
    width:100%;
`
const Text = styled.div`
    font-weight:bold;
    margin:10px 0;
`
const ImageContainer = styled.div`
    margin: 20px 0;
`
const FileData = styled.div`
    width:70%;  
    margin-top: 10px;
`
const Border = styled.div`
    display:flex;
    border: 1px solid #DDD;
`
const Image = styled.img`
    width:60px;
    height:60px;
    margin:10px;
    border-radius:100%;
    border:1px solid #34495e;
`

const Icon = styled.img`
    width: 50px;
    height: 50px;
    margin: 15px;
`
const DownloadButton = styled.a`
    color: none;
`
const DownloadIcon = styled.div`
    padding-top: 30px;
    padding-right: 10px;
`


const NonFile = styled.div`
   margin-top: 10%;
   text-align:center;
`

const FileName = styled.span`
    font-size:13px;
    font-weight:bold;
`

const FileDate = styled.span`
    font-size:13px;
`

