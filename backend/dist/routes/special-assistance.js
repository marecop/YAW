"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
function generateRequestNumber() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let requestNumber = 'SA';
    for (let i = 0; i < 2; i++) {
        requestNumber += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 6; i++) {
        requestNumber += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return requestNumber;
}
// 創建特殊協助請求
router.post('/', auth_1.requireAuth, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: '未登录' });
        }
        const { bookingId, assistanceType, description, specialRequirements } = req.body;
        if (!bookingId || !assistanceType) {
            return res.status(400).json({ error: '缺少必填字段' });
        }
        const requestNumber = generateRequestNumber();
        const booking = await prisma_1.prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                user: true,
                flight: true
            }
        });
        if (!booking) {
            return res.status(404).json({ error: '預訂不存在' });
        }
        const request = await prisma_1.prisma.specialAssistanceRequest.create({
            data: {
                requestNumber,
                type: assistanceType,
                status: 'PENDING',
                passengerName: booking.passengerName,
                email: booking.passengerEmail || booking.user.email,
                phone: booking.passengerPhone || '',
                bookingNumber: booking.bookingNumber,
                flightNumber: booking.flight.flightNumber,
                flightDate: booking.flightDate?.toISOString().split('T')[0] || '',
                details: JSON.stringify({
                    description: description || '',
                    specialRequirements: specialRequirements || ''
                })
            }
        });
        res.status(201).json(request);
    }
    catch (error) {
        console.error('Error creating special assistance request:', error);
        res.status(500).json({ error: '創建特殊協助請求失敗' });
    }
});
// 獲取特殊協助請求列表
router.get('/', auth_1.requireAuth, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: '未登录' });
        }
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: req.user.userId }
        });
        if (!user) {
            return res.status(404).json({ error: '用戶不存在' });
        }
        const requests = await prisma_1.prisma.specialAssistanceRequest.findMany({
            where: { email: user.email },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json(requests);
    }
    catch (error) {
        console.error('Error fetching special assistance requests:', error);
        res.status(500).json({ error: '獲取特殊協助請求失敗' });
    }
});
// 更新特殊協助請求狀態
router.put('/:id/status', auth_1.requireAuth, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: '未登录' });
        }
        const { id } = req.params;
        const { status } = req.body;
        const request = await prisma_1.prisma.specialAssistanceRequest.update({
            where: { id },
            data: { status }
        });
        res.json(request);
    }
    catch (error) {
        console.error('Error updating special assistance request:', error);
        res.status(500).json({ error: '更新特殊協助請求失敗' });
    }
});
exports.default = router;
//# sourceMappingURL=special-assistance.js.map