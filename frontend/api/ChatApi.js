import axios from "axios";
import localStorage from "local-storage";

let AuthHeader = {
    "Context-Type": "application/json",
    "Accept": "application/json",
}

function setAuthHeader() {
    AuthHeader = Object.assign(AuthHeader, { "Authorization": `Bearer ` + localStorage.get("token") });
}

export function CreateChattingRoom(chattiingRoom) {
    setAuthHeader();
    console.log(chattiingRoom);
    return axios.post("/api/chat/createRoom", chattiingRoom, { headers: AuthHeader })
        .then(res => res);
}

export function getParticipantInfo(chattingRoomNo) {
    setAuthHeader();
    // return axios.get("/api/chat/participantInfo?chattingRoomNo=" + chattingRoomNo, { headers: AuthHeader })
    return axios.get("/api/chat/participantInfo", { params: { chattingRoomNo } , headers: AuthHeader })
    .then(res => res);

    // 왜 이건 안됨 params 값은 controller로 넘어가는데 header가 안가 옵션이 틀린듯

    // const message ={ chattingRoomNo }
    // return axios.post("/api/chat/participantInfo", message, { headers: AuthHeader })
    //     .then(res => res);
}

export function getRoomInfo(chattingRoomNo) {
    return axios.get("/api/chat/roomInfo", { params: { chattingRoomNo }, headers: AuthHeader})
        .then(res => res);
}

export function getMessageList(chattingRoomNo) {
    setAuthHeader();
    return axios.get("/api/chat/getMessageList", { params: { chattingRoomNo }, headers: AuthHeader})
        .then(res => res);
}

export function addMessage(messageObject) {
    return axios.post("/api/chat/addMessage", messageObject, { headers: AuthHeader})
        .then(res => res);
}

