const message = require("../models/message");
const messageModel = require("../models/message");
const participantModel = require("../models/participant");

module.exports = {
    addMessage: async function (insertMsg) {
        const chatMember = 7;
        insertMsg.notReadCount = chatMember;
            
            const result = await messageModel.addMessage(insertMsg);
            if (result.affectedRows == 1) {
                insertMsg.no = result.insertId;
                // const results = await participantModel.addNotReadCount(req.body.chattingRoomNo);
            }

        return insertMsg;
    },

    updateRead: async function (participantObj) {
        await participantModel.updateLastReadChatNo(participantObj);
        const result = await participantModel.updateNotReadCountToZero(participantObj);
        if (result.serverStatus == 2) {
            const results = await messageModel.subStractNotReadCount(participantObj);
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

    }

};
