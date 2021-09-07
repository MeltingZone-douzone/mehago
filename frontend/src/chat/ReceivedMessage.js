import React, { useState, useEffect, useRef } from 'react';
import { Grid, List, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';
import styles from '../assets/sass/chat/ChatList.scss';

export default function ReceivedMessage({ nextMessage, previousMessage, message, searchMessage }) {
    const classes = madeStyles();
    return (
        <ListItem key={message.no} className={classes.listItem}>
            <Grid container>
                <Grid item xs={1} align="center">
                    {!previousMessage || previousMessage.participantNo !== message.participantNo ?
                        <img src="https://image.fmkorea.com/files/attach/new2/20210407/486616/3384152332/3508461211/99b983892094b5c6d2fc3736e15da7d1.jpg" className={styles.profile} />
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

                    <ListItemText align="left" className={classes.chatContainer, classes.left}
                        primary={
                            // <Typography className={classes.receivedMessage}>
                            //     <div no={message.no}></div>
                            //     {message.message}
                            // </Typography>
                            <p className={classes.receivedMessage} no={message.no}>
                                {message.message} {message.no}
                            </p>
                        }
                        secondary={
                            <Typography className={classes.notReadCountLeft}>
                                <span>{message.notReadCount > 0 ? message.notReadCount : ""}</span>
                                <span className={classes.createdAt}>
                                    {moment(message.createdAt).format("HH") >= 12 ? `오후 ${moment(message.createdAt).format("HH") == 12 ? 12 : moment(message.createdAt).format("HH") - 12}:${moment(message.createdAt).format("mm")}` : `오전 ${moment(message.createdAt).format('HH:mm')}`}
                                </span>
                            </Typography>
                        }>
                    </ListItemText>
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
    },
    receivedMessage: {
        boxShadow: "2px 3px rgb(0 0 0 / 20%)",
        borderRadius: "5px",
        width: "fit-content",
        padding: "10px",
        backgroundColor: "#ffffff",
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