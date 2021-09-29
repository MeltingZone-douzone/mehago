import React, { Fragment } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent,  DialogTitle } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';

export default function Dialogs({ buttonFunction, todoOpen, noticeOpen, fileUploadOpen }) {
    return (
        <Fragment>
            <Dialog open={noticeOpen} onClose={buttonFunction.handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={buttonFunction.handleNoticeSubmit}>
                    <DialogTitle id="form-dialog-title">Notice</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="Insert your Notice"
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
                acceptedFiles={['image/jpeg', 'image/png', 'image/jpg']}
                onClose={buttonFunction.handleClose}
                onSave={(files) => { buttonFunction.handleFileUploadSubmit(files) }}
                showPreviews={true}
                showFileNamesInPreview={true}
            />
        </Fragment>
    );
}