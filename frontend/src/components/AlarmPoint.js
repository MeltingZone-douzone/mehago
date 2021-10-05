import React from 'react';
import styled from 'styled-components';
export default function AlarmPoint({num, left, top}) {

    return(
        <PointPosition left={left} top={top}>
            <Point>{num}</Point>
        </PointPosition>
    );
}

const PointPosition = styled.div`
    position: absolute;
    display: inline-block;
    bottom: 8px;
    right: 15px;
    left: ${({left}) => left};
    top: ${({top}) => top};
`
const Point = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;

    width: 22px;
    height: 22px;

    border-radius:50%;
    background-color: #fc1c1c;

    font-weight: bold;
    font-size: .8rem;
    text-align: center;
    color:#fff;
`