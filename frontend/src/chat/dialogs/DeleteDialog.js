import React from "react";
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, makeStyles } from '@material-ui/core';

export default function DeleteDialog({ deleteDialog, deleteFunction }) {
    const classes = styles();
    return (<Dialog open={deleteDialog} onClose={deleteFunction.close} aria-labelledby="form-dialog-title">
        <form onSubmit={deleteFunction.deleteChatRoom}>
            <DialogTitle id="form-dialog-title" className={classes.header}>채팅방 삭제</DialogTitle>
            <DialogContent>
                <DialogContentText className={classes.body}>
                    채팅방을 삭제하시겠습니까?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={deleteFunction.close} color="primary">
                    취소
                </Button>
                <Button type="submit" color="secondary">
                    삭제하기
                </Button>
            </DialogActions>
        </form>
    </Dialog>
    );
}

const styles = makeStyles({
    header: {
        backgroundColor: "red",
        color: "white",
    },
    body: {
        marginTop: "10px",
        color: "red",

    },
});