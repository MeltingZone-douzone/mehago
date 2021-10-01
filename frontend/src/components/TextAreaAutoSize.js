import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const TextareaAutoSize = ({placeholder, name, textValue, handleChange , minRows, maxRows}) =>{
    const textarea = useRef();
    const [rows, setRows] = useState(1);

    useEffect(()=>{
        const textareaLineHeight = 24;

        const previousRows = textarea.current.rows;
        textarea.current.rows = minRows; //이게 없으면 textarea의 기본값으로 rows가 2인것 같음. // reset number of rows in textarea 
        const currentRows = ~~(textarea.current.scrollHeight / textareaLineHeight); // (~~) 정수만 나오게 함.
        if(currentRows === previousRows){
            textarea.current.rows = currentRows;
        }
        if(currentRows >= maxRows){
            textarea.current.rows = maxRows;
            textarea.current.scrollTop = textarea.current.scrollHeight;
        }
        setRows(currentRows < maxRows ? currentRows : maxRows);
    },[textValue])

    return(
        <Textarea
            placeholder={placeholder}
            name={name}
            ref ={textarea}
            value = { textValue }
            rows = { rows }
            onChange = {(e)=> handleChange(e)}
            />
    )
}

export default TextareaAutoSize;

const Textarea = styled.textarea`
    width:100%;
    height:auto;
    box-sizing: border-box;
    overflow:auto;
    padding:8px;
    border:none;
    border-radius: 8px;
    resize:none;
    background:#eee;

    line-height:24px;
    font-size:16px;
    font-family: 'Noto Sans KR';

    &:focus{
        outline:none;
    }

    ::-webkit-scrollbar {
        width: 5px;
    }
`