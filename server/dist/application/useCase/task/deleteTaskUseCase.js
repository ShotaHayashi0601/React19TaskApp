"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTaskUseCase = void 0;
class DeleteTaskUseCase {
    constructor(_taskRepository) {
        this._taskRepository = _taskRepository;
    }
    async deleteOne(taskId) {
        return await this._taskRepository.deleteOne(taskId);
    }
}
exports.DeleteTaskUseCase = DeleteTaskUseCase;
