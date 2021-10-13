const dbconn = require("./dbconn");
const util = require("util");


module.exports = {
    addMessage: async function (message) {
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);
        try {
            console.log(message);
            return await query(
                "INSERT INTO message VALUES (null, ?, ?, ?, now(), ?, ?)",
                [message.participantNo, message.message, message.notReadCount, message.chatRoomNo, message.state]
            );
        } catch (err) {
            console.error(err);
        } finally {
            conn.end();
        }
    },
    addMessageUpdate: async function (message) {
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);
        try {
            // selectKey notReadCount
            return await query(
                `update message 
                 set not_read_count = (select count(*) 
                                        from participant 
                                        where chat_room_no= ? }) 
                where no =?`,
                [message.chatRoomNo, message.no]
            );
        } catch (err) {
            console.error(err);
        } finally {
            conn.end();
        }
    },
    subStractNotReadCount: async function (participant) {
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);
        try {
            // join 하는 경우에 TODO:YJ no> ?는 왜
                return await query(
                    `update message 
                     set not_read_count = not_read_count -1 
                     where no > ? 
                     and chat_room_no = ?`,
                    [participant.lastReadChatNo, participant.chatRoomNo]
                );
            }       
         catch (err) {
            console.error(err);
        } finally {
            conn.end();
        }
    },
    getChatMember: async function (chatRoomNo) {
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);
        try {
            return await query(
                "SELECT count(*) as notReadCount from participant where chat_room_no = ?",
                [chatRoomNo]
            );
        } catch (err) {
            console.error(err);
        } finally {
            conn.end();
        }
    },
}