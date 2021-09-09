import React, { useState, useEffect, useRef } from 'react';
import { Grid, List, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';


export default function SendMessage({ nextMessage, previousMessage, message, searchMessage }) {
    const classes = madeStyles();
    return (
        <ListItem key={message.no} className={classes.listItem}>
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText align="right" className={classes.chatContainer, classes.right}
                        primary={
                            <p className={classes.myChatMessage} no={message.no}>
                                {message.message} {message.no}
                            </p>
                        }
                        secondary={
                            <Typography className={classes.notReadCountRight}>
                                <span>{message.notReadCount > 0 ? message.notReadCount : ""}</span>
                                {!previousMessage || previousMessage.participantNo !== message.participantNo || moment(previousMessage.createdAt).format('HH:mm') !== moment(message.createdAt).format('HH:mm') ?
                                    <span className={classes.createdAt}>
                                        {moment(message.createdAt).format("HH") >= 12 ? `오후 ${moment(message.createdAt).format("HH") == 12 ? 12 : moment(message.createdAt).format("HH") - 12}:${moment(message.createdAt).format("mm")}` : `오전 ${moment(message.createdAt).format('HH:mm')}`}
                                    </span>
                                    : ''}
                            </Typography>
                        }>
                    </ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    );
};

const madeStyles = makeStyles({
    listItem: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    myChatMessage: {
        boxShadow: "3px 3px rgb(0 0 0 / 20%)",
        borderRadius: "5px",
        width: "fit-content",
        padding: "10px",
        backgroundColor: "#A1F1FF",
    },
    right: {
        marginLeft: "30%",
        display: "flex",
        flexDirection: "row-reverse",
    },
    notReadCountRight: {
        display: "flex",
        flexDirection: "column",
        margin: "auto 10px 0 0 ",
        fontSize: "0.8em"
    },
    createdAt: {
        color: "rgba(0, 0, 0, 0.54)",
    },
})