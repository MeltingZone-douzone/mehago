const dbconn = require("./dbconn");
const util = require("util");


module.exports = {
    addNotice: async function (notice) {
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);
        try {
            return await query(
                " insert into notice values(null, ?,?,?,?, now())",
                [notice.participantNo, notice.chatRoomNo, notice.accountNo, notice.notice]
            );
        } catch (err) {
            console.error(err);
        } finally {
            conn.end();
        }
    }
}