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
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../lib/prisma");
const router = express_1.default.Router();
// 生成登機證 PDF
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await prisma_1.prisma.booking.findUnique({
            where: { id },
            include: {
                flight: true,
                user: {
                    select: {
                        name: true,
                        email: true,
                        membershipLevel: true,
                    },
                },
            },
        });
        if (!booking) {
            return res.status(404).json({ message: '找不到預訂記錄' });
        }
        if (!booking.checkedIn) {
            return res.status(400).json({ message: '請先完成值機' });
        }
        // 動態導入 PDFKit
        const PDFDocument = (await Promise.resolve().then(() => __importStar(require('pdfkit')))).default;
        const doc = new PDFDocument({
            size: 'A4',
            margin: 50,
            bufferPages: true
        });
        const chunks = [];
        doc.on('data', (chunk) => chunks.push(chunk));
        await new Promise((resolve) => {
            doc.on('end', resolve);
            // PDF 內容
            doc.fontSize(24).text('登機證', { align: 'center' });
            doc.moveDown();
            doc.fontSize(16).text(`預訂號: ${booking.bookingNumber}`);
            doc.text(`航班: ${booking.flight.flightNumber}`);
            doc.text(`乘客: ${booking.passengerName}`);
            doc.text(`座位: ${booking.seatNumber || '未分配'}`);
            doc.text(`日期: ${booking.flightDate?.toLocaleDateString() || 'N/A'}`);
            doc.text(`出發: ${booking.flight.from} → ${booking.flight.to}`);
            doc.end();
        });
        const pdfBuffer = Buffer.concat(chunks);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="boarding-pass-${booking.bookingNumber}.pdf"`);
        res.send(pdfBuffer);
    }
    catch (error) {
        console.error('Error generating boarding pass:', error);
        res.status(500).json({ message: '生成登機證失敗' });
    }
});
exports.default = router;
//# sourceMappingURL=boarding-pass.js.map