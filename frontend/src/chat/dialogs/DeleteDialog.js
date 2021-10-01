import React from "react";
import styled from 'styled-components';
import { Dialog, Button, makeStyles } from '@material-ui/core';
import TextareaAutoSize from "../../components/TextAreaAutoSize";

export default function DeleteDialog({ reason, deleteDialog, deleteFunction }) {
    const classes = madeStyles();
    return (
        <Dialog open={deleteDialog} onClose={deleteFunction.close} aria-labelledby="form-dialog-title">
            <DeleteDialogTemplate>
                <DeleteDialogTitle>
                    <div>채팅방 삭제</div>
                </DeleteDialogTitle>
                <DeleteDialogContent>
                    <div>
                        <TextareaAutoSize 
                            placeholder={"채팅방을 삭제하는 이유를 적어주세요..."}
                            name="deleteReason"
                            maxRows={20}
                            minRows={1}
                            textValue={reason}
                            handleChange = {deleteFunction.handleDeleteReason}/>
                        <DescriptionDiv>
                            참여자들에게 알림으로 마지막 메세지가 전달됩니다.
                        </DescriptionDiv>
                    </div>
                </DeleteDialogContent>
                <DeleteDialogButtonArea>
                    <Button className={classes.root} variant={"outlined"} color={"secondary"} onClick={deleteFunction.close}>취소</Button>
                    <Button className={classes.root} variant={"contained"} color={"secondary"} onClick={deleteFunction.deleteChatRoom}>채팅방 삭제하기</Button>
                </DeleteDialogButtonArea>
            </DeleteDialogTemplate>
        </Dialog>
    );
}

const madeStyles = makeStyles({
    root: {
        height: "45px",
        margin:"auto 0",
        marginRight: "10px",
        fontWeight: "bold"
    }
})

const DeleteDialogTemplate = styled.div`
    display: flex;
    flex-direction: column;
    width:400px;
    
    max-height: 1000px;
`

const DeleteDialogTitle = styled.div`
    width:100%;
    height:60px;
    border-bottom: 1px solid #f50057;

    div {
        margin: 15px;
        font-size: 1.5rem;
        font-weight: bold;
        color: #f50057;
    }
`

const DeleteDialogContent = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;

    div { 
        padding:10px;
    }
`

const DeleteDialogButtonArea = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 80px;
    border-top: 1px solid #eee;
`

const DescriptionDiv = styled.div`
    border-top: 1px solid #eee;
    font-size:.9rem;
`