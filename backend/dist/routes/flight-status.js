"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../lib/prisma");
const simulation_1 = require("../lib/simulation");
const router = express_1.default.Router();
// 避免高頻輪詢時每個請求都觸發「生成/更新」導致記憶體與 DB 壓力飆升
const TODAY_SYNC_MIN_INTERVAL_MS = 60000;
let lastTodaySyncMs = 0;
let todaySyncPromise = null;
let lastTodayKey = null;
function getLocalDateKey(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}
async function syncTodayIfNeeded(targetDate) {
    const key = getLocalDateKey(targetDate);
    if (key !== lastTodayKey) {
        lastTodayKey = key;
        lastTodaySyncMs = 0;
        todaySyncPromise = null;
    }
    const now = Date.now();
    if (now - lastTodaySyncMs < TODAY_SYNC_MIN_INTERVAL_MS)
        return;
    if (todaySyncPromise)
        return todaySyncPromise;
    todaySyncPromise = (async () => {
        try {
            await (0, simulation_1.ensureDailyFlights)(targetDate);
            await (0, simulation_1.updateFlightStatuses)(targetDate);
        }
        finally {
            lastTodaySyncMs = Date.now();
            todaySyncPromise = null;
        }
    })();
    return todaySyncPromise;
}
// 獲取航班狀態列表
router.get('/', async (req, res) => {
    try {
        const { date: dateStr, full, limit: limitParam, offset: offsetParam, status: statusParam, search: searchParam } = req.query;
        const targetDate = dateStr ? new Date(dateStr) : new Date();
        targetDate.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (targetDate.getTime() === today.getTime()) {
            await syncTodayIfNeeded(targetDate);
        }
        else if (targetDate > today) {
            await (0, simulation_1.ensureDailyFlights)(targetDate);
        }
        const limit = limitParam ? Math.max(1, Math.min(parseInt(limitParam, 10) || 25, 200)) : null;
        const offset = offsetParam ? Math.max(0, parseInt(offsetParam, 10) || 0) : 0;
        const search = (searchParam || '').toString().trim();
        const status = statusParam && statusParam !== 'ALL' ? statusParam : null;
        const where = {
            date: targetDate
        };
        if (status) {
            where.status = status;
        }
        if (search) {
            where.flight = {
                OR: [
                    { flightNumber: { contains: search } },
                    { from: { contains: search } },
                    { to: { contains: search } },
                    { fromCity: { contains: search } },
                    { toCity: { contains: search } }
                ]
            };
        }
        const select = full === '1'
            ? {
                id: true,
                date: true,
                status: true,
                scheduledDeparture: true,
                scheduledArrival: true,
                actualDeparture: true,
                actualArrival: true,
                aircraft: true,
                aircraftRegistration: true,
                gate: true,
                terminal: true,
                weatherOrigin: true,
                weatherDestination: true,
                flight: {
                    select: {
                        flightNumber: true,
                        airline: true,
                        from: true,
                        to: true,
                        fromCity: true,
                        toCity: true,
                        duration: true
                    }
                }
            }
            : {
                id: true,
                date: true,
                status: true,
                scheduledDeparture: true,
                scheduledArrival: true,
                actualDeparture: true,
                actualArrival: true,
                aircraftRegistration: true,
                flight: {
                    select: {
                        flightNumber: true,
                        airline: true,
                        from: true,
                        to: true,
                        fromCity: true,
                        toCity: true,
                        duration: true
                    }
                }
            };
        const take = limit ? limit + 1 : undefined;
        const instances = await prisma_1.prisma.flightInstance.findMany({
            where,
            select,
            orderBy: {
                scheduledDeparture: 'asc'
            },
            ...(limit
                ? {
                    skip: offset,
                    take
                }
                : {})
        });
        if (!limit) {
            return res.json(instances);
        }
        const hasMore = instances.length > limit;
        const items = hasMore ? instances.slice(0, limit) : instances;
        const nextOffset = hasMore ? offset + limit : null;
        res.json({
            items,
            hasMore,
            nextOffset
        });
    }
    catch (error) {
        console.error('獲取航班狀態失敗:', error);
        res.status(500).json({ error: '獲取航班狀態失敗' });
    }
});
// 獲取單個航班狀態
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const instance = await prisma_1.prisma.flightInstance.findUnique({
            where: { id },
            include: {
                flight: true
            }
        });
        if (!instance) {
            return res.status(404).json({ error: '航班狀態不存在' });
        }
        res.json(instance);
    }
    catch (error) {
        console.error('獲取航班狀態失敗:', error);
        res.status(500).json({ error: '獲取航班狀態失敗' });
    }
});
exports.default = router;
//# sourceMappingURL=flight-status.js.map