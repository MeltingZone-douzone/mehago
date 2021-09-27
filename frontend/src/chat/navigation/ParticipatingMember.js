import React, { useEffect, useState } from 'react';
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

import { getNonMemberInfo } from '../../../api/ChatApi';
import '../../assets/sass/chat/ChatNav.scss';

export default function ParticipatingMember({ currentParticipants, userInfo, participants }) {
    const [searchNickname, setSearchNickname] = useState('');
    const [nonMember, setNonMember] = useState({});

    useEffect(() => {
        if (!userInfo) {
            getNonMemberInfo().then(res => {
                console.log(res.data.data);
                setNonMember(res.data.data);
            });
        }
    }, [userInfo]);
    // console.log(currentParticipants);
    // console.log(participants); 
    // console.log(userInfo); 
    

    const showParticipantsList = (participants, currentParticipants) => {
        let onlineParticipants;
        participants.filter(participant => {
            onlineParticipants = currentParticipants.filter(currentParticipant =>
                participant.no === currentParticipant ? participant.no : "not"
            )
        })

        return participants && participants
            .filter(participants => participants.chatNickname.indexOf(searchNickname) != -1)
            .map(participant =>
                <ListItem>
                    <ListItemIcon>
                        <Avatar alt={participant.thumbnailUrl} src={participant.thumbnailUrl} />
                    </ListItemIcon>
                    {
                        userInfo && participant.accountNo === userInfo.no ?
                            <ListItemText primary={`${participant.chatNickname} (나)`}></ListItemText>
                            :
                            nonMember && participant.no === nonMember.no ?
                                <ListItemText primary={`${participant.chatNickname} (나)`}></ListItemText>
                                :
                                <ListItemText primary={participant.chatNickname}></ListItemText>
                    }
                    {
                        onlineParticipants.includes(participant.no) ?
                            <ParticipantsStatus style={{ fontSize: '12px', color: '#34d12c' }} />
                            :
                            <ParticipantsStatus style={{ fontSize: '12px', color: '#0000' }} />
                    }
                </ListItem>
            )

    }

    return Object.keys(participants).length !== 0 ?
        <ParticipatingMemberList>
            <Grid className={"borderRight500"}>
                <List>
                    <ListItem key={userInfo ? userInfo.nickname : nonMember.nickname}>
                        <ListItemIcon>
                            <Avatar alt={userInfo ? userInfo.nickname : nonMember.nickname} src={userInfo ? userInfo.nickname : nonMember.nickname} />
                        </ListItemIcon>
                        <ListItemText primary={userInfo ? userInfo.nickname : nonMember.nickname}></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <Grid item xs={12} style={{ padding: '10px' }}>
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
                    {showParticipantsList(participants, currentParticipants)}
                </List>
            </Grid>
        </ParticipatingMemberList>
        :
        <p className={'notYetEntered'}>채팅방에 입장하면 해당 채팅방의 유저가 보입니다.</p>
}


const ParticipatingMemberList = styled.div`
    display:flex;
    flex-direction:column;
    width: 100%;
    height:100%;
`
