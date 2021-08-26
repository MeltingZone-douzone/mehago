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
    AuthHeader = Object.assign(AuthHeader,{"Authorization": `Bearer ` + localStorage.get("token")});
}


export function loginApi(account) {
    return axios
        .post("/api/account/login", account, {
            headers: header
        })
        .then((res) => res);
}

export function signUpApi(user) {
    return axios.post("/api/account/signup", user, {headers:header})
                .then(res => res);
}

export function getUserInfoApi() {
    setAuthHeader();
    return axios.get("/api/account/get-user", { headers:AuthHeader})
                .then(res => res);
}


// 닉네임, 이메일, 전화번호 존재여부
export function isExistApi(name, value) { 
    return axios.post('/api/account/signup/valid/' + name,
                value,
                { headers: {"Content-Type": "text/plain"} })
                .then(response => response);
}

export function updateNicknameApi( newNickname ) {
    setAuthHeader();
    return axios.post("/api/account/update/nickname", newNickname, {headers:AuthHeader})
                .then(res => res);
}

export function updatePasswordApi( passwords ) {
    setAuthHeader();
    return axios.post("/api/account/update/password", passwords, {headers:AuthHeader})
                .then(res => res);
}

export function updateUserInfoApi( newUserInfo ) {
    setAuthHeader();
    return axios.post("/api/account/update/userInfo", newUserInfo, {headers:AuthHeader})
                .then(res => res);
}

// 토큰만 확인
export function checkingAuthenticateApi() {
    setAuthHeader();
    return axios.get("/api/account/authenticate", {headers:AuthHeader})
        .then(res =>  res.data.result === "success"? true : false);
}
