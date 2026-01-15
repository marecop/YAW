"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.airports = void 0;
exports.searchAirports = searchAirports;
exports.getAirportByCode = getAirportByCode;
exports.airports = [
    // 中国大陆
    { code: 'CAN', name: '广州白云国际机场', city: '广州白云', country: '中国' },
    { code: 'PEK', name: '北京首都国际机场', city: '北京首都', country: '中国' },
    { code: 'PKX', name: '北京大兴国际机场', city: '北京大兴', country: '中国' },
    { code: 'PVG', name: '上海浦东国际机场', city: '上海浦东', country: '中国' },
    { code: 'SHA', name: '上海虹桥国际机场', city: '上海虹桥', country: '中国' },
    { code: 'CTU', name: '成都双流国际机场', city: '成都双流', country: '中国' },
    { code: 'TFU', name: '成都天府国际机场', city: '成都天府', country: '中国' },
    { code: 'SZX', name: '深圳宝安国际机场', city: '深圳宝安', country: '中国' },
    { code: 'XIY', name: '西安咸阳国际机场', city: '西安咸阳', country: '中国' },
    { code: 'KMG', name: '昆明长水国际机场', city: '昆明长水', country: '中国' },
    { code: 'CKG', name: '重庆江北国际机场', city: '重庆江北', country: '中国' },
    { code: 'HGH', name: '杭州萧山国际机场', city: '杭州萧山', country: '中国' },
    { code: 'NKG', name: '南京禄口国际机场', city: '南京禄口', country: '中国' },
    { code: 'WUH', name: '武汉天河国际机场', city: '武汉天河', country: '中国' },
    { code: 'CSX', name: '长沙黄花国际机场', city: '长沙黄花', country: '中国' },
    { code: 'FOC', name: '福州长乐国际机场', city: '福州长乐', country: '中国' },
    { code: 'XMN', name: '厦门高崎国际机场', city: '厦门高崎', country: '中国' },
    { code: 'NNG', name: '南宁吴圩国际机场', city: '南宁吴圩', country: '中国' },
    { code: 'SYX', name: '三亚凤凰国际机场', city: '三亚凤凰', country: '中国' },
    { code: 'HAK', name: '海口美兰国际机场', city: '海口美兰', country: '中国' },
    // 香港、澳门、台湾
    { code: 'HKG', name: '香港国际机场', city: '香港', country: '中国香港' },
    { code: 'MFM', name: '澳门国际机场', city: '澳门', country: '中国澳门' },
    { code: 'TPE', name: '台北桃园国际机场', city: '台北桃园', country: '中国台湾' },
    { code: 'TSA', name: '台北松山机场', city: '台北松山', country: '中国台湾' },
    { code: 'KHH', name: '高雄国际机场', city: '高雄', country: '中国台湾' },
    // 日本
    { code: 'NRT', name: '东京成田国际机场', city: '东京成田', country: '日本' },
    { code: 'HND', name: '东京羽田机场', city: '东京羽田', country: '日本' },
    { code: 'KIX', name: '大阪关西国际机场', city: '大阪关西', country: '日本' },
    { code: 'ITM', name: '大阪伊丹机场', city: '大阪伊丹', country: '日本' },
    { code: 'NGO', name: '名古屋中部国际机场', city: '名古屋', country: '日本' },
    { code: 'FUK', name: '福冈机场', city: '福冈', country: '日本' },
    { code: 'CTS', name: '札幌新千岁机场', city: '札幌', country: '日本' },
    { code: 'OKA', name: '那霸机场', city: '冲绳', country: '日本' },
    // 韩国
    { code: 'ICN', name: '首尔仁川国际机场', city: '首尔仁川', country: '韩国' },
    { code: 'GMP', name: '首尔金浦国际机场', city: '首尔金浦', country: '韩国' },
    { code: 'PUS', name: '釜山金海国际机场', city: '釜山', country: '韩国' },
    { code: 'CJU', name: '济州国际机场', city: '济州', country: '韩国' },
    // 东南亚
    { code: 'SIN', name: '新加坡樟宜机场', city: '新加坡', country: '新加坡' },
    { code: 'BKK', name: '曼谷素万那普国际机场', city: '曼谷素万那普', country: '泰国' },
    { code: 'DMK', name: '曼谷廊曼国际机场', city: '曼谷廊曼', country: '泰国' },
    { code: 'HKT', name: '普吉国际机场', city: '普吉', country: '泰国' },
    { code: 'CNX', name: '清迈国际机场', city: '清迈', country: '泰国' },
    { code: 'KUL', name: '吉隆坡国际机场', city: '吉隆坡', country: '马来西亚' },
    { code: 'BKI', name: '亚庇国际机场', city: '亚庇', country: '马来西亚' },
    { code: 'CGK', name: '雅加达苏加诺-哈达国际机场', city: '雅加达', country: '印度尼西亚' },
    { code: 'DPS', name: '巴厘岛伍拉·赖国际机场', city: '巴厘岛', country: '印度尼西亚' },
    { code: 'MNL', name: '马尼拉尼诺·阿基诺国际机场', city: '马尼拉', country: '菲律宾' },
    { code: 'CEB', name: '宿雾麦克坦国际机场', city: '宿雾', country: '菲律宾' },
    { code: 'HAN', name: '河内内排国际机场', city: '河内', country: '越南' },
    { code: 'SGN', name: '胡志明市新山一国际机场', city: '胡志明市', country: '越南' },
    { code: 'DAD', name: '岘港国际机场', city: '岘港', country: '越南' },
    // 大洋洲
    { code: 'SYD', name: '悉尼金斯福德·史密斯国际机场', city: '悉尼', country: '澳大利亚' },
    { code: 'MEL', name: '墨尔本机场', city: '墨尔本', country: '澳大利亚' },
    { code: 'BNE', name: '布里斯班机场', city: '布里斯班', country: '澳大利亚' },
    { code: 'PER', name: '珀斯机场', city: '珀斯', country: '澳大利亚' },
    { code: 'ADL', name: '阿德莱德机场', city: '阿德莱德', country: '澳大利亚' },
    { code: 'AKL', name: '奥克兰机场', city: '奥克兰', country: '新西兰' },
    { code: 'CHC', name: '克赖斯特彻奇国际机场', city: '克赖斯特彻奇', country: '新西兰' },
    // 欧洲
    { code: 'LHR', name: '伦敦希思罗机场', city: '伦敦希思罗', country: '英国' },
    { code: 'LGW', name: '伦敦盖特威克机场', city: '伦敦盖特威克', country: '英国' },
    { code: 'MAN', name: '曼彻斯特机场', city: '曼彻斯特', country: '英国' },
    { code: 'CDG', name: '巴黎戴高乐机场', city: '巴黎戴高乐', country: '法国' },
    { code: 'ORY', name: '巴黎奥利机场', city: '巴黎奥利', country: '法国' },
    { code: 'NCE', name: '尼斯蔚蓝海岸机场', city: '尼斯', country: '法国' },
    { code: 'FRA', name: '法兰克福国际机场', city: '法兰克福', country: '德国' },
    { code: 'MUC', name: '慕尼黑机场', city: '慕尼黑', country: '德国' },
    { code: 'BER', name: '柏林勃兰登堡机场', city: '柏林', country: '德国' },
    { code: 'AMS', name: '阿姆斯特丹史基浦机场', city: '阿姆斯特丹', country: '荷兰' },
    { code: 'MAD', name: '马德里-巴拉哈斯机场', city: '马德里', country: '西班牙' },
    { code: 'BCN', name: '巴塞罗那-埃尔普拉特机场', city: '巴塞罗那', country: '西班牙' },
    { code: 'FCO', name: '罗马菲乌米奇诺机场', city: '罗马', country: '意大利' },
    { code: 'MXP', name: '米兰马尔彭萨机场', city: '米兰', country: '意大利' },
    { code: 'VCE', name: '威尼斯马可·波罗机场', city: '威尼斯', country: '意大利' },
    { code: 'ZRH', name: '苏黎世机场', city: '苏黎世', country: '瑞士' },
    { code: 'GVA', name: '日内瓦机场', city: '日内瓦', country: '瑞士' },
    { code: 'VIE', name: '维也纳国际机场', city: '维也纳', country: '奥地利' },
    { code: 'CPH', name: '哥本哈根机场', city: '哥本哈根', country: '丹麦' },
    { code: 'ARN', name: '斯德哥尔摩-阿兰达机场', city: '斯德哥尔摩', country: '瑞典' },
    { code: 'OSL', name: '奥斯陆加勒穆恩机场', city: '奥斯陆', country: '挪威' },
    { code: 'HEL', name: '赫尔辛基万塔机场', city: '赫尔辛基', country: '芬兰' },
    { code: 'SVO', name: '莫斯科谢列梅捷沃国际机场', city: '莫斯科谢列梅捷沃', country: '俄罗斯' },
    { code: 'DME', name: '莫斯科多莫杰多沃机场', city: '莫斯科多莫杰多沃', country: '俄罗斯' },
    // 北美
    { code: 'JFK', name: '纽约肯尼迪国际机场', city: '纽约肯尼迪', country: '美国' },
    { code: 'EWR', name: '纽瓦克自由国际机场', city: '纽约/纽瓦克', country: '美国' },
    { code: 'LGA', name: '拉瓜迪亚机场', city: '纽约拉瓜迪亚', country: '美国' },
    { code: 'LAX', name: '洛杉矶国际机场', city: '洛杉矶', country: '美国' },
    { code: 'SFO', name: '旧金山国际机场', city: '旧金山', country: '美国' },
    { code: 'ORD', name: '芝加哥奥黑尔国际机场', city: '芝加哥', country: '美国' },
    { code: 'SEA', name: '西雅图-塔科马国际机场', city: '西雅图', country: '美国' },
    { code: 'LAS', name: '拉斯维加斯麦卡伦国际机场', city: '拉斯维加斯', country: '美国' },
    { code: 'MIA', name: '迈阿密国际机场', city: '迈阿密', country: '美国' },
    { code: 'MCO', name: '奥兰多国际机场', city: '奥兰多', country: '美国' },
    { code: 'BOS', name: '波士顿洛根国际机场', city: '波士顿', country: '美国' },
    { code: 'IAD', name: '华盛顿杜勒斯国际机场', city: '华盛顿', country: '美国' },
    { code: 'ATL', name: '亚特兰大哈兹菲尔德-杰克逊国际机场', city: '亚特兰大', country: '美国' },
    { code: 'DFW', name: '达拉斯-沃思堡国际机场', city: '达拉斯', country: '美国' },
    { code: 'YYZ', name: '多伦多皮尔逊国际机场', city: '多伦多', country: '加拿大' },
    { code: 'YVR', name: '温哥华国际机场', city: '温哥华', country: '加拿大' },
    { code: 'YUL', name: '蒙特利尔皮埃尔·埃利奥特·特鲁多国际机场', city: '蒙特利尔', country: '加拿大' },
    // 中东
    { code: 'DXB', name: '迪拜国际机场', city: '迪拜', country: '阿联酋' },
    { code: 'AUH', name: '阿布扎比国际机场', city: '阿布扎比', country: '阿联酋' },
    { code: 'DOH', name: '多哈哈马德国际机场', city: '多哈', country: '卡塔尔' },
    { code: 'IST', name: '伊斯坦布尔机场', city: '伊斯坦布尔', country: '土耳其' },
    { code: 'TLV', name: '特拉维夫本·古里安国际机场', city: '特拉维夫', country: '以色列' },
    // 南亚
    { code: 'DEL', name: '新德里英迪拉·甘地国际机场', city: '新德里', country: '印度' },
    { code: 'BOM', name: '孟买贾特拉帕蒂·希瓦吉国际机场', city: '孟买', country: '印度' },
    { code: 'MAA', name: '金奈国际机场', city: '金奈', country: '印度' },
    { code: 'BLR', name: '班加罗尔国际机场', city: '班加罗尔', country: '印度' },
    { code: 'CMB', name: '科伦坡班达拉奈克国际机场', city: '科伦坡', country: '斯里兰卡' },
    { code: 'MLE', name: '马累国际机场', city: '马累', country: '马尔代夫' },
];
// 为每个机场添加搜索文本
exports.airports.forEach(airport => {
    airport.searchText = `${airport.code} ${airport.name} ${airport.city} ${airport.country}`.toLowerCase();
});
/**
 * 搜索机场
 * @param query 搜索关键词
 * @param limit 返回结果数量限制
 */
function searchAirports(query, limit = 10) {
    if (!query || query.trim().length === 0) {
        return [];
    }
    const searchTerm = query.toLowerCase().trim();
    // 先匹配机场代码
    const codeMatches = exports.airports.filter(airport => airport.code.toLowerCase().startsWith(searchTerm));
    // 再匹配城市名称
    const cityMatches = exports.airports.filter(airport => airport.city.toLowerCase().includes(searchTerm) &&
        !codeMatches.includes(airport));
    // 最后匹配机场名称和国家
    const nameMatches = exports.airports.filter(airport => airport.searchText.includes(searchTerm) &&
        !codeMatches.includes(airport) &&
        !cityMatches.includes(airport));
    return [...codeMatches, ...cityMatches, ...nameMatches].slice(0, limit);
}
/**
 * 根据机场代码获取机场信息
 */
function getAirportByCode(code) {
    return exports.airports.find(airport => airport.code === code);
}
//# sourceMappingURL=airports.js.map