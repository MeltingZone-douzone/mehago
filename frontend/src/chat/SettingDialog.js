import React from "react";
import { Button, TextField, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

export default function SettingDialog({ passwordDialog, classes, passwordFunction, isCorrectPassword, isWrongPassword, password, vaildateNewPassword }) {

    return (
        <Dialog open={passwordDialog} onClose={passwordFunction.close} aria-labelledby="form-dialog-title">
            <form onSubmit={passwordFunction.passwordChangeSubmit}>
                <DialogTitle id="form-dialog-title">비밀번호 변경</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        현재 채팅방 비밀번호를 입력하고 변경할 비밀번호를 입력하세요.
                    </DialogContentText>
                    <TextField margin="dense" label="현재 비밀번호" name="password" type="password" fullWidth onChange={passwordFunction.isCorrectPassword}
                        helperText={password && !isCorrectPassword ? "비밀번호가 일치하지 않습니다." : null} />

                    <TextField margin="dense" label="변경할 비밀번호" name="newPassword" type="password" fullWidth onChange={passwordFunction.onChangeNewPassword} />
                    <TextField margin="dense" label="비밀번호 확인" name="vaildateNewPassword" type="password" fullWidth onChange={passwordFunction.isWrongPassword}
                        helperText={vaildateNewPassword && !isWrongPassword ? "변경할 비밀번호와 일치하지 않습니다." : null} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={passwordFunction.close} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        변경하기
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}