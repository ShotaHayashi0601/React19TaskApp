"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const userGateway_1 = require("./userGateway");
const userGateway = new userGateway_1.UserGateway();
class UserRepository {
    async register(user) {
        return await userGateway.register(user);
    }
}
exports.UserRepository = UserRepository;
