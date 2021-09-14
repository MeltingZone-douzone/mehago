import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextField, makeStyles, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { NavLink } from 'react-router-dom';
import ParticipatingList from './ParticipatingList';


export default function ParticipatingRoom({participatingRoom, setSearchValue, searchValue, updateFavoriteRoom, exitRoom, setFavoriteCheck}){
    const classes = styles();

    // console.log(participatingRoom);

    return (
        <MyChatRoomList>
            <SerachBarWarpper>
            <TextField
                className={classes.textField}
                onChange={(e) => { setSearchValue(e.target.value) } }
                label="채팅방 검색"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    ),
                }}
            />
            </SerachBarWarpper>
            <ContentWrapper>
                {
                participatingRoom
                .filter(rooms => rooms.title.indexOf(searchValue) != -1 )
                .map((room ,index)=> 
                    <ParticipatingList
                        room = {room} 
                        updateFavoriteRoom={updateFavoriteRoom} 
                        exitRoom={exitRoom}
                        setFavoriteCheck={setFavoriteCheck}/>
                    )
                }
            </ContentWrapper>
        </MyChatRoomList>
    );

}

const styles = makeStyles({
    textField: {
        padding: "10px",
        marginTop: "20px",
        width:"90%"
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
    height: 84%;

    overflow-y: auto;
    overflow-x: hidden;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`

const Content = styled(NavLink)`

`