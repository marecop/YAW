"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// 所有 admin 路由都需要管理員權限
router.use(auth_1.requireAdmin);
// 獲取用戶列表
router.get('/users', async (req, res) => {
    try {
        const users = await prisma_1.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                membershipLevel: true,
                createdAt: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json({ users });
    }
    catch (error) {
        console.error('❌ 获取用户列表失败:', error);
        res.status(500).json({ error: '获取用户列表失败' });
    }
});
// 獲取航班列表（支持分頁和搜索）
router.get('/flights', async (req, res) => {
    try {
        const page = parseInt(req.query.page || '1');
        const search = (req.query.search || '').trim();
        const pageSize = 10;
        const where = {};
        if (search) {
            where.OR = [
                { flightNumber: { contains: search } },
                { from: { contains: search } },
                { to: { contains: search } },
                { fromCity: { contains: search } },
                { toCity: { contains: search } }
            ];
        }
        const [flights, total] = await Promise.all([
            prisma_1.prisma.flight.findMany({
                where,
                skip: (page - 1) * pageSize,
                take: pageSize,
                orderBy: { flightNumber: 'asc' }
            }),
            prisma_1.prisma.flight.count({ where })
        ]);
        res.json({
            flights,
            pagination: {
                total,
                pages: Math.ceil(total / pageSize),
                currentPage: page
            }
        });
    }
    catch (error) {
        console.error('Error fetching flights:', error);
        res.status(500).json({ error: '獲取航班失敗' });
    }
});
// 創建航班
router.post('/flights', async (req, res) => {
    try {
        const data = req.body;
        const flight = await prisma_1.prisma.flight.create({
            data: {
                flightNumber: data.flightNumber,
                airline: data.airline || 'Yellow Airlines',
                airlineCode: data.airlineCode || 'YA',
                airlineLogo: data.airlineLogo || null,
                from: data.from,
                fromCity: data.fromCity || data.from,
                fromAirport: data.fromAirport || (data.fromCity || data.from) + ' Airport',
                to: data.to,
                toCity: data.toCity || data.to,
                toAirport: data.toAirport || (data.toCity || data.to) + ' Airport',
                departureTime: data.departureTime,
                arrivalTime: data.arrivalTime,
                duration: data.duration || '0h 0m',
                aircraft: data.aircraft || data.aircraftType || 'Boeing 737',
                status: data.status || 'SCHEDULED',
                economyPrice: parseFloat(data.economyPrice) || 0,
                premiumEconomyPrice: parseFloat(data.premiumEconomyPrice || 0),
                businessPrice: parseFloat(data.businessPrice) || 0,
                firstClassPrice: parseFloat(data.firstClassPrice) || 0,
                economySeats: parseInt(data.economySeats) || 0,
                premiumEconomySeats: parseInt(data.premiumEconomySeats || 0),
                businessSeats: parseInt(data.businessSeats) || 0,
                firstClassSeats: parseInt(data.firstClassSeats) || 0,
                operatingDays: data.operatingDays || '1234567',
                hasEconomy: data.hasEconomy !== undefined ? data.hasEconomy : true,
                hasBusiness: data.hasBusiness !== undefined ? data.hasBusiness : true,
                hasFirstClass: data.hasFirstClass !== undefined ? data.hasFirstClass : true,
                hasPremiumEconomy: data.hasPremiumEconomy !== undefined ? data.hasPremiumEconomy : false,
            }
        });
        res.status(201).json(flight);
    }
    catch (error) {
        console.error('Error creating flight:', error);
        res.status(500).json({ error: '創建航班失敗' });
    }
});
// 刪除航班
router.delete('/flights', async (req, res) => {
    try {
        const { id } = req.query;
        if (!id || typeof id !== 'string') {
            return res.status(400).json({ error: 'ID is required' });
        }
        await prisma_1.prisma.flight.delete({ where: { id } });
        res.json({ success: true });
    }
    catch (error) {
        console.error('Error deleting flight:', error);
        res.status(500).json({ error: '刪除航班失敗' });
    }
});
// 獲取預訂列表
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await prisma_1.prisma.booking.findMany({
            include: {
                flight: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json(bookings);
    }
    catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: '獲取預訂失敗' });
    }
});
// 獲取統計信息
router.get('/stats', async (req, res) => {
    try {
        const [totalUsers, totalBookings, totalFlights, totalRevenue] = await Promise.all([
            prisma_1.prisma.user.count(),
            prisma_1.prisma.booking.count(),
            prisma_1.prisma.flight.count(),
            prisma_1.prisma.booking.aggregate({
                _sum: { totalPrice: true }
            })
        ]);
        res.json({
            totalUsers,
            totalBookings,
            totalFlights,
            totalRevenue: totalRevenue._sum.totalPrice || 0
        });
    }
    catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: '獲取統計失敗' });
    }
});
// 獲取通知列表
router.get('/notifications', async (req, res) => {
    try {
        const notifications = await prisma_1.prisma.notification.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(notifications);
    }
    catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: '獲取通知失敗' });
    }
});
// 創建通知
router.post('/notifications', async (req, res) => {
    try {
        const { title, message, recipientType, recipientUserId, expiresAt } = req.body;
        const notification = await prisma_1.prisma.notification.create({
            data: {
                title,
                message,
                type: 'SYSTEM',
                recipientType: recipientType || 'ALL',
                recipientUserId: recipientUserId || null,
                expiresAt: expiresAt ? new Date(expiresAt) : null,
            }
        });
        res.status(201).json(notification);
    }
    catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ error: '創建通知失敗' });
    }
});
exports.default = router;
//# sourceMappingURL=admin.js.map