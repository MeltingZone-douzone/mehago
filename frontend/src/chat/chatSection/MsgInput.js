import React, { Fragment, useState } from 'react';
import { ButtonGroup, Grid, Button, TextField, Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt, faBullhorn, faPaperclip } from "@fortawesome/free-solid-svg-icons";

export default function MsgInput({ message, messageFunction, buttonFunction, userInfo }) {
    const classes = madeStyles();
    const [visibleButton, setVisibleButton] = useState(false);

    const visibleButtonGroup = () => {
        if (visibleButton) {
            setVisibleButton(false);
        } else {
            setVisibleButton(true);
        }
    }

    return (
        <Fragment>
            <Grid container className={classes.gridContainer}>
                <Grid item xs={12} className={classes.ButtonContainer}>
                    {visibleButton ?
                        <ButtonGroup variant="contained" color="primary" size="large" aria-label="outlined primary button group" className={classes.buttonGroup} styles={{ boxShadow: 'none' }}>
                            <Button className={classes.button} onClick={buttonFunction.notice}><FontAwesomeIcon icon={faBullhorn} /></Button>
                            <Button className={classes.button} onClick={buttonFunction.fileupload}><FontAwesomeIcon icon={faPaperclip} /></Button>
                        </ButtonGroup>
                        : null}
                    {userInfo ?
                        <Fab color="primary" size="small" className={`${classes.uploads} ${classes.button}`} onClick={visibleButtonGroup}>
                            <AddIcon className={classes.button} />
                        </Fab>
                        : null
                    }
                    <form onSubmit={messageFunction.onSubmitMessage} className={classes.inputMsgContainer}>
                        <TextField 
                            className={classes.inputMsg}
                            id="message"
                            name="message"
                            placeholder="메세지를 입력하세요"
                            onChange={messageFunction.onChangeMessage}
                            InputProps={{ disableUnderline: true }}
                            fullWidth
                        />
                        <Button className={classes.button} type="submit" variant="contained" size="small" color="primary">
                            보내기
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Fragment>

    );
}
const madeStyles = makeStyles({
    ButtonContainer: {
        position: 'relative',
    },
    gridContainer: {
        padding: "0 20px",
    },
    buttonGroup: {
        boxShadow: "none",
        position: "absolute",
        top: "-40px",
        animation: " fadein 2s",
    },
    inputMsgContainer: {
        display: "flex",
        backgroundColor: "#e0e0e0",
        borderRadius: "25px",
        alignItems: "inherit"

    },
    uploads: {
        float: "left",
        marginRight: "10px",
    },
    button: {
        backgroundColor: '#1C90FC',
        borderRadius: '25px',
        '&:hover': {
            backgroundColor: '#0381f1'
        }
    },
    inputMsg: {
        marginLeft: '1em',
        marginTop: '0.25em',
        marginBottom: '0.25em',
        display: 'flex',
        alignItems: 'center'
    }
});

