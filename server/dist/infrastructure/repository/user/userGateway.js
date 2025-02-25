"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGateway = void 0;
const db_1 = require("../../../lib/db");
class UserGateway {
    async register(user) {
        const upsertedUser = await db_1.db.user.upsert({
            where: { id: user.id }, // idを基準に存在確認
            update: {
                email: user.email,
                name: user.name,
                updatedAt: new Date(), // 更新時刻を反映
            },
            create: {
                id: user.id,
                email: user.email,
                name: user.name,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        return Promise.resolve(upsertedUser);
    }
}
exports.UserGateway = UserGateway;
