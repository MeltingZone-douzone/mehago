import { Grid, makeStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import React from 'react';

export default function SendMessage({ nextMessage, previousMessage, message, no, searchKeyword, hiddenSearchInput }) {
    const classes = madeStyles();

    const getHighlightedText = ({ text = message.message, highlight = searchKeyword }) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return <p className={classes.myChatMessage} name={'chat-message'} no={message.no}>
            {parts.map((part, index) =>
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
                <Grid item xs={12}>

                    {no ?
                        <ListItemText align="right" className={classes.chatContainer, classes.right}
                            primary={
                                getHighlightedText(message.message, searchKeyword)
                            }
                            secondary={
                                <Typography className={classes.notReadCountRight}>
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
                        <ListItemText align="right" className={classes.chatContainer, classes.right}
                            primary={
                                <p className={classes.myChatMessage} no={message.no}>
                                    {message.message}
                                </p>
                            }
                            secondary={
                                <Typography className={classes.notReadCountRight}>
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