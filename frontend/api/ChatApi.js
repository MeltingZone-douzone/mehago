import axios from "axios";
import localStorage from "local-storage";

let AuthHeader = {
    "Context-Type": "application/json",
    "Accept": "application/json",
}

function setAuthHeader() {
    AuthHeader = Object.assign(AuthHeader, { "Authorization": localStorage.get("token") !== null ? `Bearer ` + localStorage.get("token") : "nonmember" });
}

function formDataHeader() {
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': "Bearer " + localStorage.get("token")
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
    setAuthHeader();
    return axios.get(`/api/chat/participants/${chatRoomNo}`, { headers: AuthHeader })
        .then(res => res);
}

export function getMyChatListApi() {
    setAuthHeader();
    return axios.get("/api/chat/participatingRoom", { headers: AuthHeader })
        .then(res => res);
}

export function getTodoList(chatRoomNo) { // offsetNo
    return axios.get(`/api/chat/todo/${chatRoomNo}`, { headers: AuthHeader })
        .then(res => res);
}

export function addTodo(todoObject) {
    return axios.post("/api/chat/todo", todoObject, { headers: AuthHeader })
        .then(res => res);
}

export function updateCheckTodo(todoNo) {
    return axios.put(`/api/chat/todo/${todoNo}`, {}, { headers: AuthHeader })
        .then(res => res)
}

export function removeTodo(todoNo) {
    return axios.delete(`/api/chat/todo/${todoNo}`, { headers: AuthHeader })
        .then(res => res)
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

export function fileUpload(roomNo, participantNo, files) {

    const formData = new FormData();

    files.forEach((file, index) => {
        formData.append(`files`, file);
    })
    formData.append('chatRoomNo', roomNo);
    formData.append('participantNo', participantNo);
    const filesObject = {
        chatRoomNo: roomNo,
        participantNo: participantNo,
    }
    // filesObject,
    return axios.post("/api/chat/fileUpload", formData,
        {
            header: {
                "content-type": "multipart/form-data",
                "Accept": "application/json",
            },
        }).then(res => res);
}

export function getSearchMessage(chatRoomNo, searchKeyword) {
    setAuthHeader();
    return axios.get("/api/chat/getSearchMessage?chatRoomNo="+ chatRoomNo +"&searchKeyword=" + searchKeyword, { headers: AuthHeader })
        .then(res => res);
}

// 겹치는거 정리해야 해
export function vaildatePassword(chatRoomNo, password) {
    const roomObject = {
        no: chatRoomNo,
        password: password
    }
    return axios.post(`/api/chat/vaildatePassword`, roomObject, { headers: AuthHeader }).then(res => res);
}

export function checkPasswordApi(no, password) {
    const passwordObject = { password };
    return axios.post(`/api/chat/checkPassword/${no}`, passwordObject, { headers: AuthHeader })
        .then(res => res);
}

export function nicknameValidation(chatRoomNo, chatNickname) {
    const nicknameObject = {chatRoomNo, chatNickname };
    return axios.post(`/api/chat/nicknameValidation`, nicknameObject , { headers: AuthHeader })
        .then(res => res);
}

export function enterRoomValidationApi(chatRoomNo, accountNo) { // FIXME: 함수명 바꾸기   방에 이미 입장해있는지 check
    return axios.get(`/api/chat/enterRoomValidation`, { params : { chatRoomNo, accountNo }, headers: AuthHeader})
        .then(res => res)
        .catch(e => console.log(e));
}


export function updateFavoriteRoomApi(chatRoomNo, favoriteStatus){
    setAuthHeader();
    const favoriteStatusObject = { "favoriteRoom": favoriteStatus };
    // console.log(favoriteStatusObject);
    return axios.post(`/api/chat/updateFavoriteRoom/${chatRoomNo}`, favoriteStatusObject, { headers: AuthHeader })
        .then(res => res);
}

export function getFavoriteRoomList(){
    setAuthHeader();
    return axios.get(`/api/chat/getFavoriteRoomList`, { headers: AuthHeader })
        .then(res => res);
}

export function exitRoomApi(chatRoomNo) {
    console.log(`exitRoomApi(${chatRoomNo})`);
    setAuthHeader();
    return axios.delete(`/api/chat/exitRoom/${chatRoomNo}`, { headers: AuthHeader })
        .then(res => res);
}

export function updateChatRoomInfo(roomObject) {
    return axios.post('/api/chat/updateChatRoomInfo', roomObject, { headers: formDataHeader() }).then(res => res);
}

export function changePassword(chatRoomNo, password, owner) {
    setAuthHeader();
    const roomObject = {
        no: chatRoomNo,
        password: password,
        owner: owner
    }
    return axios.post('/api/chat/changePassword', roomObject, { headers: AuthHeader }).then(res => res);
}
export function isExistsPasswords(no) {
    setAuthHeader();
    return axios.get(`/api/chat/isExistsPassword/${no}`, { headers: AuthHeader })
        .then(res => res);
}

export function deleteChatRoom(roomObject) {
    setAuthHeader();
    return axios.post('/api/chat/deleteChatRoom', roomObject, { headers: AuthHeader }).then(res => res);
}

export function getAllChatListApi(offset) {
    setAuthHeader();
    return axios.get('/api/chat/getAllChatList', { params : { offset }, headers: AuthHeader})
                .then(res => res);
}

export function keyword(searchValue) {
    return axios.get(`/api/chat/keywordSearch?searchValue=`+ searchValue , { headers: AuthHeader })
        .then(res => res);
}

export function getNotice(chatRoomNo) {
    setAuthHeader();
    return axios.get(`/api/chat/getNotice/${chatRoomNo}`, { headers: AuthHeader })
        .then(res => res);
}

export function deleteNotice(noticeNo) {
    setAuthHeader();
    return axios.delete(`/api/chat/deleteNotice/${noticeNo}`, { headers: AuthHeader })
        .then(res => res);
}

