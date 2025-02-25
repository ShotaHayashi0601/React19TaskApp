"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskGateway = void 0;
const createTask_1 = require("./functions/createTask");
const getUserTasks_1 = require("./functions/getUserTasks");
const updateSingleTask_1 = require("./functions/updateSingleTask");
const deleteTask_1 = require("./functions/deleteTask");
const updateOrdersAndStatuses_1 = require("./functions/updateOrdersAndStatuses");
class TaskGateway {
    async create(task) {
        const createdTask = await (0, createTask_1.createTask)(task);
        return createdTask;
    }
    async updateOne(task) {
        const updatedTask = await (0, updateSingleTask_1.updateSingleTask)(task);
        return updatedTask;
    }
    async updateOrdersAndStatuses(tasks) {
        const updatedTasks = await (0, updateOrdersAndStatuses_1.updateOrdersAndStatuses)(tasks);
        return updatedTasks;
    }
    async findByUserId(userId) {
        const tasks = await (0, getUserTasks_1.getUserTasks)(userId);
        return tasks;
    }
    async deleteOne(taskId) {
        const tasks = await (0, deleteTask_1.deleteTask)(taskId);
        return tasks;
    }
}
exports.TaskGateway = TaskGateway;
