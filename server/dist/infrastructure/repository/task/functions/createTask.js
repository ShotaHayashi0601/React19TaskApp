"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = void 0;
const db_1 = require("../../../../lib/db");
const createTask = async (task) => {
    return await db_1.db.task.create({ data: task });
};
exports.createTask = createTask;
