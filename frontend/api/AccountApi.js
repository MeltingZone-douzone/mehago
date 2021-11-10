import axios from "axios";
import localStorage from "local-storage";

const header = {
    "Context-Type": "application/json",
    "Accept": "application/json",
}

let AuthHeader = {
    "Context-Type": "application/json",
    "Accept": "application/json",
}

function setAuthHeader() {
    AuthHeader = Object.assign(AuthHeader, { "Authorization": `Bearer ` + localStorage.get("token") });
}

function formDataHeader() {
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': "Bearer " + localStorage.get("token")
    }

    return headers;
}

export function loginApi(account) {
    return axios
        .post("/api/account/login", account, {
            headers: header
        })
        .then((res) => res);
}

export function signUpApi(user) {
    return axios.post("/api/account/signup", user, { headers: header })
        .then(res => res);
}

export function getUserInfoApi() {
    setAuthHeader();
    return axios.get("/api/account/get-user", { headers: AuthHeader })
        .then(res => res);
}


// 닉네임, 이메일, 전화번호 존재여부
export function isExistApi(name, value) {
    return axios.post('/api/account/signup/valid/' + name,
        value,
        { headers: { "Content-Type": "text/plain" } })
        .then(response => response);
}

export function updateNicknameApi(newNickname) {
    setAuthHeader();
    return axios.post("/api/account/update/nickname", newNickname, { headers: AuthHeader })
        .then(res => res);
}

export function updatePasswordApi(passwords) {
    setAuthHeader();
    return axios.post("/api/account/update/password", passwords, { headers: AuthHeader })
        .then(res => res);
}

export function updateUserInfoApi(newUserInfo) {
    setAuthHeader();
    return axios.post("/api/account/update/userInfo", newUserInfo, { headers: AuthHeader })
        .then(res => res);
}

export function updateThumbnailApi(form) {
    return axios.post("/api/account/update/thumbnail", form, { headers: formDataHeader() })
        .then(res => res);
}



export function createNonMember() {
    return axios.get("/api/account/createNonMember", { headers: header })
        .then(res => res);
}

export function leaveMember(accountNo) {
    setAuthHeader();
    return axios.get(`/api/account/leaveMember/${accountNo}`, { headers: AuthHeader })
        .then(res => res);
}