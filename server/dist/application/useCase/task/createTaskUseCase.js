"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskUseCase = void 0;
class CreateTaskUseCase {
    constructor(_taskRepository) {
        this._taskRepository = _taskRepository;
    }
    async create(task) {
        return await this._taskRepository.create(task);
    }
}
exports.CreateTaskUseCase = CreateTaskUseCase;
