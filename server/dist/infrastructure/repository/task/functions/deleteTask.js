"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = void 0;
const db_1 = require("../../../../lib/db");
const deleteTask = (taskId) => {
    return db_1.db.task.delete({
        where: {
            id: taskId,
        },
    });
};
exports.deleteTask = deleteTask;
