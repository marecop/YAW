import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

// 載入環境變數
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// 允許的前端域名
const getAllowedOrigins = () => {
  if (process.env.FRONTEND_URL) {
    return process.env.FRONTEND_URL.split(',').map(url => url.trim())
  }
  return [
    'http://localhost:3000',
    /^https:\/\/.*\.vercel\.app$/,
    /^https:\/\/.*\.vercel\.dns$/,
  ]
}

// CORS 配置
app.use(cors({
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = getAllowedOrigins()
    
    // 允許沒有 origin 的請求（如 Postman、curl）
    if (!origin) {
      return callback(null, true)
    }
    
    // 檢查是否匹配允許的域名
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        if (allowed.includes('*')) {
          const pattern = allowed.replace(/\*/g, '.*')
          return new RegExp(`^${pattern}$`).test(origin)
        }
        return origin === allowed
      } else if (allowed instanceof RegExp) {
        return allowed.test(origin)
      }
      return false
    })
    
    if (isAllowed) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
}))

// 中間件
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

// 健康檢查
app.get('/health', (req: express.Request, res: express.Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API 路由
import authRoutes from './routes/auth'
import flightsRoutes from './routes/flights'
import bookingsRoutes from './routes/bookings'
import flightStatusRoutes from './routes/flight-status'
import adminRoutes from './routes/admin'
import notificationsRoutes from './routes/notifications'
import specialAssistanceRoutes from './routes/special-assistance'
import checkInRoutes from './routes/check-in'
import rewardsRoutes from './routes/rewards'
import immigrationRoutes from './routes/immigration'
import boardingPassRoutes from './routes/boarding-pass'
import usersRoutes from './routes/users'
import emailRoutes from './routes/email'
import cronRoutes from './routes/cron'

app.use('/api/auth', authRoutes)
app.use('/api/flights', flightsRoutes)
app.use('/api/bookings', bookingsRoutes)
app.use('/api/flight-status', flightStatusRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/notifications', notificationsRoutes)
app.use('/api/special-assistance', specialAssistanceRoutes)
app.use('/api/check-in', checkInRoutes)
app.use('/api/rewards', rewardsRoutes)
app.use('/api/immigration', immigrationRoutes)
app.use('/api/boarding-pass', boardingPassRoutes)
app.use('/api/users', usersRoutes)
app.use('/api', emailRoutes)
app.use('/api/cron', cronRoutes)

// 404 處理
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ error: 'Not found' })
})

// 錯誤處理
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  })
})

// 啟動服務器
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🌐 Health check: http://localhost:${PORT}/health`)
})
