"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSingleTask = void 0;
const db_1 = require("../../../../lib/db");
/**
 * 🏃 `createdAt` を更新対象から除外してタスクを更新
 */
const updateSingleTask = async (task) => {
    // ✅ createdAt を除外し、TaskUpdateInput 型を明示
    const { createdAt, ...exceptCreatedAt } = task;
    const updateTask = exceptCreatedAt;
    return await db_1.db.task.update({
        where: { id: task.id },
        data: updateTask, // ✅ createdAt を含まないデータを使用
    });
};
exports.updateSingleTask = updateSingleTask;
