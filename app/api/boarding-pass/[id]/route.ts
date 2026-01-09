import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // 查找预订
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
      return NextResponse.json(
        { message: '找不到預訂記錄' },
        { status: 404 }
      )
    }

    if (!booking.checkedIn) {
      return NextResponse.json(
        { message: '請先完成值機' },
        { status: 400 }
      )
    }

    // 动态导入PDFKit
    const PDFDocument = (await import('pdfkit')).default
    
    // 创建PDF
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
      bufferPages: true
    })

    // 收集PDF数据块
    const chunks: Uint8Array[] = []
    
    doc.on('data', (chunk: Uint8Array) => {
      chunks.push(chunk)
    })

    // 格式化日期的辅助函数
    const formatDateLong = (date: Date) => {
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
      const day = String(date.getDate()).padStart(2, '0')
      const month = months[date.getMonth()]
      const year = date.getFullYear()
      return `${day} ${month} ${year}`
    }

    const formatTime = (date: Date) => {
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      return `${hours}:${minutes}`
    }

    // 等待PDF生成完成
    const pdfPromise = new Promise<Buffer>((resolve, reject) => {
      doc.on('end', () => {
        try {
          const pdfBuffer = Buffer.concat(chunks)
          resolve(pdfBuffer)
        } catch (err) {
          reject(err)
        }
      })

      doc.on('error', (err: Error) => {
        reject(err)
      })

      try {
        // 生成PDF内容
        
        // 标题区域
        doc.rect(0, 0, 595, 100).fill('#FDB913')
        
        doc.fontSize(28)
           .fillColor('#000000')
           .text('YELLOW AIRLINES', 50, 30, { align: 'center' })
        
        doc.fontSize(14)
           .fillColor('#000000')
           .text('登機牌 BOARDING PASS', 50, 65, { align: 'center' })

        // 主要信息区域背景
        doc.rect(50, 120, 495, 350).fillAndStroke('#FFFFFF', '#CCCCCC')

        // 乘客信息
        doc.fontSize(10)
           .fillColor('#666666')
           .text('PASSENGER NAME 乘客姓名', 70, 140)
        
        doc.fontSize(18)
           .fillColor('#000000')
           .text(booking.passengerName.toUpperCase(), 70, 160)

        // 航班信息
        const departureDate = new Date(booking.flight.departureTime)
        const arrivalDate = new Date(booking.flight.arrivalTime)
        
        // 左侧：出发信息
        doc.fontSize(10)
           .fillColor('#666666')
           
           .text('FROM 從', 70, 200)
        
        doc.fontSize(32)
           .fillColor('#FDB913')
           
           .text(booking.flight.from, 70, 220)
        
        doc.fontSize(12)
           .fillColor('#000000')
           
           .text(booking.flight.fromCity, 70, 260)

        // 中间：箭头和航班号
        doc.fontSize(24)
           .fillColor('#666666')
           .text('→', 230, 230)
        
        doc.fontSize(12)
           .fillColor('#666666')
           
           .text('FLIGHT 航班', 210, 265)
        
        doc.fontSize(14)
           .fillColor('#000000')
           
           .text(booking.flight.flightNumber, 210, 280)

        // 右侧：到达信息
        doc.fontSize(10)
           .fillColor('#666666')
           
           .text('TO 到', 350, 200)
        
        doc.fontSize(32)
           .fillColor('#FDB913')
           
           .text(booking.flight.to, 350, 220)
        
        doc.fontSize(12)
           .fillColor('#000000')
           
           .text(booking.flight.toCity, 350, 260)

        // 详细信息行
        // 日期
        doc.fontSize(10)
           .fillColor('#666666')
           
           .text('DATE 日期', 70, 320)
        
        doc.fontSize(14)
           .fillColor('#000000')
           
           .text(formatDateLong(departureDate), 70, 340)

        // 登机时间
        const boardingDate = new Date(departureDate.getTime() - 30 * 60 * 1000)
        doc.fontSize(10)
           .fillColor('#666666')
           
           .text('BOARDING 登機', 200, 320)
        
        doc.fontSize(14)
           .fillColor('#000000')
           
           .text(formatTime(boardingDate), 200, 340)

        // 起飞时间
        doc.fontSize(10)
           .fillColor('#666666')
           
           .text('DEPARTURE 起飛', 290, 320)
        
        doc.fontSize(14)
           .fillColor('#000000')
           
           .text(formatTime(departureDate), 290, 340)

        // 座位号
        doc.fontSize(10)
           .fillColor('#666666')
           
           .text('SEAT 座位', 390, 320)
        
        doc.fontSize(24)
           .fillColor('#FDB913')
           
           .text(booking.seatNumber || 'N/A', 390, 330)

        // 舱位
        let cabinText = 'ECONOMY'
        if (booking.cabinClass === 'PREMIUM_ECONOMY') cabinText = 'PREMIUM'
        if (booking.cabinClass === 'BUSINESS') cabinText = 'BUSINESS'
        if (booking.cabinClass === 'FIRST_CLASS') cabinText = 'FIRST'
        
        doc.fontSize(10)
           .fillColor('#666666')
           
           .text('CLASS 艙位', 470, 320)
        
        doc.fontSize(12)
           .fillColor('#000000')
           
           .text(cabinText, 470, 340)

        // 底部信息
        // 预订编号
        doc.fontSize(10)
           .fillColor('#666666')
           
           .text('BOOKING REF 預訂編號', 70, 390)
        
        doc.fontSize(16)
           .fillColor('#000000')
           
           .text(booking.bookingNumber, 70, 410)

        // 会员信息
        if (booking.user?.membershipLevel) {
          doc.fontSize(10)
             .fillColor('#666666')
             
             .text('MEMBER 會員', 280, 390)
          
          doc.fontSize(14)
             .fillColor('#FDB913')
             
             .text(booking.user.membershipLevel, 280, 410)
        }

        // 登机口（随机生成）
        const gate = `${String.fromCharCode(65 + Math.floor(Math.random() * 10))}${Math.floor(Math.random() * 50) + 1}`
        const boardingGroup = Math.floor(Math.random() * 5) + 1
        
        doc.fontSize(10)
           .fillColor('#666666')
           
           .text('GATE 登機口', 420, 390)
        
        doc.fontSize(16)
           .fillColor('#000000')
           
           .text(gate, 420, 410)

        doc.fontSize(10)
           .fillColor('#666666')
           
           .text(`GROUP ${boardingGroup}`, 420, 435)

        // 分隔线
        doc.moveTo(50, 480)
           .lineTo(545, 480)
           .strokeColor('#DDDDDD')
           .lineWidth(1)
           .stroke()

        // 条码区域
        doc.fontSize(10)
           .fillColor('#666666')
           
           .text('PLEASE PRESENT THIS BOARDING PASS 請出示此登機牌', 50, 500, {
             align: 'center',
             width: 495
           })

        // 生成简单的条码
        const barcodeY = 530
        let barcodeX = 120
        const barcodeData = `${booking.bookingNumber}${booking.flight.flightNumber}${booking.seatNumber || ''}`
        
        for (let i = 0; i < barcodeData.length && barcodeX < 480; i++) {
          const charCode = barcodeData.charCodeAt(i)
          const barHeight = (charCode % 2 === 0) ? 60 : 40
          const barWidth = (charCode % 3 === 0) ? 3 : 2
          
          if (i % 2 === 0) {
            doc.rect(barcodeX, barcodeY, barWidth, barHeight).fill('#000000')
          }
          barcodeX += barWidth + 1
        }

        // 条码下方文字
        doc.fontSize(10)
           .fillColor('#000000')
           
           .text(booking.bookingNumber, 50, barcodeY + 70, {
             align: 'center',
             width: 495
           })

        // 重要提示
        doc.fontSize(8)
           .fillColor('#CC0000')
           
           .text('⚠ 請提前90分鐘到達機場 | Please arrive 90 minutes before departure', 50, 640, {
             align: 'center',
             width: 495
           })

        // 简单的QR码模拟（右下角）
        const qrX = 490
        const qrY = 620
        const qrSize = 50
        
        // 绘制QR码边框
        doc.rect(qrX, qrY, qrSize, qrSize)
           .stroke('#000000')
        
        // 绘制QR码内容（简化版）
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            const hash = booking.bookingNumber.charCodeAt(i % booking.bookingNumber.length) + i * j
            if (hash % 3 !== 0) {
              doc.rect(qrX + 5 + j * 5, qrY + 5 + i * 5, 4, 4).fill('#000000')
            }
          }
        }

        // 页脚
        doc.fontSize(8)
           .fillColor('#999999')
           
           .text('Yellow Airlines - Your Journey, Our Passion', 50, 720, {
             align: 'center',
             width: 495
           })

        // 完成PDF
        doc.end()
      } catch (error) {
        reject(error)
      }
    })

    // 等待PDF生成
    const pdfBuffer = await pdfPromise

    // 返回PDF
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="boarding-pass-${booking.bookingNumber}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('生成登機牌錯誤:', error)
    return NextResponse.json(
      { message: '生成登機牌時發生錯誤', error: String(error) },
      { status: 500 }
    )
  }
}
