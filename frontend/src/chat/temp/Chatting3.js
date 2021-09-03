import React, { useState, useEffect, useRef } from 'react';
import { Grid, List, makeStyles, ListItem, ListItemText, Typography, ImageListItem } from '@material-ui/core';

import moment from 'moment';
import styles from '../../assets/sass/chat/ChatList.scss';

export default function Chatting3() {
    const classes = madeStyles();
    return (
        <List className={styles.messageArea}>
            <ListItem key={1}>
                <Grid container>
                    <Grid item xs={1} align="center" className={classes.imageWrapper}>
                        <div><img src="https://www.vets4pets.com/siteassets/dental-webheaders-dog---oct-20.jpg" className={classes.image} /></div>
                    </Grid>
                    <Grid item xs={11}>
                        <Grid item xs={12}>
                            <ListItemText align="left" secondary={
                                <Typography className={classes.nickname}>
                                    장세원
                                </Typography>
                            }></ListItemText>
                        </Grid>

                        <ListItemText align="left" className={classes.chatContainer, classes.left}
                            primary={
                                <Typography className={classes.receivedMessage}>
                                    메시지1234
                                </Typography>
                            }
                            secondary={<Typography className={classes.notReadCountLeft}>{3}</Typography>}>
                        </ListItemText>
                        <ListItemText align="left" className={classes.createdAt} secondary={`15:47`}></ListItemText>
                    </Grid>
                </Grid>
            </ListItem>


            <ListItem key={2}>
                <Grid container>
                    <Grid item xs={12}>
                        <ListItemText align="right" className={classes.chatContainer, classes.right}
                            primary={
                                <Typography className={classes.myChatMessage}>
                                    메시지1234aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                    ddddddddddddddddddddddddddddddddddddddddddddddddd
                                </Typography>
                            }
                            secondary={<Typography className={classes.notReadCountRight}>{3}</Typography>}>
                        </ListItemText>
                    </Grid>
                </Grid>
            </ListItem>

            <ListItem key={3}>
                <Grid container>
                    <Grid item xs={12}>
                        <ListItemText align="right" className={classes.chatContainer, classes.right}
                            secondary={<Typography className={classes.notReadCountRight}>{3}</Typography>}
                            primary={
                                <Typography className={classes.myChatMessage}>
                                    test
                                </Typography>
                            }>
                        </ListItemText>
                        <ListItemText align="right" className={classes.createdAt} secondary={`15:47`}></ListItemText>
                    </Grid>
                </Grid>
            </ListItem>
        </List >
    );
}

const madeStyles = makeStyles({
    chatContainer: {
        display: "flex",
        flexDirection: "revert"
    },
    nickname: {
        fontWeight: "bolder",
        padding: "0 10px"
    },
    receivedMessage: {
        boxShadow: "2px 3px rgb(0 0 0 / 20%)",
        borderRadius: "5px",
        width: "fit-content",
        padding: "10px",
        backgroundColor: "#ffffff",
    },
    myChatMessage: {
        boxShadow: "3px 3px rgb(0 0 0 / 20%)",
        borderRadius: "5px",
        width: "fit-content",
        padding: "10px",
        backgroundColor: "#A1F1FF",
    },
    left: {
        marginRight: "30%",
        display: "flex"
    },
    right: {
        marginLeft: "30%",
        display: "flex",
        flexDirection: "row-reverse",
    },
    notReadCountLeft: {
        margin: "auto 0 0 10px",
        fontSize: "0.9em"
    },
    notReadCountRight: {
        margin: "auto 10px 0 0 ",
        fontSize: "0.9em"
    },
    createdAt: {
        padding: "0 0 0 10px",
    },
    imageWrapper: {
        padding: "auto"
    },
    image: {
        maxWidth: "50px",
        maxHeight: "50px",
        width: "100%",
        height: "100%",
        borderRadius: "100%",
    }
})