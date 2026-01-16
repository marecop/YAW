"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
// 載入環境變數
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// 允許的前端域名
const getAllowedOrigins = () => {
    if (process.env.FRONTEND_URL) {
        const urls = process.env.FRONTEND_URL.split(',').map(url => url.trim());
        console.log('🌐 CORS: 從環境變數讀取允許的域名:', urls);
        return urls;
    }
    const defaults = [
        'http://localhost:3000',
        /^https:\/\/.*\.vercel\.app$/,
        /^https:\/\/.*\.vercel\.dns$/,
    ];
    console.log('🌐 CORS: 使用默認允許的域名:', defaults);
    return defaults;
};
// CORS 配置
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        const allowedOrigins = getAllowedOrigins();
        // 允許沒有 origin 的請求（如 Postman、curl、服務器端請求）
        if (!origin) {
            return callback(null, true);
        }
        // 檢查是否匹配允許的域名
        const isAllowed = allowedOrigins.some(allowed => {
            if (typeof allowed === 'string') {
                if (allowed.includes('*')) {
                    const pattern = allowed.replace(/\*/g, '.*');
                    return new RegExp(`^${pattern}$`).test(origin);
                }
                return origin === allowed;
            }
            else if (allowed instanceof RegExp) {
                return allowed.test(origin);
            }
            return false;
        });
        if (isAllowed) {
            callback(null, true);
        }
        else {
            // 記錄被拒絕的 origin 以便調試
            console.warn(`⚠️  CORS: Origin "${origin}" is not allowed. Allowed origins:`, allowedOrigins);
            // 返回錯誤，但不要拋出異常（讓 CORS 中間件處理）
            callback(null, false);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Length', 'Content-Type'],
    maxAge: 86400,
}));
// 中間件
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use((0, cookie_parser_1.default)());
// 健康檢查
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// API 路由
const auth_1 = __importDefault(require("./routes/auth"));
const flights_1 = __importDefault(require("./routes/flights"));
const bookings_1 = __importDefault(require("./routes/bookings"));
const flight_status_1 = __importDefault(require("./routes/flight-status"));
const admin_1 = __importDefault(require("./routes/admin"));
const notifications_1 = __importDefault(require("./routes/notifications"));
const special_assistance_1 = __importDefault(require("./routes/special-assistance"));
const check_in_1 = __importDefault(require("./routes/check-in"));
const rewards_1 = __importDefault(require("./routes/rewards"));
const immigration_1 = __importDefault(require("./routes/immigration"));
const boarding_pass_1 = __importDefault(require("./routes/boarding-pass"));
const users_1 = __importDefault(require("./routes/users"));
const email_1 = __importDefault(require("./routes/email"));
const cron_1 = __importDefault(require("./routes/cron"));
app.use('/api/auth', auth_1.default);
app.use('/api/flights', flights_1.default);
app.use('/api/bookings', bookings_1.default);
app.use('/api/flight-status', flight_status_1.default);
app.use('/api/admin', admin_1.default);
app.use('/api/notifications', notifications_1.default);
app.use('/api/special-assistance', special_assistance_1.default);
app.use('/api/check-in', check_in_1.default);
app.use('/api/rewards', rewards_1.default);
app.use('/api/immigration', immigration_1.default);
app.use('/api/boarding-pass', boarding_pass_1.default);
app.use('/api/users', users_1.default);
app.use('/api', email_1.default);
app.use('/api/cron', cron_1.default);
// 404 處理
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});
// 錯誤處理
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error',
    });
});
// 啟動服務器
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/health`);
    console.log(`🔒 CORS 配置:`);
    const allowedOrigins = getAllowedOrigins();
    allowedOrigins.forEach((origin, index) => {
        if (typeof origin === 'string') {
            console.log(`   ${index + 1}. ${origin}`);
        }
        else {
            console.log(`   ${index + 1}. ${origin.toString()}`);
        }
    });
    if (process.env.FRONTEND_URL) {
        console.log(`   ✅ 使用環境變數 FRONTEND_URL`);
    }
    else {
        console.log(`   ⚠️  未設置 FRONTEND_URL，使用默認配置`);
        console.log(`   💡 提示: 設置 FRONTEND_URL 環境變數以允許你的前端域名`);
    }
});
//# sourceMappingURL=server.js.map