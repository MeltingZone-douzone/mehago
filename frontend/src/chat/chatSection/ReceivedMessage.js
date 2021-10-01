import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';
import '../../assets/sass/chat/ChatRoomSection.scss';
import Thumbnail from '../../components/Thumbnail';

export default function ReceivedMessage({ nextMessage, previousMessage, message, no, searchKeyword}) {
    const classes = madeStyles();

    // console.log('message',message);
    
    const getHighlightedText = ({ text = message.message, highlight = searchKeyword }) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return <p className={classes.receivedMessage} name={'chat-message'} no={message.no}>
            {
                parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ?
                        (<mark key={index}>{part}</mark>)
                        :
                        (part)
                )
            }
        </p>;
    }
    return (
        <ListItem key={message.no} className={classes.listItem}>
            <Grid container>
                <Grid item xs={1} align="center">
                    {!previousMessage || previousMessage.participantNo !== message.participantNo ?
                        <div className="profile">
                            <Thumbnail thumbnailUrl={message.thumbnailUrl} nickname={message.nickname} />
                        </div>
                        : ''}
                </Grid>
                <Grid item xs={11}>
                    <Grid item xs={12}>
                        {!previousMessage || previousMessage.participantNo !== message.participantNo ?
                            <ListItemText align="left" secondary={
                                <Typography className={classes.nickname}>
                                    {message.nickname}
                                </Typography>
                            }>
                            </ListItemText>
                            : ''}
                    </Grid>


                    {no ?
                        <ListItemText align="left" className={classes.chatContainer, classes.left}
                            primary={
                                getHighlightedText(message.message, searchKeyword)
                            }
                            secondary={
                                <Typography className={classes.notReadCountLeft}>
                                    <span>{message.notReadCount > 0 ? message.notReadCount : ""}</span>
                                    {!nextMessage || nextMessage.participantNo !== message.participantNo || moment(nextMessage.createdAt).format('HH:mm') !== moment(message.createdAt).format('HH:mm') ?
                                        <span className={classes.createdAt}>
                                            {moment(message.createdAt).format("HH") >= 12 ? `오후 ${moment(message.createdAt).format("HH") == 12 ? 12 : moment(message.createdAt).format("HH") - 12}:${moment(message.createdAt).format("mm")}` : `오전 ${moment(message.createdAt).format('HH:mm')}`}
                                        </span>
                                        : ''}
                                </Typography>
                            }>
                        </ListItemText>
                        :
                        <ListItemText align="left" className={classes.chatContainer, classes.left}
                            primary={
                                <p className={classes.receivedMessage} no={message.no}>
                                    {message.message}
                                </p>
                            }
                            secondary={
                                <Typography className={classes.notReadCountLeft}>
                                    <span>{message.notReadCount > 0 ? message.notReadCount : ""}</span>
                                    {!nextMessage || nextMessage.participantNo !== message.participantNo || moment(nextMessage.createdAt).format('HH:mm') !== moment(message.createdAt).format('HH:mm') ?
                                        <span className={classes.createdAt}>
                                            {moment(message.createdAt).format("HH") >= 12 ? `오후 ${moment(message.createdAt).format("HH") == 12 ? 12 : moment(message.createdAt).format("HH") - 12}:${moment(message.createdAt).format("mm")}` : `오전 ${moment(message.createdAt).format('HH:mm')}`}
                                        </span>
                                        : ''}
                                </Typography>
                            }>
                        </ListItemText>
                    }
                </Grid>
            </Grid>
        </ListItem >
    );
};

const madeStyles = makeStyles({
    listItem: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    nickname: {
        fontWeight: "bolder",
        fontSize: '1.3vh'
    },
    receivedMessage: {
        borderRadius: "5px",
        width: "fit-content",
        padding: "10px",
        backgroundColor: "#e3f1ff",
        textAlign: "left"
    },
    left: {
        marginRight: "30%",
        display: "flex"
    },
    notReadCountLeft: {
        display: "flex",
        flexDirection: "column",
        margin: "auto 0 0 10px",
        fontSize: "0.8em"
    },
    createdAt: {
        color: "rgba(0, 0, 0, 0.54)",
    },
})