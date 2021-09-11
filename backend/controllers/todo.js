const todoModel = require("../models/todo");

module.exports = {
    addTodo: async function (todoObject) {
        const result = await todoModel.addTodo(todoObject);
        if (result.affectedRows == 1) {
            todoObject.no = result.insertId;
        }
        return todoObject;
    }
}