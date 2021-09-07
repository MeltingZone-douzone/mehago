import React from 'react';
import { TextField, Fab, makeStyles } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';


export default function MsgInput2({ messageFunction }) {
    const classes = madeStyles();

    return (
        <div>
            <form onSubmit={messageFunction.onSubmitMessage} className={classes.inputMsgContainer}>
                <TextField
                    id="message"
                    name="message"
                    label="메시지를 입력하세요"
                    onChange={messageFunction.onChangeMessage}
                    fullWidth
                />
                <Fab type="submit" color="primary" aria-label="보내기"><SendIcon /></Fab>
            </form>
        </div>
    );
}
const madeStyles = makeStyles({
    inputMsgContainer: {
        display: "flex",
        backgroundColor: "white",
    }
});