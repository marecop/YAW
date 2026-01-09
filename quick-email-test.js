const nodemailer = require('nodemailer')

// 從命令行參數獲取郵箱地址
const testEmail = process.argv[2] || 'noreply@flaps1f.com'

console.log('\n════════════════════════════════════════════════════════════════')
console.log('           📧 Yellow Airlines 郵件測試')
console.log('════════════════════════════════════════════════════════════════\n')
console.log(`測試郵箱: ${testEmail}\n`)

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

async function test() {
  try {
    console.log('⏳ 正在連接 SMTP 服務器...')
    await transporter.verify()
    console.log('✅ SMTP 連接成功\n')
    
    console.log('⏳ 正在發送測試郵件...')
    const info = await transporter.sendMail({
      from: '"Yellow Airlines" <noreply@flaps1f.com>',
      to: testEmail,
      subject: '✈️ Yellow Airlines 測試郵件',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">✈️ Yellow Airlines</h1>
          </div>
          <div style="padding: 30px; background: white; border: 1px solid #e5e7eb;">
            <h2 style="color: #111827;">測試郵件</h2>
            <p style="color: #6b7280; line-height: 1.6;">
              這是一封來自 Yellow Airlines 的測試郵件。<br>
              如果您收到這封郵件，說明郵件系統工作正常！
            </p>
            <div style="background: #fef3c7; padding: 20px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <strong style="color: #92400e;">✅ 郵件功能正常</strong><br>
              <span style="color: #92400e; font-size: 14px;">
                發送時間: ${new Date().toLocaleString('zh-HK')}
              </span>
            </div>
          </div>
        </div>
      `,
    })
    
    console.log('✅ 郵件發送成功！\n')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('Message ID:', info.messageId)
    console.log('收件人:', testEmail)
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('📬 請檢查以下位置：')
    console.log('   1. 收件箱')
    console.log('   2. 垃圾郵件文件夾 ⭐')
    console.log('   3. 促銷/社交標籤（Gmail）')
    console.log('\n⏱️  郵件可能需要 1-5 分鐘送達\n')
    console.log('════════════════════════════════════════════════════════════════\n')
    
  } catch (error) {
    console.log('❌ 發送失敗\n')
    console.error('錯誤:', error.message)
    if (error.code) console.error('代碼:', error.code)
    console.log('\n════════════════════════════════════════════════════════════════\n')
    process.exit(1)
  }
}

test()
