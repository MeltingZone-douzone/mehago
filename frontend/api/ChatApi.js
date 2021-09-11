import axios from "axios";
import localStorage from "local-storage";

let AuthHeader = {
    "Context-Type": "application/json",
    "Accept": "application/json",
}

function setAuthHeader() {
    AuthHeader = Object.assign(AuthHeader, { "Authorization": localStorage.get("token") !== null ? `Bearer ` + localStorage.get("token") : "nonmember" });
}

function formDataHeader(){
    const headers={
      'Content-Type': 'multipart/form-data',
      'Authorization': "Bearer "+ localStorage.get("token")
    }
  
    return headers;
}


export function CreateChattingRoom(chatRoom) {
    setAuthHeader();
    return axios.post("/api/chat/createRoom", chatRoom, { headers: formDataHeader() })
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
    setAuthHeader();
    return axios.get(`/api/chat/getMessageList/${chatRoomNo}`, { params: { offset }, headers: AuthHeader })
        .then(res => res);
}

export function getParticipantsList(chatRoomNo) {
    console.log(chatRoomNo);
    setAuthHeader();
    return axios.get(`/api/chat/participants/${chatRoomNo}`, { headers: AuthHeader})
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

export function getSearchMessage(searchKeyword) {
    setAuthHeader();
    return axios.get("/api/chat/getSearchMessage?searchKeyword=" + searchKeyword, { headers: AuthHeader })
        .then(res => res);
}

export function isExistsPasswords(no){
    setAuthHeader();
    return axios.get(`/api/chat/isExistsPassword/${no}`, { headers: AuthHeader })
        .then(res => res);
}

export function checkPassword(no, password) {
    const passwordObject = { password };
    return axios.post(`/api/chat/checkPassword/${no}`, passwordObject , { headers: AuthHeader })
        .then(res => res);
}

export function nicknameValidation(chatRoomNo, chatNickname) {
    console.log(chatRoomNo, chatNickname);
    const nicknameObject = {chatRoomNo, chatNickname };
    console.log(nicknameObject);
    return axios.post(`/api/chat/nicknameValidation`, nicknameObject , { headers: AuthHeader })
        .then(res => res);
}
