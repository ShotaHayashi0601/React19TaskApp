"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserUseCase = void 0;
class RegisterUserUseCase {
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async register(user) {
        return await this._userRepository.register(user);
    }
}
exports.RegisterUserUseCase = RegisterUserUseCase;
