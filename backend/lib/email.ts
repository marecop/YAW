import nodemailer from 'nodemailer'

// SMTP 配置
const SMTP_CONFIG = {
  host: 'webhost.dynadot.com',
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: 'noreply@flaps1f.com',
    pass: '47232364',
  },
}

// 基础 URL
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://fly.flaps1f.com'

// 创建邮件传输器
export const transporter = nodemailer.createTransport(SMTP_CONFIG)

// 发送预订确认邮件
export async function sendBookingConfirmation(
  emailTo: string,
  bookingData: {
    bookingNumber: string
    passengerName: string
    flightNumber: string
    from: string
    fromCity: string
    to: string
    toCity: string
    departureTime: string
    arrivalTime: string
    flightDate: string
    cabinClass: string
    seatNumber?: string
    totalPrice: number
  }
) {
  const { bookingNumber, passengerName, flightNumber, from, fromCity, to, toCity, departureTime, arrivalTime, flightDate, cabinClass, seatNumber, totalPrice } = bookingData

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-HK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    })
  }

  const formatTime = (time: string) => time.replace('+1', '')

  const getCabinClassName = (cabin: string) => {
    switch (cabin) {
      case 'ECONOMY':
        return '經濟艙'
      case 'PREMIUM_ECONOMY':
        return '豪華經濟艙'
      case 'BUSINESS':
        return '商務艙'
      case 'FIRST_CLASS':
        return '頭等艙'
      default:
        return cabin
    }
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .container {
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%);
          color: #000;
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }
        .content {
          padding: 30px 20px;
        }
        .booking-number {
          background-color: #FEF3C7;
          border-left: 4px solid #F59E0B;
          padding: 15px;
          margin: 20px 0;
          font-size: 18px;
          font-weight: bold;
        }
        .flight-info {
          background-color: #F9FAFB;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          font-size: 14px;
        }
        .flight-route {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 20px 0;
        }
        .flight-route .city {
          text-align: center;
          flex: 1;
        }
        .flight-route .city .code {
          font-size: 32px;
          font-weight: bold;
          color: #F59E0B;
        }
        .flight-route .city .name {
          font-size: 14px;
          color: #6B7280;
        }
        .flight-route .arrow {
          flex: 0 0 50px;
          text-align: center;
          color: #9CA3AF;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #E5E7EB;
        }
        .info-row:last-child {
          border-bottom: none;
        }
        .info-label {
          color: #6B7280;
          font-size: 14px;
        }
        .info-value {
          font-weight: 600;
          color: #111827;
        }
        .footer {
          background-color: #F9FAFB;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #6B7280;
        }
        .button {
          display: inline-block;
          background-color: #F59E0B;
          color: #000;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
          margin: 20px 0;
        }
        .important-notice {
          background-color: #FEE2E2;
          border-left: 4px solid #EF4444;
          padding: 15px;
          margin: 20px 0;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1><img src="${BASE_URL}/images/logoremovebkgnd.png" alt="Yellow Airlines" style="width: 100px; height: 100px;"> 預訂確認</h1>
          <p style="margin: 10px 0 0 0;">Yellow Airlines - 黃色航空</p>
        </div>
        
        <div class="content">
          <p>尊敬的 <strong>${passengerName}</strong>，</p>
          <p>感謝您選擇 Yellow Airlines！您的航班預訂已確認。</p>
          
          <div class="booking-number">
            預訂編號：${bookingNumber}
          </div>
          
          <div class="flight-info">
            <h2 style="margin-top: 0; color: #111827;">航班信息</h2>
            
            <div class="flight-route">
              <div class="city">
                <div class="code">${from}</div>
                <div class="name">${fromCity}</div>
              </div>
              <div class="arrow">
                 →
              </div>
              <div class="city">
                <div class="code">${to}</div>
                <div class="name">${toCity}</div>
              </div>
            </div>
            
            <div class="info-row">
              <span class="info-label">航班號</span>
              <span class="info-value">${flightNumber}</span>
            </div>
            
            <div class="info-row">
              <span class="info-label">出發日期</span>
              <span class="info-value">${formatDate(flightDate)}</span>
            </div>
            
            <div class="info-row">
              <span class="info-label">起飛時間</span>
              <span class="info-value">${formatTime(departureTime)}</span>
            </div>
            
            <div class="info-row">
              <span class="info-label">到達時間</span>
              <span class="info-value">${formatTime(arrivalTime)}</span>
            </div>
            
            <div class="info-row">
              <span class="info-label">艙位</span>
              <span class="info-value">${getCabinClassName(cabinClass)}</span>
            </div>
            
            ${seatNumber ? `
            <div class="info-row">
              <span class="info-label">座位號</span>
              <span class="info-value">${seatNumber}</span>
            </div>
            ` : ''}
            
            <div class="info-row">
              <span class="info-label">總價</span>
              <span class="info-value" style="color: #F59E0B; font-size: 18px;">HKD ${totalPrice.toLocaleString()}</span>
            </div>
          </div>
          
          <div class="important-notice">
            <strong>⚠️ 重要提示：</strong><br>
            • 請提前 3 小時到達機場辦理登機手續<br>
            • 請攜帶有效旅行證件（護照/身份證）<br>
            • 可在起飛前 24 小時進行在線值機
          </div>
          
          <div style="text-align: center;">
            <a href="${BASE_URL}/check-in?bookingNumber=${bookingNumber}" class="button">
              在線值機
            </a>
          </div>
          
          <p style="margin-top: 30px; color: #6B7280; font-size: 14px;">
            如有任何疑問，請聯繫我們的客服中心：<br>
            電話：+852 3001 8888<br>
            電郵：support@yellowairlines.com
          </p>
        </div>
        
        <div class="footer">
          <p><strong>Yellow Airlines</strong></p>
          <p>Your Journey, Our Passion</p>
          <p>此郵件為系統自動發送，請勿直接回覆。</p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    const info = await transporter.sendMail({
      from: '"Yellow Airlines" <noreply@flaps1f.com>',
      to: emailTo,
      subject: `預訂確認 - ${bookingNumber} | Yellow Airlines`,
      html: htmlContent,
    })

    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

// 發送密碼重置郵件
export async function sendPasswordResetEmail(emailTo: string, token: string) {
  const resetLink = `${BASE_URL}/auth/reset-password?token=${token}`

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .container { background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 30px; }
        .header { text-align: center; margin-bottom: 30px; }
        .button { display: inline-block; background-color: #F59E0B; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; }
        .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>重置您的密碼</h1>
        </div>
        <p>您好，</p>
        <p>我們收到了您重置 Yellow Airlines 帳戶密碼的請求。</p>
        <p>請點擊下方按鈕重置密碼（鏈接有效期為 1 小時）：</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" class="button">重置密碼</a>
        </div>
        <p>如果按鈕無法點擊，請複製以下鏈接至瀏覽器：</p>
        <p style="word-break: break-all; color: #666;">${resetLink}</p>
        <p>如果您未發送此請求，請忽略此郵件。</p>
        <div class="footer">
          <p>© 2025 Yellow Airlines</p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    const info = await transporter.sendMail({
      from: '"Yellow Airlines" <noreply@flaps1f.com>',
      to: emailTo,
      subject: '重置密碼 | Yellow Airlines',
      html: htmlContent,
    })
    console.log('Reset password email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending reset email:', error)
    throw error
  }
}

// 發送郵箱驗證郵件
export async function sendVerificationEmail(emailTo: string, token: string) {
  const verifyLink = `${BASE_URL}/auth/verify-email?token=${token}`

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .container { background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 30px; }
        .header { text-align: center; margin-bottom: 30px; }
        .button { display: inline-block; background-color: #F59E0B; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; }
        .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>驗證您的電子郵箱</h1>
        </div>
        <p>您好，</p>
        <p>感謝您註冊 Yellow Airlines。請點擊下方按鈕驗證您的電子郵箱地址：</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verifyLink}" class="button">驗證郵箱</a>
        </div>
        <p>如果按鈕無法點擊，請複製以下鏈接至瀏覽器：</p>
        <p style="word-break: break-all; color: #666;">${verifyLink}</p>
        <div class="footer">
          <p>© 2025 Yellow Airlines</p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    const info = await transporter.sendMail({
      from: '"Yellow Airlines" <noreply@flaps1f.com>',
      to: emailTo,
      subject: '驗證您的電子郵箱 | Yellow Airlines',
      html: htmlContent,
    })
    console.log('Verification email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending verification email:', error)
    throw error
  }
}

// 驗證 SMTP 連接
export async function verifyEmailConnection() {
  try {
    await transporter.verify()
    console.log('✅ SMTP server is ready to send emails')
    return true
  } catch (error) {
    console.error('❌ SMTP server connection failed:', error)
    return false
  }
}
