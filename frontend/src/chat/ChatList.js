import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import '../assets/sass/chat/ChatList.scss';
import { List, TextField, makeStyles, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {getChatRooms, keyword} from '../../api/ChatApi';

import ChatRoom from './ChatRoom';
import axios from 'axios';
import { getChatListApi } from '../../api/ChatApi';

export default function ChatList({ socket }) {
    const classes = materialStyles();
    const [rooms, setRooms] = useState([]);
    const [joinRooms, setJoinRooms] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [isSearched, setIsSearched] = useState(false);
    const [noResult, setNoResult] = useState(false);

    useEffect(() => {
        try {
            getChatListApi().then(res => {
                setRooms(res.data);
            })

        } catch (e) {
            console.log(e);
        }
    }, [])

    useEffect(() =>{
        console.log(rooms);
    },[rooms])

    useEffect(() => {
        console.log("socket", socket);
    }, [socket]);

    const keywordSearch = (e) => {
        console.log(searchValue);
        try {
            if(searchValue === ""){
                getChatRooms().then(res => {
                    setRooms(res.data);
                })
            } 
                keyword(searchValue).then(res => {
                    if (res.data.result === "success") {
                        setJoinRooms(res.data.data);
                        setIsSearched(true);
                        setNoResult(false);
                    } else {
                        console.log(res.data.message); 
                        setNoResult(`"${searchValue}" 에 대한 ${res.data.message}`); // 검색결과가 없습니다.
                        setIsSearched(false);
                    }
                });
            
            
        } catch (e) {
            console.log(e);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key == 'Enter') {
            keywordSearch()
        }
    }

    function getChatrooms() {
        if (isSearched) {
            return joinRooms;
        } else {
            return rooms;
        }
    }

    //TODO: Grid 틀 변경, search 구현

    return (
        <ChatListContainer>
            <SearchWrapper>
                <TextField
                    className={classes.textField}
                    label="채팅방 검색"
                    name="keyword"
                    value={searchValue}
                    onChange={(e) => { setSearchValue(e.target.value) }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                {/* <button             !!!!!!!!!!!!!!!!!고쳐!!!!!!!
                                    onClick={searchValue === "" ? null : keywordSearch}>
                                    <SearchIcon />
                                </button> */}
                            </InputAdornment>
                        )
                    }}
                    onKeyPress={(e) => handleKeyPress(e)}
                />
            </SearchWrapper>
            {
                noResult ? (
                    <p className={"noResult"}>{noResult}</p>
                ) : (
                    <div className={"ChatListContainer"} >
                        <List className={"ChatRoom"} >
                            { rooms ? getChatrooms().map((room, index)=> {
                                return(
                                    <ChatRoom 
                                        key={index}
                                        no = {room.no}
                                        title={room.title}
                                        limitedUserCount ={room.limitedUserCount}
                                        onlyAuthorized ={room.onlyAuthorized}
                                        owner =  {room.owner}
                                        searchable={room.searchable} 
                                        tagName = {room.tagName}
                                        secretRoom = {room.secretRoom}
                                        thumbnailUrl = {room.thumbnailUrl} 
                                        titleAndTag = { room }
                                        participantCount = { room.participantCount}
                                        lastMessage = { room.lastMessage }
                                        ownerNickname = {room.nickname}
                                        ownerThumbnailUrl = {room.accountThumbnailUrl}
                                    />
                                )
                                }) : null }
                        </List>
                    </div>
                )
            }
        </ChatListContainer>    
    );
}

const materialStyles = makeStyles({
    textField: {
        marginTop: "20px",
        width:"70%"
    },
    searchIcon: {
        backgroundColor: "glay",
        border:"none",
        borderRadius:"3px",
    }
})

const ChatListContainer = styled.div`
    width:100%;
    height:85%;
`

const SearchWrapper = styled.div`
    width:100%;
    height:15%;
    text-align:center;
`
