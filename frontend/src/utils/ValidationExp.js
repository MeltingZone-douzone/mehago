export const ValidationExp = {
    emailExp : /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
    passwordExp : /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/,
    nameExp : /^[가-힣]{2,10}$/,
    nicknameExp :  /^[가-힣a-zA-Z]{2,20}$/,
    phoneNumberExp : /^01([0|1|6|7|8|9]{1})([0-9]{3,4})([0-9]{4})$/
}