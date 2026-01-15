"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const prisma = new client_1.PrismaClient();
// 航空公司代码映射
const airlineMapping = {
    'cathay-pacific': { name: '國泰航空', code: 'CX', logo: '/images/airlines/cathaypacific.png', hubs: ['HKG'] },
    'singapore-airlines': { name: '新加坡航空', code: 'SQ', logo: '/images/airlines/sq.svg', hubs: ['SIN'] },
    'air-china': { name: '中國國際航空', code: 'CA', logo: '/images/airlines/airchina.png', hubs: ['PEK', 'PKX', 'PVG', 'CTU'] },
    'china-eastern': { name: '中國東方航空', code: 'MU', logo: '/images/airlines/chinaeastern.png', hubs: ['PVG', 'SHA', 'PKX', 'KMG', 'XIY'] },
    'china-southern': { name: '中國南方航空', code: 'CZ', logo: '/images/airlines/chinasouthern.png', hubs: ['CAN', 'PKX'] },
    'japan-airlines': { name: '日本航空', code: 'JL', logo: '/images/airlines/japanair.png', hubs: ['NRT', 'HND', 'KIX'] },
    'all-nippon': { name: '全日空', code: 'NH', logo: '/images/airlines/ana.png', hubs: ['NRT', 'HND'] },
    'air-france': { name: '法國航空', code: 'AF', logo: '/images/airlines/airfrance.png', hubs: ['CDG', 'ORY'] },
    'lufthansa': { name: '漢莎航空', code: 'LH', logo: '/images/airlines/icon-LH.svg', hubs: ['FRA', 'MUC'] },
    'emirates': { name: '阿聯酋航空', code: 'EK', logo: '/images/airlines/emirates.png', hubs: ['DXB'] },
    'delta': { name: '達美航空', code: 'DL', logo: '/images/airlines/delta.svg', hubs: ['ATL', 'JFK', 'LAX', 'SEA', 'DTW', 'MSP', 'SLC'] },
    'united': { name: '聯合航空', code: 'UA', logo: '/images/airlines/unitedairlines.svg', hubs: ['SFO', 'EWR', 'ORD', 'DEN', 'IAH', 'IAD', 'LAX'] },
    'american-airlines': { name: '美國航空', code: 'AA', logo: '/images/airlines/americanair.png', hubs: ['DFW', 'ORD', 'MIA', 'LAX', 'JFK', 'PHL', 'PHX', 'CLT'] },
    'qantas': { name: '澳洲航空', code: 'QF', logo: '/images/airlines/qantas.svg', hubs: ['SYD', 'MEL', 'BNE'] },
    'swiss': { name: '瑞士國際航空', code: 'LX', logo: '/images/airlines/swiss.svg', hubs: ['ZRH', 'GVA'] },
    'british-airways': { name: '英國航空', code: 'BA', logo: '/images/airlines/britishairways.png', hubs: ['LHR', 'LGW'] },
    'korean-air': { name: '大韓航空', code: 'KE', logo: '/images/airlines/koreanair.png', hubs: ['ICN', 'GMP'] },
    'eva-air': { name: '長榮航空', code: 'BR', logo: '/images/airlines/evaair.png', hubs: ['TPE', 'KHH'] },
    'china-airlines': { name: '中華航空', code: 'CI', logo: '/images/airlines/chinaairlines.png', hubs: ['TPE', 'KHH'] },
    'qatar-airways': { name: '卡塔爾航空', code: 'QR', logo: '/images/airlines/qatarairways.png', hubs: ['DOH'] },
    'turkish-airlines': { name: '土耳其航空', code: 'TK', logo: '/images/airlines/turkishairlines.png', hubs: ['IST'] },
};
// 城市代碼映射 (用於顯示)
const cityMapping = {
    'HKG': '香港',
    'CAN': '廣州',
    'TPE': '台北',
    'TSA': '台北',
    'KHH': '高雄',
    'JFK': '紐約',
    'EWR': '紐約/紐瓦克',
    'LHR': '倫敦',
    'LGW': '倫敦',
    'SIN': '新加坡',
    'CDG': '巴黎',
    'ORY': '巴黎',
    'FRA': '法蘭克福',
    'NRT': '東京',
    'HND': '東京',
    'PVG': '上海',
    'SHA': '上海',
    'PEK': '北京',
    'PKX': '北京',
    'DXB': '迪拜',
    'LAX': '洛杉磯',
    'SFO': '舊金山',
    'SYD': '悉尼',
    'MEL': '墨爾本',
    'BNE': '布里斯班',
    'AMS': '阿姆斯特丹',
    'ZRH': '蘇黎世',
    'ICN': '首爾',
    'GMP': '首爾',
    'BKK': '曼谷',
    'DMK': '曼谷',
    'KIX': '大阪',
    'ITM': '大阪',
    'YVR': '溫哥華',
    'YYZ': '多倫多',
    'MUC': '慕尼黑',
    'ATL': '亞特蘭大',
    'ORD': '芝加哥',
    'DFW': '達拉斯',
    'MIA': '邁阿密',
    'SEA': '西雅圖',
    'LAS': '拉斯維加斯',
    'IST': '伊斯坦布爾',
    'DOH': '多哈',
    'AUH': '阿布扎比',
    'DEL': '新德里',
    'BOM': '孟買',
    'KUL': '吉隆坡',
    'SGN': '胡志明市',
    'HAN': '河內',
    'MNL': '馬尼拉',
    'CGK': '雅加達',
    'SZX': '深圳',
    'CTU': '成都',
    'TFU': '成都',
    'XIY': '西安',
    'KMG': '昆明',
    'CKG': '重慶',
    'HGH': '杭州',
    'NKG': '南京',
    'WUH': '武漢',
    'CSX': '長沙',
    'XMN': '廈門',
    'AKL': '奧克蘭',
    'PER': '珀斯',
    'SVO': '莫斯科',
    'DME': '莫斯科',
    'MAD': '馬德里',
    'BCN': '巴塞羅那',
    'FCO': '羅馬',
    'MXP': '米蘭',
    'VIE': '維也納',
    'CPH': '哥本哈根',
    'ARN': '斯德哥爾摩',
    'OSL': '奧斯陸',
    'HEL': '赫爾辛基',
    'TLV': '特拉維夫',
};
// 機場名稱映射
const airportMapping = {
    'HKG': '香港國際機場',
    'CAN': '廣州白雲國際機場',
    'TPE': '台北桃園國際機場',
    'TSA': '台北松山機場',
    'KHH': '高雄國際機場',
    'JFK': '紐約肯尼迪國際機場',
    'LHR': '倫敦希思羅機場',
    'LGW': '倫敦盖特威克機場',
    'SIN': '新加坡樟宜機場',
    'CDG': '巴黎戴高樂機場',
    'ORY': '巴黎奧利機場',
    'FRA': '法蘭克福國際機場',
    'NRT': '東京成田國際機場',
    'HND': '東京羽田機場',
    'PVG': '上海浦東國際機場',
    'SHA': '上海虹橋國際機場',
    'PEK': '北京首都國際機場',
    'PKX': '北京大興國際機場',
    'DXB': '迪拜國際機場',
    'LAX': '洛杉磯國際機場',
    'SFO': '舊金山國際機場',
    'SYD': '悉尼金斯福德·史密斯國際機場',
    'MEL': '墨爾本機場',
    'BNE': '布里斯班機場',
    'AMS': '阿姆斯特丹史基浦機場',
    'ZRH': '蘇黎世機場',
    'ICN': '首爾仁川國際機場',
    'GMP': '首爾金浦國際機場',
    'BKK': '曼谷蘇凡納布機場',
    'DMK': '曼谷廊曼國際機場',
    'KIX': '大阪關西國際機場',
    'ITM': '大阪伊丹機場',
    'YVR': '溫哥華國際機場',
    'YYZ': '多倫多皮爾遜國際機場',
    'MUC': '慕尼黑機場',
    'ATL': '亞特蘭大哈茲菲爾德-傑克遜國際機場',
    'ORD': '芝加哥奧黑爾國際機場',
    'DFW': '達拉斯-沃思堡國際機場',
    'MIA': '邁阿密國際機場',
    'EWR': '紐瓦克自由國際機場',
    'SEA': '西雅圖-塔科馬國際機場',
    'LAS': '拉斯維加斯麥卡倫國際機場',
    'IST': '伊斯坦布爾機場',
    'DOH': '多哈哈馬德國際機場',
    'AUH': '阿布扎比國際機場',
    'DEL': '新德里英迪拉·甘地國際機場',
    'BOM': '孟買賈特拉帕蒂·希瓦吉國際機場',
    'KUL': '吉隆坡國際機場',
    'SGN': '胡志明市新山一國際機場',
    'HAN': '河內內排國際機場',
    'MNL': '馬尼拉尼諾·阿基諾國際機場',
    'CGK': '雅加達蘇加諾-哈達國際機場',
    'SZX': '深圳寶安國際機場',
    'CTU': '成都雙流國際機場',
    'TFU': '成都天府國際機場',
    'XIY': '西安咸陽國際機場',
    'KMG': '昆明長水國際機場',
    'CKG': '重慶江北國際機場',
    'HGH': '杭州蕭山國際機場',
    'NKG': '南京祿口國際機場',
    'WUH': '武漢天河國際機場',
    'CSX': '長沙黃花國際機場',
    'XMN': '廈門高崎國際機場',
    'AKL': '奧克蘭機場',
    'PER': '珀斯機場',
    'SVO': '莫斯科謝列梅捷沃國際機場',
    'DME': '莫斯科多莫杰多沃機場',
    'MAD': '馬德里-巴拉哈斯機場',
    'BCN': '巴塞羅那-埃爾普拉特機場',
    'FCO': '羅馬菲烏米奇諾機場',
    'MXP': '米蘭馬爾彭萨機場',
    'VIE': '維也納國際機場',
    'CPH': '哥本哈根機場',
    'ARN': '斯德哥爾摩-阿蘭達機場',
    'OSL': '奧斯陸加勒穆恩機場',
    'HEL': '赫爾辛基萬塔機場',
    'TLV': '特拉維夫本·古里安國際機場',
};
// 飞机型号列表
const aircraftTypes = [
    'A350-900', 'A350-1000', 'A330-300', 'A330-900neo', 'A320neo', 'A321neo', 'A380-800',
    'Boeing 777-300ER', 'Boeing 787-9', 'Boeing 787-10', 'Boeing 737-800', 'Boeing 737 MAX 8', 'Boeing 747-8'
];
function getRandomAircraft() {
    return aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)];
}
// 根據航程選擇合適的機型
function getSuitableAircraft(distanceLevel) {
    if (distanceLevel === 'short') {
        const types = ['A320neo', 'A321neo', 'Boeing 737-800', 'Boeing 737 MAX 8'];
        return types[Math.floor(Math.random() * types.length)];
    }
    else if (distanceLevel === 'medium') {
        const types = ['A330-300', 'Boeing 787-9', 'A350-900'];
        return types[Math.floor(Math.random() * types.length)];
    }
    else {
        const types = ['A350-1000', 'A380-800', 'Boeing 777-300ER', 'Boeing 747-8', 'A350-900', 'Boeing 787-10'];
        return types[Math.floor(Math.random() * types.length)];
    }
}
// 計算飛行時長 (簡單模擬)
function calculateDuration(from, to) {
    // 這裡可以根據簡單的區域邏輯返回大概時長，或者隨機
    // 亞洲內部: 2-5h
    // 亞洲-歐洲/北美/澳洲: 10-15h
    const asianCities = ['HKG', 'CAN', 'TPE', 'SIN', 'NRT', 'HND', 'PVG', 'SHA', 'PEK', 'PKX', 'ICN', 'BKK', 'KIX', 'ITM', 'SZX', 'CTU', 'TFU', 'KMG', 'XIY', 'CKG', 'HGH', 'NKG', 'WUH', 'CSX', 'XMN'];
    const isFromAsia = asianCities.includes(from);
    const isToAsia = asianCities.includes(to);
    let minutes = 0;
    if (isFromAsia && isToAsia) {
        minutes = 120 + Math.floor(Math.random() * 240); // 2-6 hours
    }
    else {
        minutes = 600 + Math.floor(Math.random() * 400); // 10-16 hours
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
}
// 計算到達時間
function calculateArrivalTime(departureTime, durationStr) {
    const [depHours, depMinutes] = departureTime.split(':').map(Number);
    const durationMatch = durationStr.match(/(\d+)h\s*(\d*)m?/);
    const durHours = durationMatch ? parseInt(durationMatch[1]) : 0;
    const durMinutes = durationMatch && durationMatch[2] ? parseInt(durationMatch[2]) : 0;
    let totalMinutes = depHours * 60 + depMinutes + durHours * 60 + durMinutes;
    // 處理跨天
    let daysAdded = 0;
    while (totalMinutes >= 24 * 60) {
        totalMinutes -= 24 * 60;
        daysAdded++;
    }
    const arrHours = Math.floor(totalMinutes / 60);
    const arrMinutes = totalMinutes % 60;
    const timeStr = `${String(arrHours).padStart(2, '0')}:${String(arrMinutes).padStart(2, '0')}`;
    return daysAdded > 0 ? `${timeStr}+${daysAdded}` : timeStr;
}
function getRandomTime() {
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 12) * 5; // 5 minute intervals
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}
// 獲取隨機的早晨時間
function getRandomMorningTime() {
    const hour = 6 + Math.floor(Math.random() * 6); // 06:00 - 11:59
    const minute = Math.floor(Math.random() * 12) * 5;
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}
// 獲取隨機的下午時間
function getRandomAfternoonTime() {
    const hour = 12 + Math.floor(Math.random() * 6); // 12:00 - 17:59
    const minute = Math.floor(Math.random() * 12) * 5;
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}
// 獲取隨機的晚上時間
function getRandomEveningTime() {
    const hour = 18 + Math.floor(Math.random() * 6); // 18:00 - 23:59
    const minute = Math.floor(Math.random() * 12) * 5;
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}
async function main() {
    console.log('开始填充数据...');
    // 1. 创建测试用户
    const hashedPassword = await bcryptjs_1.default.hash('password123', 10);
    await prisma.user.upsert({
        where: { email: 'admin@yellowairlines.com' },
        update: {},
        create: {
            email: 'admin@yellowairlines.com',
            password: hashedPassword,
            name: '管理员',
            membershipLevel: 'PLATINUM',
            points: 50000,
        },
    });
    await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
            email: 'user@example.com',
            password: hashedPassword,
            name: '测试用户',
            membershipLevel: 'GOLD',
            points: 10000,
        },
    });
    console.log('✓ 用户创建完成');
    // 2. 删除现有航班数据
    // Note: Only deleting flights will cascade delete flight instances if configured, or fail. 
    // Assuming cascade or manual cleanup. Let's delete FlightInstance first to be safe.
    try {
        await prisma.flightInstance.deleteMany({});
        await prisma.flight.deleteMany({});
        console.log('✓ 清除旧航班数据');
    }
    catch (e) {
        console.log('! 清除数据时遇到问题 (可能是首次运行):', e);
    }
    const allFlights = [];
    let flightIdCounter = 1000;
    const usedFlightNumbers = new Set();
    const getUniqueFlightNumber = (prefix) => {
        let fn = '';
        do {
            fn = `${prefix}${Math.floor(Math.random() * 9000) + 100}`;
        } while (usedFlightNumbers.has(fn));
        usedFlightNumbers.add(fn);
        return fn;
    };
    // 3. 生成 Yellow Airlines 航班 (保留并扩展原有的逻辑)
    const yaRoutes = [
        // 欧洲
        { to: 'FRA', price: 4800 }, { to: 'LHR', price: 5200 }, { to: 'CDG', price: 5100 },
        { to: 'AMS', price: 5000 }, { to: 'MUC', price: 4900 }, { to: 'ZRH', price: 5300 },
        { to: 'FCO', price: 4800 }, { to: 'MAD', price: 4700 }, { to: 'IST', price: 4200 },
        // 北美
        { to: 'JFK', price: 6500 }, { to: 'LAX', price: 6200 }, { to: 'SFO', price: 6100 },
        { to: 'YVR', price: 5900 }, { to: 'YYZ', price: 6300 }, { to: 'ORD', price: 6000 },
        { to: 'SEA', price: 5800 }, { to: 'IAD', price: 6200 },
        // 澳洲
        { to: 'SYD', price: 4200 }, { to: 'MEL', price: 4300 }, { to: 'BNE', price: 4100 }, { to: 'AKL', price: 4500 },
        // 亚洲/中东
        { to: 'DXB', price: 3800 }, { to: 'SIN', price: 1800 }, { to: 'BKK', price: 1200 },
        { to: 'NRT', price: 2500 }, { to: 'ICN', price: 2200 }, { to: 'KIX', price: 2300 },
        { to: 'HND', price: 2600 }, { to: 'TPE', price: 1500 }, { to: 'KUL', price: 1600 }
    ];
    const yaHubs = ['HKG', 'CAN', 'PVG', 'PEK', 'PKX', 'SIN', 'NRT']; // Yellow Airlines 主要運營基地
    for (const hub of yaHubs) {
        for (const route of yaRoutes) {
            if (hub === route.to)
                continue; // 避免原地飛
            // 每天多班次，分佈在早中晚
            // 班次 1: 早晨
            const depTime1 = getRandomMorningTime();
            const duration = calculateDuration(hub, route.to);
            const arrTime1 = calculateArrivalTime(depTime1, duration);
            const durationHours = parseInt(duration);
            const distLevel = durationHours < 5 ? 'short' : (durationHours < 10 ? 'medium' : 'long');
            const createYA = (dep, arr, flightNumOffset) => {
                const fn = `YA${flightIdCounter + flightNumOffset}`;
                usedFlightNumbers.add(fn);
                return {
                    flightNumber: fn,
                    airline: 'Yellow Airlines',
                    airlineCode: 'YA',
                    airlineLogo: '/images/logoremovebkgnd.png', // 使用您的 logo
                    from: hub,
                    fromCity: cityMapping[hub] || hub,
                    fromAirport: airportMapping[hub] || `${hub} International`,
                    to: route.to,
                    toCity: cityMapping[route.to] || route.to,
                    toAirport: airportMapping[route.to] || `${route.to} International`,
                    departureTime: dep,
                    arrivalTime: arr,
                    duration: duration,
                    aircraft: getSuitableAircraft(distLevel),
                    economyPrice: route.price,
                    businessPrice: Math.floor(route.price * 2.5),
                    firstClassPrice: Math.floor(route.price * 6),
                    economySeats: 200,
                    businessSeats: 40,
                    firstClassSeats: 8,
                    operatingDays: '1234567',
                    hasEconomy: true,
                    hasPremiumEconomy: true,
                    hasBusiness: true,
                    hasFirstClass: true,
                };
            };
            allFlights.push(createYA(depTime1, arrTime1, 0));
            // 班次 2: 下午/晚上 (概率)
            if (Math.random() > 0.3) {
                const depTime2 = Math.random() > 0.5 ? getRandomAfternoonTime() : getRandomEveningTime();
                const arrTime2 = calculateArrivalTime(depTime2, duration);
                allFlights.push(createYA(depTime2, arrTime2, 1));
                flightIdCounter++;
            }
            flightIdCounter++; // for the first flight
            // 返程
            const retDepTime = getRandomTime();
            const retArrTime = calculateArrivalTime(retDepTime, duration);
            const retFn = `YA${flightIdCounter++}`;
            usedFlightNumbers.add(retFn);
            allFlights.push({
                flightNumber: retFn,
                airline: 'Yellow Airlines',
                airlineCode: 'YA',
                airlineLogo: '/images/logoremovebkgnd.png',
                from: route.to,
                fromCity: cityMapping[route.to] || route.to,
                fromAirport: airportMapping[route.to] || `${route.to} International`,
                to: hub,
                toCity: cityMapping[hub] || hub,
                toAirport: airportMapping[hub] || `${hub} International`,
                departureTime: retDepTime,
                arrivalTime: retArrTime,
                duration: duration,
                aircraft: getSuitableAircraft(distLevel),
                economyPrice: route.price,
                businessPrice: Math.floor(route.price * 2.5),
                firstClassPrice: Math.floor(route.price * 6),
                economySeats: 200,
                businessSeats: 40,
                firstClassSeats: 8,
                operatingDays: '1234567',
                hasEconomy: true,
                hasPremiumEconomy: true,
                hasBusiness: true,
                hasFirstClass: true,
            });
        }
    }
    // 4. 读取真实航空公司 JSON 并生成额外航班
    const airlinesDir = path.join(process.cwd(), 'public/data/airlines');
    if (fs.existsSync(airlinesDir)) {
        const files = fs.readdirSync(airlinesDir).filter(f => f.endsWith('.json'));
        for (const file of files) {
            if (file.includes('yellow'))
                continue; // 跳过 Yellow Airlines JSON，因为我们上面已经生成了
            const content = fs.readFileSync(path.join(airlinesDir, file), 'utf-8');
            const airlineData = JSON.parse(content);
            const airlineKey = file.replace('.json', '');
            const mapping = airlineMapping[airlineKey];
            if (!mapping)
                continue;
            // A. 導入 JSON 中定義的航班 (如果有)
            if (airlineData.flights) {
                for (const f of airlineData.flights) {
                    // 簡單適配，確保字段存在
                    const duration = calculateDuration(f.departureAirportCode, f.arrivalAirportCode);
                    const arrTime = calculateArrivalTime(f.departureTime.substring(0, 5), duration);
                    // Ensure unique even for JSON imported ones (though less likely to collide with random unless JSON has dups)
                    let fn = f.flightNumber;
                    if (usedFlightNumbers.has(fn)) {
                        fn = getUniqueFlightNumber(mapping.code);
                    }
                    usedFlightNumbers.add(fn);
                    allFlights.push({
                        flightNumber: fn,
                        airline: mapping.name,
                        airlineCode: mapping.code,
                        airlineLogo: mapping.logo,
                        from: f.departureAirportCode,
                        fromCity: cityMapping[f.departureAirportCode] || f.departureAirportCode,
                        fromAirport: airportMapping[f.departureAirportCode] || f.departureAirport,
                        to: f.arrivalAirportCode,
                        toCity: cityMapping[f.arrivalAirportCode] || f.arrivalAirportCode,
                        toAirport: airportMapping[f.arrivalAirportCode] || f.arrivalAirport,
                        departureTime: f.departureTime.substring(0, 5),
                        arrivalTime: arrTime,
                        duration: duration,
                        aircraft: f.aircraftType || getRandomAircraft(),
                        economyPrice: f.prices?.CNY?.economy || 2000,
                        businessPrice: f.prices?.CNY?.business || 5000,
                        firstClassPrice: f.prices?.CNY?.first || 0,
                        economySeats: f.seatsAvailable || 150,
                        businessSeats: 20,
                        firstClassSeats: f.hasFirstClass ? 8 : 0,
                        operatingDays: '1234567',
                        hasEconomy: true,
                        hasBusiness: true,
                        hasFirstClass: !!f.hasFirstClass,
                    });
                }
            }
            // B. 生成額外航班 (基於 Hub)
            // 每個航空公司從其樞紐飛往 5-10 個隨機大城市
            const destinations = Object.keys(cityMapping);
            for (const hub of mapping.hubs) {
                // 隨機選擇 8 個目的地
                const randomDestinations = destinations
                    .filter(d => d !== hub)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 8);
                for (const dest of randomDestinations) {
                    const depTime = getRandomTime();
                    const duration = calculateDuration(hub, dest);
                    const arrTime = calculateArrivalTime(depTime, duration);
                    const basePrice = parseInt(duration) * 5 + 500; // 簡單定價
                    const durationHours = parseInt(duration);
                    const distLevel = durationHours < 5 ? 'short' : (durationHours < 10 ? 'medium' : 'long');
                    // 去程
                    const fnOut = getUniqueFlightNumber(mapping.code);
                    allFlights.push({
                        flightNumber: fnOut,
                        airline: mapping.name,
                        airlineCode: mapping.code,
                        airlineLogo: mapping.logo,
                        from: hub,
                        fromCity: cityMapping[hub] || hub,
                        fromAirport: airportMapping[hub] || `${hub} Intl`,
                        to: dest,
                        toCity: cityMapping[dest] || dest,
                        toAirport: airportMapping[dest] || `${dest} Intl`,
                        departureTime: depTime,
                        arrivalTime: arrTime,
                        duration: duration,
                        aircraft: getSuitableAircraft(distLevel),
                        economyPrice: basePrice,
                        businessPrice: basePrice * 3,
                        firstClassPrice: basePrice * 8,
                        economySeats: 180,
                        businessSeats: 30,
                        firstClassSeats: 0,
                        operatingDays: '1234567',
                        hasEconomy: true,
                        hasBusiness: true,
                        hasFirstClass: false,
                    });
                    // 返程
                    const retDepTime = getRandomTime();
                    const retArrTime = calculateArrivalTime(retDepTime, duration);
                    const fnIn = getUniqueFlightNumber(mapping.code);
                    allFlights.push({
                        flightNumber: fnIn,
                        airline: mapping.name,
                        airlineCode: mapping.code,
                        airlineLogo: mapping.logo,
                        from: dest,
                        fromCity: cityMapping[dest] || dest,
                        fromAirport: airportMapping[dest] || `${dest} Intl`,
                        to: hub,
                        toCity: cityMapping[hub] || hub,
                        toAirport: airportMapping[hub] || `${hub} Intl`,
                        departureTime: retDepTime,
                        arrivalTime: retArrTime,
                        duration: duration,
                        aircraft: getSuitableAircraft(distLevel),
                        economyPrice: basePrice,
                        businessPrice: basePrice * 3,
                        firstClassPrice: basePrice * 8,
                        economySeats: 180,
                        businessSeats: 30,
                        firstClassSeats: 0,
                        operatingDays: '1234567',
                        hasEconomy: true,
                        hasBusiness: true,
                        hasFirstClass: false,
                    });
                }
            }
        }
    }
    console.log(`準備插入 ${allFlights.length} 條航班數據...`);
    // 分批插入以避免過大
    const batchSize = 50;
    for (let i = 0; i < allFlights.length; i += batchSize) {
        const batch = allFlights.slice(i, i + batchSize);
        await Promise.all(batch.map(flight => prisma.flight.create({ data: flight })));
        process.stdout.write('.');
    }
    console.log('\n✅ 所有航班數據填充完成！');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map