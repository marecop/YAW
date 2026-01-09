const nodemailer = require('nodemailer')

async function testEmail() {
  console.log('\n🧪 測試郵件發送功能...\n')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
  
  // 询问用户邮箱
  const testEmail = process.argv[2]
  
  if (!testEmail) {
    console.log('❌ 請提供測試郵箱地址')
    console.log('\n使用方法:')
    console.log('   node test-email-now.js your-email@example.com\n')
    process.exit(1)
  }
  
  console.log(`📧 測試郵箱: ${testEmail}\n`)
  
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
  
  try {
    // 1. 测试 SMTP 连接
    console.log('1️⃣  測試 SMTP 連接...')
    await transporter.verify()
    console.log('   ✅ SMTP 服務器連接成功\n')
    
    // 2. 发送测试邮件
    console.log('2️⃣  發送測試郵件...')
    const info = await transporter.sendMail({
      from: '"Yellow Airlines" <noreply@flaps1f.com>',
      to: testEmail,
      subject: '✈️ Yellow Airlines 測試郵件 - ' + new Date().toLocaleTimeString('zh-CN'),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 32px;">✈️ Yellow Airlines</h1>
          </div>
          <div style="background: #ffffff; padding: 40px 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #111827; margin: 0 0 20px 0;">測試郵件</h2>
            <p style="color: #6b7280; font-size: 16px; line-height: 1.6;">
              這是一封來自 Yellow Airlines 預訂系統的測試郵件。
            </p>
            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 4px;">
              <p style="color: #92400e; margin: 0; font-size: 14px;">如果您收到這封郵件，說明：</p>
              <ul style="color: #92400e; margin: 10px 0; padding-left: 20px;">
                <li>✅ SMTP 配置正確</li>
                <li>✅ 郵件發送功能正常</li>
                <li>✅ 您的郵箱可以接收我們的郵件</li>
              </ul>
            </div>
            <p style="color: #6b7280; font-size: 14px;">
              發送時間: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Hong_Kong' })}<br>
              收件人: ${testEmail}<br>
              發件人: noreply@flaps1f.com
            </p>
          </div>
        </div>
      `,
    })
    
    console.log('   ✅ 郵件發送成功！\n')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('📋 發送詳情：')
    console.log('   Message ID:', info.messageId)
    console.log('   收件人:', testEmail)
    console.log('   發件人: noreply@flaps1f.com')
    console.log('   主題: Yellow Airlines 測試郵件')
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    console.log('⏳ 郵件可能需要 1-5 分鐘才能送達\n')
    console.log('🔍 請檢查以下位置：')
    console.log('   1. 收件箱')
    console.log('   2. 垃圾郵件文件夾')
    console.log('   3. 促銷/社交郵件標籤（Gmail）')
    console.log('   4. 已刪除郵件（如果有規則）\n')
    
    console.log('💡 如果 5 分鐘後仍未收到：')
    console.log('   • 檢查郵箱地址是否正確')
    console.log('   • 檢查郵箱容量是否已滿')
    console.log('   • 檢查郵箱服務商是否阻擋了發件域名\n')
    
  } catch (error) {
    console.log('   ❌ 發送失敗\n')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.error('❌ 錯誤詳情：')
    console.error('   消息:', error.message)
    if (error.code) {
      console.error('   錯誤代碼:', error.code)
    }
    if (error.response) {
      console.error('   服務器響應:', error.response)
    }
    console.log('\n')
    process.exit(1)
  }
}

testEmail()
