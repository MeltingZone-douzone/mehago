import React, { Fragment } from 'react';
import { ButtonGroup, Grid, Button, TextField, Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt, faBullhorn, faPaperclip } from "@fortawesome/free-solid-svg-icons";

export default function MsgInput2({ message, messageFunction, buttonFunction }) {
    const classes = madeStyles();

    return (
        <Fragment>
            <Grid container className={classes.gridContainer}>
                {/* <ButtonGroup variant="contained" color="primary" size="large" aria-label="outlined primary button group" className={classes.buttonGroup} styles={fadeIn}>
                    <Button onClick={buttonFunction.todo}><FontAwesomeIcon icon={faListAlt} /></Button>
                    <Button onClick={buttonFunction.notice}><FontAwesomeIcon icon={faBullhorn} /></Button>
                    <Button onClick={buttonFunction.fileupload}><FontAwesomeIcon icon={faPaperclip} /></Button>
                </ButtonGroup> */}
                <Grid item xs={12}>
                    <Fab color="primary" size="small" className={classes.uploads}>
                        <AddIcon />
                    </Fab>
                    <form onSubmit={messageFunction.onSubmitMessage} className={classes.inputMsgContainer}>
                        <TextField
                            id="message"
                            name="message"
                            label="메세지를 입력하세요"
                            onChange={messageFunction.onChangeMessage}
                            fullWidth
                        />
                        <Button type="submit" variant="contained" size="small" color="primary" className={classes.margin}>
                            보내기
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Fragment>

    );
}
const madeStyles = makeStyles({
    gridContainer: {
        padding: "0 20px",
    },
    buttonGroup: {
        position: "absolute",
        bottom: "8vh",
        backgroundColor: "white",
        animation: " fadein 2s",
    },
    inputMsgContainer: {
        display: "flex",
        backgroundColor: "white",
    },
    uploads: {
        float: "left",
        margin: "10px 10px 0 10px",
    }
});
const fadeIn = `@keyframes fadein {
    from {
        opacity:0;
    }
    to {
        opacity:1;
    }
}`;

