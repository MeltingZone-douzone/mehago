import axios from "axios";
import localStorage from "local-storage";


let AuthHeader = {
    "Context-Type": "application/json",
    "Accept": "application/json",
}


function setAuthHeader() {
    AuthHeader = Object.assign(AuthHeader, { "Authorization": `Bearer ` + localStorage.get("token") });
}

export function createDeletedChatAlarmApi(alarm) {
    setAuthHeader();
    return axios.post("/api/alarm/deleted-chat/create", alarm, { headers: AuthHeader })
                .then(res => res);
}
