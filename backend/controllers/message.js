const message = require("../models/message");
const messageModel = require("../models/message");
const participantModel = require("../models/participant");

module.exports = {
    addMessage: async function (insertMsg) {
        console.log("insertMsg", insertMsg);
        const result = await messageModel.addMessage(insertMsg);
        console.log(result ,": affectedRows");
        if (result.affectedRows == 1 ) {
            insertMsg.no = result.insertId;
            await participantModel.addNotReadCount(insertMsg.chatRoomNo);
        }
        return insertMsg;
    },

    updateRead: async function (participantObj) {
        await participantModel.updateLastReadChatNo(participantObj);
        const result = await participantModel.updateNotReadCountToZero(participantObj); // 안읽은메시지(빨간원)을 0으로 만듦
        if (result.serverStatus == 2) { // TODO:YJ serverStatus뭐지
            const results = await messageModel.subStractNotReadCount(participantObj);   // 메시지를 내가 읽으니까 -1 함(다른사람도 보여져야하니까)
            return results.changedRows;
        }
    },

    joinParticipant: async function (req, res) {
        const participant = req.body;
        // 먼저 substract를 해 주고
        const results = messageModel.subStractNotReadCount(participant);
        // participant의 not_read_count를 0으로, last_read_count를 채팅방 마지막 번호로
        await participantModel.updateLastReadChatNo(participant);
        const result = await participantModel.updateNotReadCountToZero(participant);
        console.log(result);

    },
    leaveRoom : async function (chatRoomNo) {
        console.log(chatRoomNo);
    }

};
