import React from 'react';
import styled from 'styled-components';
import { TextField, makeStyles, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import { NavLink } from 'react-router-dom';
import ParticipatingList from './ParticipatingList';


export default function ParticipatingRoom({socket, participatingRoom, setSearchValue, searchValue, updateFavoriteRoom, exitRoom, setFavoriteCheck, updateParticipatingRoom}){
    const classes = styles();

    return Object.keys(participatingRoom).length !== 0 ?
        <MyChatRoomList>
            <SerachBarWarpper>
            <TextField
                className={classes.textField}
                onChange={(e) => { setSearchValue(e.target.value) } }
                label="내 채팅방 검색"
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
                    .map((room)=>
                        <ParticipatingList
                            key={room.no}
                            socket={socket}
                            room = {room} 
                            updateFavoriteRoom={updateFavoriteRoom} 
                            exitRoom={exitRoom}
                            setFavoriteCheck={setFavoriteCheck}
                            updateParticipatingRoom={updateParticipatingRoom}/>
                        )
                }
            </ContentWrapper>
        </MyChatRoomList>
    :
    <p className={'notYetEntered'}>채팅방에 입장해주세요.</p>

}

const styles = makeStyles({
    textField: {
        padding: "10px",
        marginTop: "20px",
        width:"90%"
    },
    notYetEntered: {
        height: "100%",
        display: "flex",
        justifyContent:"center",
        alignItems: "center"
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