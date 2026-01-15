import express from 'express'
import { prisma } from '../lib/prisma'

const router = express.Router()

// 獲取國家列表
router.get('/countries', async (req, res) => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        code: 'asc'
      }
    })
    
    res.json(countries)
  } catch (error) {
    console.error('Error fetching countries:', error)
    res.status(500).json({ error: 'Failed to fetch countries' })
  }
})

// 檢查入境要求
router.post('/check', async (req, res) => {
  try {
    const { fromCountry, toCountry, nationality } = req.body

    if (!fromCountry || !toCountry || !nationality) {
      return res.status(400).json({ error: '缺少必要參數' })
    }

    // 查找入境要求
    const requirement = await prisma.immigrationRule.findFirst({
      where: {
        passportCode: nationality,
        destCode: toCountry
      }
    })

    if (!requirement) {
      return res.json({
        visaRequired: false,
        message: '未找到相關入境要求信息'
      })
    }

    res.json(requirement)
  } catch (error) {
    console.error('Error checking immigration requirements:', error)
    res.status(500).json({ error: '檢查入境要求失敗' })
  }
})

export default router
