import axios from "axios";
import localStorage from "local-storage";

const header = {
    "Context-Type": "application/json",
    "Accept": "application/json",
}

const headerWithAuth = {
    "Context-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ` + localStorage.get("token")

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
    return axios.get("/api/account/get-user", { headers: headerWithAuth })
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
    return axios.post("/api/account/update/nickname", newNickname, {headers:headerWithAuth})
                .then(res => res);
}

export function updatePasswordApi( passwords ) {
    return axios.post("/api/account/update/password", passwords, {headers:headerWithAuth})
                .then(res => res);
}

export function updateUserInfoApi( newUserInfo ) {
    console.log(newUserInfo);
    return axios.post("/api/account/update/userInfo", newUserInfo, {headers:headerWithAuth})
                .then(res => res);
}
