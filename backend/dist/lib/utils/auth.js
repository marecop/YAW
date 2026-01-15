"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
exports.getAuthToken = getAuthToken;
exports.getUser = getUser;
exports.logout = logout;
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'yellow-airlines-secret-key';
function verifyToken(token) {
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, JWT_SECRET);
        return decoded;
    }
    catch (error) {
        return null;
    }
}
function getAuthToken() {
    if (typeof window === 'undefined')
        return null;
    return localStorage.getItem('token');
}
function getUser() {
    if (typeof window === 'undefined')
        return null;
    const userStr = localStorage.getItem('user');
    if (!userStr)
        return null;
    try {
        return JSON.parse(userStr);
    }
    catch {
        return null;
    }
}
function logout() {
    if (typeof window === 'undefined')
        return;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
}
function isAuthenticated() {
    const token = getAuthToken();
    if (!token)
        return false;
    const payload = verifyToken(token);
    return payload !== null;
}
//# sourceMappingURL=auth.js.map