const dbconn = require("./dbconn");
const util = require("util");


module.exports = {
    addMessage: async function (message) {
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);
        try {
            console.log(message);
            return await query(
                "INSERT INTO message VALUES (null, ?, ?, ?, now(), ?)",
                [message.participantNo, message.message, message.notReadCount, message.chatRoomNo]
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
        //    if else
        try {
            // join 하는 경우에 
            if (participant.chatRoomNo !== null) {
                return await query(
                    `update message 
                     set not_read_count = not_read_count -1 
                     where no > ? 
                     and chat_room_no = ?`,
                    [participant.lastReadChatNo, participant.chatRoomNo]
                );
            }
            // send message를 받은 경우에 participant를 먼저 update 해 주고 not_read_count를 -1 해 준다.
            else {
                return await query(
                    `update message 
                     set not_read_count = not_read_count -1 
                     where no=?`,
                    [participant.lastReadChatNo]
                );
            }
        } catch (err) {
            console.error(err);
        } finally {
            conn.end();
        }
    },
    getMessageList: async function (chatRoomNo, messageNo) {
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);
        try {
            // 처음 fetch를 하면 0부터 20까지, 
            // 그 후로부터는 messageNo보다 작은 message를 0 부터 20까지??
            if (messageNo === undefined) {
                return await query(`SELECT m.no, m.participant_no as participantNo, m.message, 
                 m.not_read_count as notReadCount, m.created_at as createdAt, 
                 a.thumbnail_url as thumbnailUrl, p.chat_nickname as nickname 
            FROM
                message m, account a, participant p
            WHERE
                m.chat_room_no = ?
                AND
                m.participant_no = p.no
                AND
                p.account_no = a.no
                AND
                m.no < ?
            ORDER BY
                m.no DESC
            LIMIT 
                0,20`,
                    [chatRoomNo, messageNo]
                );
            } else {
                return await query(`SELECT m.no, m.participant_no as participantNo, m.message, 
                 m.not_read_count as notReadCount, m.created_at as createdAt, 
                 a.thumbnail_url as thumbnailUrl, p.chat_nickname as nickname 
            FROM
                message m, account a, participant p
            WHERE
                m.chat_room_no = ?
                AND
                m.participant_no = p.no
                AND
                p.account_no = a.no
            ORDER BY
                m.no DESC
            LIMIT 
                0,20`,
                    [chatRoomNo]
                );
            }
        } catch (err) {
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