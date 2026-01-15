"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// 處理積分（定時任務）
router.post('/process-points', async (req, res) => {
    try {
        // 這裡可以添加處理積分的邏輯
        // 例如：根據飛行記錄自動添加積分
        res.json({ message: '積分處理完成' });
    }
    catch (error) {
        console.error('Error processing points:', error);
        res.status(500).json({ error: '處理積分失敗' });
    }
});
exports.default = router;
//# sourceMappingURL=cron.js.map