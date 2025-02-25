"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const taskGateway_1 = require("./taskGateway");
const taskGateway = new taskGateway_1.TaskGateway();
class TaskRepository {
    async create(task) {
        return await taskGateway.create(task);
    }
    async updateOne(task) {
        return await taskGateway.updateOne(task);
    }
    async updateOrdersAndStatuses(task) {
        return await taskGateway.updateOrdersAndStatuses(task);
    }
    async findByUserId(userId) {
        return await taskGateway.findByUserId(userId);
    }
    async deleteOne(taskId) {
        return await taskGateway.deleteOne(taskId);
    }
}
exports.TaskRepository = TaskRepository;
