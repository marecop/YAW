"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../lib/prisma");
const router = express_1.default.Router();
// 獲取航班列表
router.get('/', async (req, res) => {
    try {
        const { from, to, departDate: date, passengers, cabinClass, sortBy = 'price' } = req.query;
        console.log('🔍 Flight API called with params:', {
            from,
            to,
            date,
            passengers,
            cabinClass,
            sortBy
        });
        const where = {};
        if (from) {
            where.from = from;
        }
        if (to) {
            where.to = to;
        }
        const flights = await prisma_1.prisma.flight.findMany({
            where,
            orderBy: sortBy === 'duration'
                ? { duration: 'asc' }
                : { economyPrice: 'asc' }
        });
        let filteredFlights = flights;
        if (date) {
            const searchDate = new Date(date);
            const jsDay = searchDate.getDay();
            const dayOfWeek = jsDay === 0 ? 7 : jsDay;
            console.log('🔍 Flight Search Debug:', {
                searchDate: date,
                jsDay,
                dayOfWeek,
                totalFlights: flights.length
            });
            filteredFlights = flights.filter((flight) => {
                const operates = flight.operatingDays.includes(dayOfWeek.toString());
                if (operates) {
                    console.log('✅ Flight operates:', flight.flightNumber, 'operatingDays:', flight.operatingDays);
                }
                return operates;
            });
            console.log('📊 Filtered flights count:', filteredFlights.length);
        }
        const flightsWithDates = filteredFlights.map((flight) => {
            if (date) {
                const [depHour, depMin] = flight.departureTime.split(':');
                const [arrHour, arrMin] = flight.arrivalTime.split(':').map((t) => t.replace('+1', ''));
                const isNextDay = flight.arrivalTime.includes('+1');
                const depDate = new Date(date);
                depDate.setHours(parseInt(depHour), parseInt(depMin), 0, 0);
                const arrDate = new Date(date);
                if (isNextDay) {
                    arrDate.setDate(arrDate.getDate() + 1);
                }
                arrDate.setHours(parseInt(arrHour), parseInt(arrMin), 0, 0);
                return {
                    ...flight,
                    departureTimeISO: depDate.toISOString(),
                    arrivalTimeISO: arrDate.toISOString(),
                };
            }
            return flight;
        });
        res.set({
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
        });
        res.json(flightsWithDates);
    }
    catch (error) {
        console.error('Error fetching flights:', error);
        res.status(500).json({ error: '獲取航班失敗' });
    }
});
// 獲取單個航班詳情
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const flight = await prisma_1.prisma.flight.findUnique({
            where: { id },
        });
        if (!flight) {
            return res.status(404).json({ error: '航班不存在' });
        }
        res.json(flight);
    }
    catch (error) {
        console.error('Error fetching flight:', error);
        res.status(500).json({ error: '獲取航班失敗' });
    }
});
// 搜索航班
router.get('/search', async (req, res) => {
    try {
        const { from, to, date } = req.query;
        const where = {};
        if (from)
            where.from = from;
        if (to)
            where.to = to;
        const flights = await prisma_1.prisma.flight.findMany({
            where,
            orderBy: { economyPrice: 'asc' }
        });
        let filteredFlights = flights;
        if (date) {
            const searchDate = new Date(date);
            const jsDay = searchDate.getDay();
            const dayOfWeek = jsDay === 0 ? 7 : jsDay;
            filteredFlights = flights.filter((flight) => {
                return flight.operatingDays.includes(dayOfWeek.toString());
            });
        }
        res.json(filteredFlights);
    }
    catch (error) {
        console.error('Error searching flights:', error);
        res.status(500).json({ error: '搜索航班失敗' });
    }
});
// 查找航班
router.get('/lookup', async (req, res) => {
    try {
        const { flightNumber, date } = req.query;
        if (!flightNumber) {
            return res.status(400).json({ error: 'Flight number is required' });
        }
        const flight = await prisma_1.prisma.flight.findFirst({
            where: { flightNumber: flightNumber },
        });
        if (!flight) {
            return res.status(404).json({ error: 'Flight not found' });
        }
        res.json(flight);
    }
    catch (error) {
        console.error('Error looking up flight:', error);
        res.status(500).json({ error: '查找航班失敗' });
    }
});
// 往返航班
router.get('/roundtrip', async (req, res) => {
    try {
        const { from, to, departDate, returnDate } = req.query;
        if (!from || !to || !departDate || !returnDate) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }
        const outboundFlights = await prisma_1.prisma.flight.findMany({
            where: { from: from, to: to },
            orderBy: { economyPrice: 'asc' }
        });
        const returnFlights = await prisma_1.prisma.flight.findMany({
            where: { from: to, to: from },
            orderBy: { economyPrice: 'asc' }
        });
        res.json({
            outbound: outboundFlights,
            return: returnFlights,
        });
    }
    catch (error) {
        console.error('Error fetching roundtrip flights:', error);
        res.status(500).json({ error: '獲取往返航班失敗' });
    }
});
// 中轉航班
router.get('/connections', async (req, res) => {
    try {
        const { from, to, date } = req.query;
        if (!from || !to) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }
        // 查找所有可能的連接點
        const firstLeg = await prisma_1.prisma.flight.findMany({
            where: { from: from },
        });
        const connections = [];
        for (const flight1 of firstLeg) {
            const secondLeg = await prisma_1.prisma.flight.findMany({
                where: {
                    from: flight1.to,
                    to: to,
                },
            });
            for (const flight2 of secondLeg) {
                connections.push({
                    firstLeg: flight1,
                    secondLeg: flight2,
                    totalPrice: flight1.economyPrice + flight2.economyPrice,
                });
            }
        }
        res.json(connections);
    }
    catch (error) {
        console.error('Error fetching connections:', error);
        res.status(500).json({ error: '獲取中轉航班失敗' });
    }
});
exports.default = router;
//# sourceMappingURL=flights.js.map