"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const svix_1 = require("svix");
const http_exception_1 = require("hono/http-exception");
const dotenv = __importStar(require("dotenv"));
const userRepository_1 = require("../../infrastructure/repository/user/userRepository");
const registerUserUseCase_1 = require("../../application/useCase/user/registerUserUseCase");
dotenv.config();
const registerUserUseCase = new registerUserUseCase_1.RegisterUserUseCase(new userRepository_1.UserRepository());
const webhookRouter = new hono_1.Hono();
webhookRouter.post('/', async (c) => {
    const SIGNING_SECRET = process.env.SIGNING_SECRET;
    if (!SIGNING_SECRET) {
        console.error('シークレットが設定されていません');
        throw new http_exception_1.HTTPException(500, {
            message: 'シークレットが設定されていません',
        });
    }
    const payload = await c.req.text();
    // Svixヘッダーの取得
    const svix_id = c.req.header('svix-id');
    const svix_timestamp = c.req.header('svix-timestamp');
    const svix_signature = c.req.header('svix-signature');
    // ヘッダーが存在しない場合はエラーを返す
    if (!svix_id || !svix_timestamp || !svix_signature) {
        console.error('Error: Svix ヘッダが存在しません');
        throw new http_exception_1.HTTPException(400, { message: 'Svixヘッダが存在しません' });
    }
    const svix = new svix_1.Webhook(SIGNING_SECRET);
    let evt;
    try {
        evt = svix.verify(payload, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        });
    }
    catch (err) {
        console.error('シグネチャの認証に失敗しました:', err);
        throw new http_exception_1.HTTPException(400, { message: '不正なシグネチャです' });
    }
    const eventType = evt.type;
    const data = evt.data;
    if (eventType === 'user.created' || eventType === 'user.updated') {
        const user = {
            id: data.id,
            email: data.email_addresses[0].email_address,
            name: `${data.first_name} ${data.last_name}`,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await registerUserUseCase.register(user);
    }
    return c.json({ success: true, message: 'Webhookを受信しました' });
});
exports.default = webhookRouter;
