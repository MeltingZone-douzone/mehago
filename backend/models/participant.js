const dbconn = require("./dbconn");
const util = require("util");


module.exports = {
    updateLastReadChatNo: async function (participant) {
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);
        try {
            // send message를 받은 경우에,join 할 때 
            // lastReadNo를 변경
            return await query(
                "update participant set last_read_chat_no = (select ifnull(max(no),0) from message where chat_room_no = ?) where no = ?",
                [participant.chatRoomNo, participant.no]
            );

        } catch (err) {
            console.error(err);
        } finally {
            conn.end();
        }
    },
    updateNotReadCountToZero: async function (participant) {
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);
        try {
            // send message를 받은 경우에,join 할 때 
            // notReadCount를 0으로 변경
            return await query(
                "update participant set not_read_count=0 where no = ?",
                [participant.no]
            );

        } catch (err) {
            console.error(err);
        } finally {
            conn.end();
        }
    },
    addNotReadCount: async function (chatRoomNo) {
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);
        try {
            // add message 시 해당 방의 참가자들의 not_read_count를 +1 해 준다.
            return await query(
                "update participant set not_read_count = not_read_count +1 where chat_room_no= ?",
                [chatRoomNo]
            );
        } catch (err) {
            console.error(err);
        } finally {
            conn.end();
        }
    },
}