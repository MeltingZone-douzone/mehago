import React, { useEffect, useState  } from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import ParticipantsStatus from '@material-ui/icons/FiberManualRecord';

import { getParticipantsList } from '../../api/ChatApi';
import '../assets/sass/chat/ChatList.scss';

export default function ParticipatingMember({currentParticipants}){
    const [participants, setParticipants] = useState([]); // 온라인 true/false
    const [searchNickname, setSearchNickname] = useState('');
    /* 
        participantingRoom 에서 room클릭하면 room no 받아서 getParicipants에 넣어야함
    */
    useEffect(() => {
        try {
            getParticipantsList(24).then(res => {
                if(res.data.result == "fail") {
                    console.log('fail');
                    return;
                }
                console.log(res.data.data);
                setParticipants(res.data.data);
            })
        } catch (error) {
            console.log(error);
        }
    },[]);

    console.log(currentParticipants);
    console.log(participants); 

    const showParticipantsList = (participants, currentParticipants) => {
        // let b;
        // participants.filter(participant => { 
        //     b = currentParticipants.filter(currentParticipant => 
        //         participant.no === currentParticipant ? participant.no : "not"
        //     )
        // })

        // console.log(b)


        participants && participants
        .filter(participants => participants.chatNickname.indexOf(searchNickname) != -1)
        .map(participant => {
            <ListItem button key={participant.no}>
                <ListItemIcon>
                    <Avatar alt={participant.chatNickname} src={participant.chatNickname} />
                </ListItemIcon>
                <ListItemText primary={participant.chatNickname}>{participant.chatNickname}</ListItemText>
                {/* <ListItemText secondary="online" align="right"></ListItemText> */}
                <ListItemText align="right"/> 
            </ListItem>
        })
        
    }

    return (
        <ParticipatingMemberList>
            <Grid className={"borderRight500"}>
                    <List>
                        <ListItem key="RemySharp">
                            <ListItemIcon>
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="John Wick"></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid item xs={12} style={{padding: '10px'}}>
                        <TextField 
                            label="참여자 검색" 
                            variant="outlined" 
                            fullWidth 
                            onChange={(e) => setSearchNickname(e.target.value)}
                            />
                    </Grid>
                    <Divider />
                    {/* 접속자 리스트 */}
                    <List>
                        {/* 
                            전체접속자 뽑고 맨위에 소켓접속자, 

                        */}
                        { 
                            // showParticipantsList(participants, currentParticipants)
                            participants && participants
                            .filter(participants => participants.chatNickname.indexOf(searchNickname) != -1)
                            .map(participant => 
                                <ListItem button key={participant.no}>
                                    <ListItemIcon>
                                        <Avatar alt={participant.chatNickname} src={participant.chatNickname} />
                                    </ListItemIcon>
                                    <ListItemText primary={participant.chatNickname}>{participant.chatNickname}</ListItemText>
                                    {/* <ListItemText secondary="online" align="right"></ListItemText> */}
                                    <ListItemText align="right"/> 
                                </ListItem>
                            )
                        }
                    </List>
                </Grid>
            </ParticipatingMemberList>
    );
}


const ParticipatingMemberList = styled.div`
    display:flex;
    flex-direction:column;
    width: 100%;
    height:100%;
`
