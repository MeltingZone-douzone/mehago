import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid, List, TextField, makeStyles, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import '../assets/sass/chat/ChattingList.scss';
import ChattingRoom from './ChattingRoom';
import axios from 'axios';

export default function ChatList(){
    const classes = materialStyles();
    const [rooms, setRooms] = useState([]);
    const [searchValue, setSearchValue] = useState('');


    useEffect(()=> {
        try {
            const url = `/api/chat/chatList`;
            axios.post(url, {headers:{'Context-Type': 'application/json'}})
                .then(res => {
                    console.log("asdasdad");
                    console.log(res.data);
                    setRooms(res.data);
            });

        } catch (e) {
            console.log(e);
        }
    },[])

    const keywordSearch = (e) => {
        console.log(searchValue);
        try {
            const url = `/api/chat/keywordSearch?searchValue=`+searchValue;
            axios.get(url, {headers:{'Context-Type': 'application/json'}})
                .then(res => {
                    console.log(res);
                    setRooms(res.data.data);
            });

        } catch (e) {
            console.log(e);
        }
    }

    //TODO: Grid 틀 변경, search 구현
        
    return (
        <ChattingListContainer>
            <SearchWrapper>
                <TextField
                    className={classes.textField}
                    id="input-with-icon-textfield"
                    label="채팅방 검색"
                    onChange ={ (e) => { setSearchValue(e.target.value)} }
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <button 
                                    onClick={ keywordSearch }>
                                        <SearchIcon />
                                </button>
                            </InputAdornment>
                        )
                    }}
                />
            </SearchWrapper>
            <Grid className={"ChatList"} >
                <List className={"ChatRoom"} >
                    { rooms ? rooms.map((room)=> {
                        return(
                            <ChattingRoom 
                                key={room.no}
                                no = {room.no}
                                title={room.title}
                                limitedUserCount ={room.limitedUserCount}
                                onlyAuthorized ={room.onlyAuthorized}
                                owner =  {room.owner}
                                searchable={room.searchable} 
                                tagName = {room.tagName}
                                thumbnailUrl = {room.thumbnailUrl} 
                                titleAndTag = { room }
                               />
                            )
                        }) : rooms != null ? null : rooms}
                </List>
            </Grid>
        </ChattingListContainer>
    );
}

const materialStyles = makeStyles({
    textField: {
        width:"50%"
    }
})

const ChattingListContainer = styled.div`
    width:100%;
    height:100%;
`

const SearchWrapper = styled.div`
    padding:2em;
    text-align:center;
`