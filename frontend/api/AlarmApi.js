import axios from "axios";
import localStorage from "local-storage";


let AuthHeader = {
    "Context-Type": "application/json",
    "Accept": "application/json",
}


function setAuthHeader() {
    AuthHeader = Object.assign(AuthHeader, { "Authorization": `Bearer ` + localStorage.get("token") });
}

export function createDeletedChatAlarmApi(alarmData) {
    setAuthHeader();
    return axios.post("/api/alarm/deleted-chat/create", alarmData, { headers: AuthHeader })
        .then(res => res);
}

export function getAlarmsApi() {
    setAuthHeader();
    return axios.get("/api/alarm/getAlarms", { headers: AuthHeader })
        .then(res => res);
}

export function updateAlarmsApi() {
    setAuthHeader();
    return axios.get(`/api/alarm/update/read`, { headers: AuthHeader })
        .then(res => res);
}