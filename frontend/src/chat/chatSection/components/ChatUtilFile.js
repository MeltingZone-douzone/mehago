import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import moment from 'moment';
import React, { Fragment } from 'react';
import styled from 'styled-components';

export default function ChatUtilFile({ fileList }) {
    return (
        <Container>
            <ImageContainer>
                {fileList.length ? fileList
                    .map((file, index) => {
                        return (
                            !fileList[index - 1] || moment(fileList[index - 1].createdAt).format('YY/MM/DD') !== moment(file.createdAt).format('YY/MM/DD') ?
                                <Fragment key={index}>
                                    <Text>{moment(file.createdAt).format('YYYY.MM.DD.')}</Text>
                                    <Image key={index} src={file.url} />
                                </Fragment>
                                :
                                <Image key={index} src={file.url} />
                        ) 
                    })
                    :
                    <NonFile>
                        <ErrorOutlineIcon/>
                        <Text>업로드 한 이미지가 없습니다.</Text>
                    </NonFile>

                }
            </ImageContainer>
        </Container>
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
const Image = styled.img`
    width:100px;
    height:100px;
    margin:2px;
`

const NonFile = styled.div`
    color: #272727;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding-top: 1em;
`

const Pictures = styled.img`
    width:50%;
`

