"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
exports.createUserFromToken = createUserFromToken;
const jsonwebtoken_1 = require("jsonwebtoken");
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'yellow-airlines-secret-key';
/**
 * 验证 JWT token 并返回用户信息
 */
async function verifyToken(token) {
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, JWT_SECRET);
        return decoded;
    }
    catch (error) {
        console.error('Token 验证失败:', error);
        return null;
    }
}
/**
 * 从用户信息生成用户对象（兼容现有代码）
 */
function createUserFromToken(payload) {
    return {
        id: payload.userId,
        email: payload.email,
        name: payload.name
    };
}
//# sourceMappingURL=auth.js.map