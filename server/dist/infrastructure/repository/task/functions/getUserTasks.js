"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTasks = void 0;
const db_1 = require("../../../../lib/db");
const getUserTasks = async (userId) => {
    return await db_1.db.task.findMany({
        where: {
            userId: userId,
        },
        include: {
            user: true,
        },
        orderBy: {
            order: 'asc',
        },
    });
};
exports.getUserTasks = getUserTasks;
