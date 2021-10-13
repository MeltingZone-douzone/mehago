import React, { Fragment } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent,  DialogTitle, makeStyles } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';

export default function Dialogs({ buttonFunction, todoOpen, noticeOpen, fileUploadOpen }) {

    const classes = madeStyle();
    return (
        <Fragment> 
            <Dialog open={noticeOpen} onClose={buttonFunction.handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={buttonFunction.handleNoticeSubmit}>
                    <DialogTitle className={classes.formDialogTitle} id="form-dialog-title">공지사항</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="공지사항"
                            placeholder="공지사항을 입력해주세요"
                            name="notice"
                            type="text"
                            autoFocus={true}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={buttonFunction.handleClose} color="primary">
                            취소
                        </Button>
                        <Button type="submit" color="primary">
                            등록
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <DropzoneDialog
                cancelButtonText={"취소"}
                submitButtonText={"등록"}
                maxFileSize={50000000} /**변경하기???? */
                open={fileUploadOpen}
                onClose={buttonFunction.handleClose}
                onSave={(files) => { buttonFunction.handleFileUploadSubmit(files) }}
                showPreviews={true}
                showFileNamesInPreview={true}
            />
        </Fragment>
    );
}

const madeStyle = makeStyles({
    formDialogTitle: {
        width: '500px'
    }
})