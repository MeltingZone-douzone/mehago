import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';

export default function ChatUtilFile({ chatRoomNo, fileList }) {

    return (
        <Container>
            <ImageContainer>
                {fileList ? fileList
                    .map((file, index) => {
                        return (
                            !fileList[index - 1] || moment(fileList[index - 1].createdAt).format('YY/MM/DD') !== moment(file.createdAt).format('YY/MM/DD') ?
                                <Fragment>
                                    <Text>{moment(file.createdAt).format('YYYY.MM.DD.')}</Text>
                                    <Image key={index} src={file.url} />
                                </Fragment>
                                :
                                <Image key={index} src={file.url} />
                        )
                    })
                    : <Text>업로드 한 이미지가 없습니다.</Text>
                }
            </ImageContainer>
        </Container>
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
const Image = styled.img`
    width:100px;
    height:100px;
    margin:2px;
`

