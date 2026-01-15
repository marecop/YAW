import express from 'express'
import { prisma } from '../lib/prisma'

const router = express.Router()

// 生成登機證 PDF
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const booking = await prisma.booking.findUnique({
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
    })

    if (!booking) {
      return res.status(404).json({ message: '找不到預訂記錄' })
    }

    if (!booking.checkedIn) {
      return res.status(400).json({ message: '請先完成值機' })
    }

    // 動態導入 PDFKit
    const PDFDocument = (await import('pdfkit')).default
    
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
      bufferPages: true
    })

    const chunks: Buffer[] = []
    doc.on('data', (chunk) => chunks.push(chunk))
    
    await new Promise<void>((resolve) => {
      doc.on('end', resolve)
      
      // PDF 內容
      doc.fontSize(24).text('登機證', { align: 'center' })
      doc.moveDown()
      doc.fontSize(16).text(`預訂號: ${booking.bookingNumber}`)
      doc.text(`航班: ${booking.flight.flightNumber}`)
      doc.text(`乘客: ${booking.passengerName}`)
      doc.text(`座位: ${booking.seatNumber || '未分配'}`)
      doc.text(`日期: ${booking.flightDate?.toLocaleDateString() || 'N/A'}`)
      doc.text(`出發: ${booking.flight.from} → ${booking.flight.to}`)
      
      doc.end()
    })

    const pdfBuffer = Buffer.concat(chunks)

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="boarding-pass-${booking.bookingNumber}.pdf"`)
    res.send(pdfBuffer)
  } catch (error) {
    console.error('Error generating boarding pass:', error)
    res.status(500).json({ message: '生成登機證失敗' })
  }
})

export default router
