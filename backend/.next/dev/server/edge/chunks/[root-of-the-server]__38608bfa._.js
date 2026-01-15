(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__38608bfa._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/Documents/Yellow Airlines/yellow-airlines/backend/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Yellow__Airlines$2f$yellow$2d$airlines$2f$backend$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/Yellow Airlines/yellow-airlines/backend/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Yellow__Airlines$2f$yellow$2d$airlines$2f$backend$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Yellow Airlines/yellow-airlines/backend/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
function middleware(request) {
    // 允許的前端域名（從環境變數讀取，或使用默認值）
    const allowedOrigins = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',').map((url)=>url.trim()) : [
        'http://localhost:3000',
        'https://*.vercel.app',
        /^https:\/\/.*\.vercel\.app$/,
        /^https:\/\/.*\.vercel\.dns$/
    ];
    const origin = request.headers.get('origin');
    const isAllowedOrigin = origin && allowedOrigins.some((allowed)=>{
        if (typeof allowed === 'string') {
            if (allowed.includes('*')) {
                const pattern = allowed.replace(/\*/g, '.*');
                return new RegExp(`^${pattern}$`).test(origin);
            }
            return origin === allowed;
        } else if (allowed instanceof RegExp) {
            return allowed.test(origin);
        }
        return false;
    });
    // 處理 CORS
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Yellow__Airlines$2f$yellow$2d$airlines$2f$backend$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    if (isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin);
    }
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Max-Age', '86400');
    // 處理 OPTIONS 預檢請求
    if (request.method === 'OPTIONS') {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Yellow__Airlines$2f$yellow$2d$airlines$2f$backend$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"](null, {
            status: 200,
            headers: response.headers
        });
    }
    return response;
}
const config = {
    matcher: '/api/:path*'
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__38608bfa._.js.map