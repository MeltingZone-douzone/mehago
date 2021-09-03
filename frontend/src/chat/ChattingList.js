import { Divider, Grid, List, ListItem, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styles from '../assets/sass/chat/ChattingList.scss';
import ChattingRoom from './ChattingRoom';
import axios from 'axios';

export default function ChatList({callback}){
    const [rooms, setRooms] = useState([]);
    const [keyword, setKeyword] = useState('');

    useEffect(()=> {
        console.log("chat List ");
        try {
            const url = `/api/chat/chatList`;
            axios.post(url, {headers:{'Context-Type': 'application/json'}})
                .then(res => {
                    // console.log(res.data);
                    setRooms(res.data);
            });

        } catch (e) {
            console.log(e);
        }
    },[])

    const handleChange = function (e) {
        setKeyword(e.target.value);
        console.log(keyword);
    }

        
    return (
        <Grid className={styles.ChatList} >
            <TextField 
                label="채팅방 검색" 
                variant="outlined" 
                onChange={(e)=> handleChange(e)}
                style={{width: '50em', backgroundColor : 'darkgrey'}} />
            <List className={styles.ChatRoom} >
                {rooms.map((room)=> {
                    return(
                         <ChattingRoom 
                            key={room.no}
                            no = {room.no}
                            title={room.title}
                            limitedUserCount ={room.limitedUserCount}
                            onlyAuthorized ={room.onlyAuthorized}
                            owner =  {room.owner}
                            searchable={room.searchable} 
                            secretRoom = {room.secretRoom}
                            tagName = {room.tagName}
                            thumbnailUrl = {room.thumbnailUrl} 
                            titleAndTag = { room }
                            keyword = { keyword }/>
                         )
                    })}
            </List>
        </Grid>
    );
  
}
  
