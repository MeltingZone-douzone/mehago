import { formatMs } from "@material-ui/core";
import axios from "axios";
import localStorage from "local-storage";

let AuthHeader = {
    "Context-Type": "application/json",
    "Accept": "application/json",
}

function setAuthHeader() {
    AuthHeader = Object.assign(AuthHeader, { "Authorization": localStorage.get("token") !== null ? `Bearer ` + localStorage.get("token") : "nonmember" });
}

export function CreateChattingRoom(chattiingRoom) {
    setAuthHeader();
    return axios.post("/api/chat/createRoom", chattiingRoom, { headers: AuthHeader })
        .then(res => res);
}

export function getParticipantInfo(chatRoomNo) {
    setAuthHeader();
    return axios.get(`/api/chat/participantInfo/${chatRoomNo}`, { headers: AuthHeader })
        .then(res => res);
}

export function getRoomInfo(chatRoomNo) {
    return axios.get(`/api/chat/roomInfo/${chatRoomNo}`, { headers: AuthHeader })
        .then(res => res);
}

export function getMessageList(chatRoomNo, offset) {
    console.log(`getMessageList() ${chatRoomNo} ${offset}`);
    setAuthHeader();
    return axios.get(`/api/chat/getMessageList/${chatRoomNo}`, { params: { offset }, headers: AuthHeader })
        .then(res => res);
}

export function getMyChatListApi() {
    setAuthHeader();
    return axios.get("/api/chat/participatingRoom", { headers: AuthHeader })
        .then(res => res);
}

export function addTodo(roomNo, participantNo, date, todo) {
    const todoObject = {
        chatRoomNo: roomNo,
        participantNo: participantNo,
        date: date,
        todo: todo,
    }
    return axios.post("/api/chat/addTodo", todoObject, { headers: AuthHeader })
        .then(res => res);
}

export function addNotice(roomNo, participantNo, notice) {
    const noticeObject = {
        chatRoomNo: roomNo,
        participantNo: participantNo,
        notice: notice,
    }
    return axios.post("/api/chat/addNotice", noticeObject, { headers: AuthHeader })
        .then(res => res);
}

export function fileUpload(roomNo, participantNo, files) {

    const formData = new FormData();

    files.forEach((file, index) => {
        formData.append(`files`, file);
    })
    formData.append('chatRoomNo', roomNo);
    formData.append('participantNo', participantNo);
    const filesObject = {
        chatRoomNo: roomNo,
        participantNo: participantNo,
    }
    // filesObject,
    return axios.post("/api/chat/fileUpload", formData,
        {
            header: {
                "content-type": "multipart/form-data",
                "Accept": "application/json",
            },
        }).then(res => res);
}

export function getSearchMessage(searchKeyword) {
    console.log(searchKeyword);
    setAuthHeader();
    return axios.get("/api/chat/getSearchMessage?searchKeyword=" + searchKeyword, { headers: AuthHeader })
        .then(res => res);
}


