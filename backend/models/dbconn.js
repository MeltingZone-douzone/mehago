const mysql = require("mysql2");

module.exports = function () {
        return mysql.createConnection({
                host: "localhost",
                port: 3306,
                user: "bookmall_local",
                password: "bookmall_local",
                database: "mehago",
        });
};
