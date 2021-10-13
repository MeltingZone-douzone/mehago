import React, { Fragment } from 'react';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import moment from 'moment';
import styled from 'styled-components';
import Document from '../../../assets/images/document2.png';
import Folder from '../../../assets/images/folder.png';
import ZipFolder from '../../../assets/images/zip-folder.png';

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
                                            : file.type === "pptx" || file.type === "word" || file.type === "xlsx" || file.type === "txt" || file.type === "pdf" || file.type === "hwp" ?
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
                                        : file.type === "pptx" || file.type === "word" || file.type === "xlsx" || file.type === "txt" || file.type === "pdf" || file.type === "hwp" ?
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
                        <ErrorOutlineIcon />
                        <Text>업로드 한 파일이 없습니다.</Text>
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
    text-align: center;
    width: 100%;
    padding-top:1em;
    color: #272727;
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
    color: #272727;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding-top: 1em;
`

const FileName = styled.span`
    font-size:13px;
    font-weight:bold;
`

const FileDate = styled.span`
    font-size:13px;
`

