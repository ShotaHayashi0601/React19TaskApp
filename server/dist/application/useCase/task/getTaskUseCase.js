"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTaskUseCase = void 0;
class GetTaskUseCase {
    constructor(_taskRepository) {
        this._taskRepository = _taskRepository;
    }
    async findByUserId(userId) {
        return await this._taskRepository.findByUserId(userId);
    }
}
exports.GetTaskUseCase = GetTaskUseCase;
