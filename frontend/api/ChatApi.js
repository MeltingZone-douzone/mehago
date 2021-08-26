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