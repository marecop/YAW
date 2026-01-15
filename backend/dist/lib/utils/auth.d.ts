export interface JWTPayload {
    userId: string;
    email: string;
}
export declare function verifyToken(token: string): JWTPayload | null;
export declare function getAuthToken(): string | null;
export declare function getUser(): any;
export declare function logout(): void;
export declare function isAuthenticated(): boolean;
//# sourceMappingURL=auth.d.ts.map