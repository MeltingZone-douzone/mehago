import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DevelopingModeMsg = () =>{

    return(
        <Container>
            <StyleText fontsize ={"2rem"}><p>죄송합니다.</p></StyleText>
            <StyleText fontsize ={"1rem"}><p>아직 개발중에 있으며</p></StyleText>
            <StyleText fontsize ={"1rem"}><p>빠른 시일 내에 개발을 완료할 수 있도록 노력하겠습니다.</p></StyleText>
            <StyleLink to="/">홈으로</StyleLink>
        </Container>
    );
}

export default DevelopingModeMsg;

const Container = styled.div`
    display: flex;
    flex-direction:column;
    padding:0.5em;
`

const StyleText = styled.div`
    padding:0.5em;
    font-size: ${({fontsize}) => fontsize};
`

const StyleLink = styled(Link)`
    margin-top:1rem;
    width:fit-content;
    height:fit-content;
    padding:0.5em;

    color:#000;
    font-weight:bold;

    background: #fff;
    border: 1px solid #ccc;
    border-top: none;
    border-color: rgba(0,0,0,.2);
    box-shadow: 0px 4px 10px rgba(0,0,0,.2);
    border-radius: 8px;
`