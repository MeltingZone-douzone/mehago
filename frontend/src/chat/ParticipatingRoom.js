import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextField, makeStyles, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { getMyChatListApi } from '../../api/ChatApi';
import { NavLink } from 'react-router-dom';
import ChattingRoom from './ChattingRoom';


export default function ParticipatingRoom(){
    const classes = styles();

    const [participatingRoom, setParticipatingRoom] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    
    useEffect(()=> {
        try {
            getMyChatListApi().then(res => {
                if(res.data.result == "fail"){

                    return false;
                }
                console.log(res.data.data + "qweqweqwe");
                setParticipatingRoom(res.data.data);
            });
        } catch (e) {
            // console.log(e);
        }
    },[]);

    useEffect((e) => {
        console.log(searchValue);
    }, [searchValue])
    //TODO: Search만들기

    return (
        <MyChatRoomList>
            <SerachBarWarpper>
            <TextField
                className={classes.textField}
                onChange={ (e) => { setSearchValue(e.target.value)} }
                id="input-with-icon-textfield"
                label="채팅방 검색"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
            </SerachBarWarpper>
            <ContentWrapper>
                {participatingRoom && participatingRoom
                    .filter(room =>room.title.indexOf(searchValue) != -1 || room.tagName.indexOf(searchValue) != -1)
                    .map((room)=> {
                        return(
                            <div key={room.no}>
                                <ChattingRoom 
                                    no = {room.no}
                                    title={room.title}
                                    limitedUserCount ={room.limitedUserCount}
                                    onlyAuthorized ={room.onlyAuthorized}
                                    owner =  {room.owner}
                                    searchable={room.searchable} 
                                    secretRoom = {room.secretRoom}
                                    tagName = {room.tagName}
                                    thumbnailUrl = {room.thumbnailUrl} 
                                    />
                            </div>
                            )
                        })}
            </ContentWrapper>
        </MyChatRoomList>
    );

}

const styles = makeStyles({
    textField: {
        padding: "10px",
        marginTop: "20px"
    }
})
  
const MyChatRoomList = styled.div`
    display:flex;
    flex-direction:column;
    width: 100%;
    height:100%;
`

const SerachBarWarpper = styled.div`
    height:15%;
`

const ContentWrapper = styled.div`
    display:flex;
    flex-direction:column;
    height: 85%;

    overflow-y: auto;
    overflow-x: hidden;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`

const Content = styled(NavLink)`

`