import React, { Fragment } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';

export default function Dialogs({ buttonFunction, todoOpen, noticeOpen, fileUploadOpen }) {
    return (
        <Fragment>
            <Dialog open={todoOpen} onClose={buttonFunction.handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={buttonFunction.handleTodoSubmit}>
                    <DialogTitle id="form-dialog-title">Todo</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="Insert your Todo"
                            name="todo"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={buttonFunction.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            등록하기
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Dialog open={noticeOpen} onClose={buttonFunction.handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={buttonFunction.handleNoticeSubmit}>
                    <DialogTitle id="form-dialog-title">Notice</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            공지사항을 입력하세요 ~~~~~!!!!
                        </DialogContentText>
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
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            등록하기
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <DropzoneDialog
                cancelButtonText={"cancel"}
                submitButtonText={"등록하기"}
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