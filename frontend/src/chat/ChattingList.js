import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid, List, TextField, makeStyles, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import moment from 'moment';

import '../assets/sass/chat/ChattingList.scss';
import ChattingRoom from './ChattingRoom';
import axios from 'axios';

export default function ChatList({ socket }) {
    const classes = materialStyles();
    const [rooms, setRooms] = useState([]);
    const [joinRooms, setJoinRooms] = useState([]);
    const [searchValue, setSearchValue] = useState({ keyword: "" });
    const [isSearched, setIsSearched] = useState(false);
    const [noResult, setNoResult] = useState(false);

    useEffect(() => {
        try {

            const url = `/api/chat/chatList`;
            axios.post(url, { headers: { 'Context-Type': 'application/json' } })
                .then(res => {
                    setRooms(res.data);
                });

        } catch (e) {
            console.log(e);
        }
    }, [])

    useEffect(() => {
        console.log("socket", socket);
    }, [socket]);

    const keywordSearch = (e) => {
        console.log(searchValue);
        try {
            const url = `/api/chat/keywordSearch?searchValue=` + searchValue;
            axios.get(url, { headers: { 'Context-Type': 'application/json' } })
                .then(res => {
                    if (res.data.result === "success") {
                        setJoinRooms(res.data.data);
                        setIsSearched(true);
                        setNoResult(false);
                        // setSearchValue({keyword: ""})
                    } else {
                        console.log(res.data.message); 
                        setNoResult(`"${searchValue}" 에 대한 ${res.data.message}`); // 검색결과가 없습니다.
                        setIsSearched(false);
                        // setSearchValue({keyword: ""})
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
        <ChattingListContainer>
            <SearchWrapper>
                <TextField
                    className={classes.textField}
                    id="input-with-icon-textfield"
                    label="채팅방 검색"
                    name="keyword"
                    value={searchValue.keyword}
                    onChange={(e) => { setSearchValue(e.target.value) }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <button
                                    onClick={searchValue === "" ? null : keywordSearch}>
                                    <SearchIcon />
                                </button>
                            </InputAdornment>
                        )
                    }}
                    onKeyPress={(e) => handleKeyPress(e)}
                />
            </SearchWrapper>
            {
                noResult ? (
                    <p>{noResult}</p>
                ) : (
                    <Grid className={"ChatList"} >
                        <List className={"ChatRoom"} >
                            {rooms ? getChatrooms().map((room) => {
                                return (
                                    <div key={room.no}>
                                        <ChattingRoom
                                            key={room.no}
                                            no={room.no}
                                            title={room.title}
                                            limitedUserCount={room.limitedUserCount}
                                            onlyAuthorized={room.onlyAuthorized}
                                            owner={room.owner}
                                            searchable={room.searchable}
                                            tagName={room.tagName}
                                            thumbnailUrl={room.thumbnailUrl}
                                            titleAndTag={room}
                                            participantCount={room.participantCount}
                                            lastMessage={room.lastMessage}
                                        />
                                    </div>
                                )
                            }) : null}
                        </List>
                    </Grid>
                )
            }
        </ChattingListContainer>
    );
}

const materialStyles = makeStyles({
    textField: {
        width: "50%"
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
