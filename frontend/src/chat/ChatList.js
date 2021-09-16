import { InputAdornment, List, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { getAllChatListApi, keyword } from '../../api/ChatApi';
import '../assets/sass/chat/ChatList.scss';
import ChatRoom from './ChatRoom';


export default function ChatList({ socket }) {
    const classes = materialStyles();
    const [rooms, setRooms] = useState([]);
    const [joinRooms, setJoinRooms] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [isSearched, setIsSearched] = useState(false);
    const [noResult, setNoResult] = useState(false);


    const chatRoomAreaRef = useRef();
    const [offsetNo, setOffsetNo] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    
    useEffect(() => {
        fetchChatRooms();
    }, [])

    const fetchChatRooms = () => {
        try {
            getAllChatListApi(offsetNo).then(res => {
                if(res.statusText === "OK") {
                    if(res.data.result === "success") {
                        if(res.data.data.length === 0){
                            setIsEnd(!isEnd);
                        }
                        console.log(res);
                        setRooms(prevState => prevState.concat(res.data.data));
                        setIsFetching(false);
                    }
                }
            })
        } catch (e) {
            console.log(e);
        }
    }

    const onScroll = (e) => {
        const scrollHeight = e.target.scrollHeight;     // chatRoomAreaRef 의 총 크기
        const scrollTop = Math.abs(e.target.scrollTop); // 스크롤해서 올라간 높이
        const clientHeight = e.target.clientHeight;     // 사용자 화면 크기
        if(scrollTop + clientHeight >= scrollHeight && !isFetching && !isEnd) {
            fetchChatRooms();
            setIsFetching(true);
        }
    }


    useEffect(() => {
        if(rooms && rooms.length > 1) {
            setOffsetNo(rooms[rooms.length - 1].no);
        }
    }, [rooms]);


    useEffect(() =>{
        console.log(rooms);
    },[rooms])

    useEffect(() => {
        console.log("socket", socket);
    }, [socket]);

    const keywordSearch = (e) => {
        console.log(searchValue);
        try {
            if(searchValue === ""){ // TODO: 검색어를 입력해주세요 를 보여주는게 낫지않을까
                getChatRooms().then(res => {
                    setRooms(res.data);
                })
            } 
                keyword(searchValue).then(res => {
                    if (res.data.result === "success") {
                        setJoinRooms(res.data.data);
                        setIsSearched(true);
                        setNoResult(false); // TODO: ~ 와 관련된 채팅방이 ' '개 있습니다.
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
                    <div className={"ChatListContainer"}  onScroll={onScroll} ref={chatRoomAreaRef}>
                        <List className={"ChatRoom"} ref={chatRoomAreaRef}>
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
