import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import styles from '../assets/sass/chat/ChatList.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ChattingRoom from './ChattingRoom';

export default function ParticipatingRoom(){
    const [participatingRoom, setParticipatingRoom] = useState([]);
    
    useEffect(()=> {
        // console.log("chatting Room List ");
        try {
            const url = '/api/chat/participatingRoom';    // account no 줘야함  
            axios.post(url, {headers:{'Context-Type': 'application/json'}})
                .then(res => {
                    // console.log(res.data);
                    setParticipatingRoom(res.data);
            });

        } catch (e) {
            // console.log(e);
        }
    },[])

    return (
        <div>
            <Grid  className={styles.borderRight500}>
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
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
  
