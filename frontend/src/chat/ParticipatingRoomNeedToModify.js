import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';

import styles from '../assets/sass/chat/ChatList.scss';
import { Link } from 'react-router-dom';
import ChattingRoom from './ChattingRoom';

import { getMyChatListApi } from '../../api/ChatApi';

export default function ParticipatingRoom(){
    const [participatingRoom, setParticipatingRoom] = useState([]);
    
    useEffect(()=> {
        try {
            getMyChatListApi().then(res => {
                console.log(res.data);
                if(res.data.result == "fail"){

                    return false;
                }
                setParticipatingRoom(res.data.data);
            });
        } catch (e) {
            console.log(e);
        }
    },[])

    return (
        <div>
            <Grid  className={styles.borderRight500}>
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined"/>
                </Grid>
                <Divider />
                <List className={styles.ChatRoom} >
                    {participatingRoom.map((room)=> {
                        return(
                            <Link to={`/chat/${room.no}`}>
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
                                    />
                            </Link>
                            )
                        })}
                </List>
              
            </Grid>
    
      </div>
    );
  
}
  
