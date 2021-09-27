const mysql = require("mysql2");

module.exports = function () {
        return mysql.createConnection({
                host: "192.168.80.112",
                port: 3307,
                user: "mehago",
                password: "mehago",
                database: "mehago",
        });
};
