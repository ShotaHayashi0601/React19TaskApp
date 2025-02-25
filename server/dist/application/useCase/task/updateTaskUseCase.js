"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskUseCase = void 0;
class UpdateTaskUseCase {
    constructor(_taskRepository) {
        this._taskRepository = _taskRepository;
    }
    async updateOne(task) {
        return await this._taskRepository.updateOne(task);
    }
    async updateOrdersAndStatuses(tasks) {
        return await this._taskRepository.updateOrdersAndStatuses(tasks);
    }
}
exports.UpdateTaskUseCase = UpdateTaskUseCase;
