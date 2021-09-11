const dbconn = require("./dbconn");
const util = require("util");


module.exports = {
    addTodo: async function (todo) {
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);
        try {
            return await query(
                " insert into todo values(null, ?,?,?,?, false)",
                [todo.participantNo, todo.chatRoomNo, todo.todo, todo.date]
            );
        } catch (err) {
            console.error(err);
        } finally {
            conn.end();
        }
    }
}