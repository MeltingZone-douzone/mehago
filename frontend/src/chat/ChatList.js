import React, { useEffect, useState, useRef } from 'react';
import { InputAdornment, List, makeStyles, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { getAllChatListApi, keyword } from '../../api/ChatApi';
import '../assets/sass/chat/ChatList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';


import ChatRoom from './ChatRoom';

export default function ChatList({ userInfo }) {

    const classes = materialStyles();
    const [rooms, setRooms] = useState([]);
    const [joinRooms, setJoinRooms] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [isSearched, setIsSearched] = useState(false);
    const [noResult, setNoResult] = useState(false);

    // const chatRoomAreaRef = useRef();
    const [offsetNo, setOffsetNo] = useState(0);
    const [isFetching, setIsFetching] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        fetchChatRooms();
    }, [])

    useEffect(() => {
        if (!searchValue) {
            setIsSearched(false);
            setNoResult(false);
        }
    }, [searchValue])

    const fetchChatRooms = () => {
        try {
            getAllChatListApi(offsetNo).then(res => {
                if (res.statusText === "OK") {
                    if (res.data.result === "success") {
                        if (res.data.data.length === 0) {
                            setIsEnd(!isEnd);
                        }
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
        
        const scrollHeight = e.target.scrollHeight;
        const fetchPointHeight = scrollHeight * 3 / 4;
        const scrollTop = Math.abs(e.target.scrollTop); // 스크롤해서 올라간 높이
        const clientHeight = e.target.clientHeight;     // 사용자 화면 크기
        if (scrollTop + clientHeight >= fetchPointHeight && !isFetching && !isEnd) {
            console.log('개시발')
            fetchChatRooms();
            setIsFetching(true);
        }
    }


    useEffect(() => {
        if (rooms && rooms.length > 1) {
            setOffsetNo(rooms[rooms.length - 1].no);
        }
    }, [rooms]);

    const keywordSearch = () => {
        try {
            keyword(searchValue).then(res => {
                if (res.data.result === "success") {
                    setJoinRooms(res.data.data);
                    setIsSearched(true);
                    setNoResult(false); // TODO: ~ 와 관련된 채팅방이 ' '개 있습니다.
                } else {
                    setNoResult(`"${searchValue}" 에 대한 ${res.data.message}`); // 검색결과가 없습니다.
                }
            });

        } catch (e) {
            console.log(e);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key == 'Enter') {
            keywordSearch();
        }
    }

    function getChatrooms() {
        if (isSearched) {
            return joinRooms;
        } else {
            return rooms;
        }
    }

    return (
        <ChatListContainer>
            <SearchWrapper>
                <TextField
                    className={classes.textField}
                    label="채팅방 검색"
                    name="keyword"
                    value={searchValue}
                    onChange={(e) => { setSearchValue(e.target.value) }}
                    // InputProps={{
                    //     endAdornment: (
                    //         <InputAdornment>
                    //             {/* <button             !!!!!!!!!!!!!!!!!고쳐!!!!!!!
                    //                 onClick={searchValue === "" ? null : keywordSearch}>
                    //                 <SearchIcon />
                    //             </button> */}
                    //         </InputAdornment>
                    //     )
                    // }}
                    onKeyPress={(e) => handleKeyPress(e)}
                />
            </SearchWrapper>
            {
                noResult ? (
                    <p className={"noResult"}>{noResult}</p>
                ) : (
                    <div className={"ChatListContainer"} onScroll={onScroll}> {/*  ref={chatRoomAreaRef} */}
                        <List className={"ChatRoom"}>
                            {rooms ? getChatrooms().map((room, index) => {
                                return (
                                    <div key={index}>
                                    <ChatRoom
                                        userInfo={userInfo}
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
                                    </div>
                                )
                            }) : null}
                        </List>
                    </div>
                )
            }
            <CreateChatRoomButton to="/chat/chatroom/create">
                <FontAwesomeIcon className={classes.createChatIcon} icon={faPlus} size="2x" />
            </CreateChatRoomButton>
        </ChatListContainer>
    );
}

const materialStyles = makeStyles({
    textField: {
        marginTop: "20px",
        width: "70%"
    },
    searchIcon: {
        backgroundColor: "glay",
        border: "none",
        borderRadius: "3px",
    },
    createChatIcon:{
        marginTop: "9px"
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
const CreateChatRoomButton = styled(NavLink)`
    position:fixed;
    width:50px;
    height:50px;
    bottom:40px;
    right:40px;
    background-color:#1C90FC;
    color:#FFF;
    border-radius:50px;
    text-align:center;
    box-shadow: 3px 3px 4px #999;
    }
`
