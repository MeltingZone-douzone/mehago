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
    return axios.get(`/api/chat/roomInfo/${chatRoomNo}`, {headers: AuthHeader })
        .then(res => res);
}

export function getMessageList(chatRoomNo) {
    setAuthHeader();
    return axios.get(`/api/chat/getMessageList/${chatRoomNo}`, { headers: AuthHeader })
        .then(res => res);
}

export function addMessage(messageObject) {
    // return axios.post("/api/chat/addMessage", messageObject, { headers: AuthHeader })
    return axios.post("/message/addMessage", messageObject, { headers: AuthHeader })
        .then(res => res);
}


export function updateRead(participantObject, messageNo, roomObject) {
    participantObject.lastReadChatNo = messageNo;
    participantObject.chattingRoomNo = roomObject.no;
    return axios.post("/message/updateRead", participantObject)
        .then(res => res);
}

export function joinParticipant(participantNo, lastReadChatNo, roomNo) {
    const participant = { no: 0, lastReadChatNo: 0, chattingRoomNo: 0 };
    participant.no = participantNo;
    participant.lastReadChatNo = lastReadChatNo;
    participant.chatRoomNo = roomNo;
    return axios.post("/message/joinParticipant", participant);
}

export function getMyChatListApi() {
    setAuthHeader();
    return axios.get("/api/chat/participatingRoom", {headers: AuthHeader})
                .then(res => res);
}


