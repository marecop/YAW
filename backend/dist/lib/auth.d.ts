interface TokenPayload {
    userId: string;
    email: string;
    name: string;
}
/**
 * 验证 JWT token 并返回用户信息
 */
export declare function verifyToken(token: string): Promise<TokenPayload | null>;
/**
 * 从用户信息生成用户对象（兼容现有代码）
 */
export declare function createUserFromToken(payload: TokenPayload): {
    id: string;
    email: string;
    name: string;
};
export {};
//# sourceMappingURL=auth.d.ts.map