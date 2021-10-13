const mysql = require("mysql2");

module.exports = function () {
        return mysql.createConnection({
                host: "localhost",
                port: 3306,
                user: "root",
                password: "asd003786",
                database: "mehago",
        });
};
