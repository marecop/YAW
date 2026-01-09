const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'webhost.dynadot.com',
  port: 587,
  secure: false,
  auth: {
    user: 'noreply@flaps1f.com',
    pass: '47232364',
  },
  tls: {
    ciphers: 'SSLv3',
  },
})

async function testBookingEmail() {
  console.log('🧪 測試預訂確認郵件發送...\n')
  
  const testEmail = process.argv[2] || 'noreply@flaps1f.com'
  console.log(`📧 收件人: ${testEmail}\n`)
  
  const mockBookingData = {
    bookingNumber: 'YA-TEST-12345',
    passengerName: '張三',
    flightNumber: 'YA101',
    from: 'HKG',
    fromCity: '香港',
    to: 'FRA',
    toCity: '法蘭克福',
    departureTime: '23:45',
    arrivalTime: '06:30+1',
    flightDate: new Date().toISOString(),
    cabinClass: 'ECONOMY',
    seatNumber: '12A',
    totalPrice: 4800
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-HK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    })
  }
  
  const getCabinClassName = (cabin) => {
    const names = {
      ECONOMY: '經濟艙',
      BUSINESS: '商務艙',
      FIRST: '頭等艙',
    }
    return names[cabin] || cabin
  }
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>預訂確認</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold;">✈️ Yellow Airlines</h1>
          <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">感謝您選擇 Yellow Airlines</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 20px;">
          <h2 style="color: #111827; margin: 0 0 20px 0; font-size: 24px;">預訂確認</h2>
          <p style="color: #6b7280; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
            親愛的 ${mockBookingData.passengerName}，<br><br>
            您的航班預訂已確認！以下是您的預訂詳情：
          </p>
          
          <!-- Booking Number -->
          <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 0 0 30px 0; border-radius: 4px;">
            <p style="color: #92400e; margin: 0; font-size: 14px; font-weight: 600;">預訂號碼</p>
            <p style="color: #92400e; margin: 5px 0 0 0; font-size: 24px; font-weight: bold; letter-spacing: 2px;">
              ${mockBookingData.bookingNumber}
            </p>
          </div>
          
          <!-- Flight Info -->
          <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 0 0 30px 0;">
            <h3 style="color: #111827; margin: 0 0 15px 0; font-size: 18px;">航班資訊</h3>
            
            <div style="display: flex; align-items: center; margin-bottom: 20px;">
              <div style="flex: 1;">
                <p style="color: #6b7280; margin: 0; font-size: 14px;">出發</p>
                <p style="color: #111827; margin: 5px 0 0 0; font-size: 24px; font-weight: bold;">
                  ${mockBookingData.from}
                </p>
                <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px;">
                  ${mockBookingData.fromCity}
                </p>
                <p style="color: #111827; margin: 5px 0 0 0; font-size: 16px; font-weight: 600;">
                  ${mockBookingData.departureTime}
                </p>
              </div>
              
              <div style="flex: 0 0 60px; text-align: center;">
                <div style="color: #f59e0b; font-size: 24px;">✈️</div>
                <div style="height: 2px; background-color: #e5e7eb; margin: 10px 0;"></div>
              </div>
              
              <div style="flex: 1; text-align: right;">
                <p style="color: #6b7280; margin: 0; font-size: 14px;">抵達</p>
                <p style="color: #111827; margin: 5px 0 0 0; font-size: 24px; font-weight: bold;">
                  ${mockBookingData.to}
                </p>
                <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px;">
                  ${mockBookingData.toCity}
                </p>
                <p style="color: #111827; margin: 5px 0 0 0; font-size: 16px; font-weight: 600;">
                  ${mockBookingData.arrivalTime.replace('+1', '')}
                </p>
              </div>
            </div>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 15px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">航班號碼:</td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px; text-align: right; font-weight: 600;">
                    ${mockBookingData.flightNumber}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">日期:</td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px; text-align: right; font-weight: 600;">
                    ${formatDate(mockBookingData.flightDate)}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">艙位:</td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px; text-align: right; font-weight: 600;">
                    ${getCabinClassName(mockBookingData.cabinClass)}
                  </td>
                </tr>
                ${mockBookingData.seatNumber ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">座位:</td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px; text-align: right; font-weight: 600;">
                    ${mockBookingData.seatNumber}
                  </td>
                </tr>
                ` : ''}
              </table>
            </div>
          </div>
          
          <!-- Passenger Info -->
          <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 0 0 30px 0;">
            <h3 style="color: #111827; margin: 0 0 15px 0; font-size: 18px;">乘客資訊</h3>
            <p style="color: #111827; margin: 0; font-size: 16px; font-weight: 600;">
              ${mockBookingData.passengerName}
            </p>
          </div>
          
          <!-- Payment -->
          <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 0 0 30px 0;">
            <h3 style="color: #111827; margin: 0 0 15px 0; font-size: 18px;">支付詳情</h3>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="color: #6b7280; font-size: 16px;">總金額</span>
              <span style="color: #f59e0b; font-size: 28px; font-weight: bold;">
                HKD $${mockBookingData.totalPrice.toFixed(2)}
              </span>
            </div>
            <p style="color: #10b981; margin: 10px 0 0 0; font-size: 14px; font-weight: 600;">
              ✓ 已付款
            </p>
          </div>
          
          <!-- CTA Buttons -->
          <div style="text-align: center; margin: 0 0 30px 0;">
            <a href="http://localhost:3000/check-in?bookingNumber=${mockBookingData.bookingNumber}" 
               style="display: inline-block; background-color: #f59e0b; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 0 10px 10px 0;">
              線上值機
            </a>
            <a href="http://localhost:3000/boarding-pass/${mockBookingData.bookingNumber}" 
               style="display: inline-block; background-color: #ffffff; color: #f59e0b; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; border: 2px solid #f59e0b;">
              查看登機牌
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 30px 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px; text-align: center;">
            如有任何問題，請聯繫我們的客服團隊
          </p>
          <p style="color: #6b7280; margin: 0; font-size: 14px; text-align: center;">
            Yellow Airlines © ${new Date().getFullYear()}
          </p>
        </div>
      </div>
    </body>
    </html>
  `
  
  try {
    await transporter.verify()
    console.log('✅ SMTP 連接成功\n')
    
    console.log('📧 發送測試郵件...')
    const info = await transporter.sendMail({
      from: '"Yellow Airlines" <noreply@flaps1f.com>',
      to: testEmail,
      subject: '✈️ 您的 Yellow Airlines 預訂確認',
      html: html,
    })
    
    console.log('\n✅ 郵件發送成功！')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('Message ID:', info.messageId)
    console.log('收件人:', testEmail)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('\n⚠️  請檢查郵箱（包括垃圾郵件文件夾）')
    console.log('\n📋 郵件內容預覽：')
    console.log('   預訂號碼:', mockBookingData.bookingNumber)
    console.log('   乘客:', mockBookingData.passengerName)
    console.log('   航班:', mockBookingData.flightNumber)
    console.log('   航線:', `${mockBookingData.from} → ${mockBookingData.to}`)
    console.log('   艙位:', getCabinClassName(mockBookingData.cabinClass))
    console.log('   金額: HKD $' + mockBookingData.totalPrice.toFixed(2))
    
  } catch (error) {
    console.error('\n❌ 錯誤:', error.message)
    if (error.code) {
      console.error('   錯誤代碼:', error.code)
    }
  }
}

console.log(`
════════════════════════════════════════════════════════════════
           🧪 Yellow Airlines 預訂郵件測試工具
════════════════════════════════════════════════════════════════
`)

testBookingEmail()
