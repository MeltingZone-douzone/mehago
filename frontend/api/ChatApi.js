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

export function getParticipantNo(chattingRoomNo) {
    setAuthHeader();
    const message = { chattingRoomNo }
    return axios.post("/api/chat/participantNo", message, { headers: AuthHeader })
        .then(res => res);
}

export function addMessage(messageObject) {
    // console.log(messageObject);
    return axios.post("/api/chat/addMessage", messageObject, { headers: AuthHeader })
        .then(res => res);
}

export function updateNotReadCount(messageObject) {
    return axios.post("/api/chat/updateNotReadCount", messageObject)
        .then(res => res);
}

