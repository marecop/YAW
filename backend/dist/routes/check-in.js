"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../lib/prisma");
const router = express_1.default.Router();
// 值機
router.post('/', async (req, res) => {
    try {
        const { bookingId, seatNumber } = req.body;
        if (!bookingId || !seatNumber) {
            return res.status(400).json({ message: '缺少必要參數' });
        }
        const booking = await prisma_1.prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                flight: true,
            },
        });
        if (!booking) {
            return res.status(404).json({ message: '找不到預訂記錄' });
        }
        if (booking.checkedIn) {
            return res.status(400).json({ message: '該預訂已完成值機' });
        }
        // 檢查值機時間窗口（48小時限制）
        let flightDateStr;
        if (booking.flightDate) {
            flightDateStr = booking.flightDate.toISOString().split('T')[0];
        }
        else {
            flightDateStr = new Date().toISOString().split('T')[0];
        }
        const departureTimeStr = booking.flight.departureTime;
        const [hour, minute] = departureTimeStr.split(':').map(Number);
        const departureDateTime = new Date(flightDateStr);
        departureDateTime.setHours(hour, minute, 0, 0);
        const now = new Date();
        const hoursUntilDeparture = (departureDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
        if (hoursUntilDeparture < 0) {
            return res.status(400).json({ message: '航班已起飛，無法值機' });
        }
        if (hoursUntilDeparture > 48) {
            return res.status(400).json({ message: '值機時間未到，請在航班起飛前48小時內值機' });
        }
        // 更新預訂
        const updatedBooking = await prisma_1.prisma.booking.update({
            where: { id: bookingId },
            data: {
                checkedIn: true,
                seatNumber: seatNumber,
            },
            include: {
                flight: true,
            },
        });
        res.json({
            message: '值機成功',
            booking: updatedBooking
        });
    }
    catch (error) {
        console.error('Error checking in:', error);
        res.status(500).json({ message: '值機失敗' });
    }
});
// 搜索值機
router.get('/search', async (req, res) => {
    try {
        const { bookingNumber, passengerEmail } = req.query;
        if (!bookingNumber && !passengerEmail) {
            return res.status(400).json({ error: '請提供預訂號或乘客郵箱' });
        }
        const where = {};
        if (bookingNumber) {
            where.bookingNumber = bookingNumber;
        }
        if (passengerEmail) {
            where.passengerEmail = passengerEmail;
        }
        const bookings = await prisma_1.prisma.booking.findMany({
            where,
            include: {
                flight: true,
            },
        });
        res.json(bookings);
    }
    catch (error) {
        console.error('Error searching check-in:', error);
        res.status(500).json({ error: '搜索值機失敗' });
    }
});
exports.default = router;
//# sourceMappingURL=check-in.js.map