const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding immigration data...')

  // 1. Seed Countries
  const countries = [
    {
      code: 'CN',
      nameDe: 'China',
      nameEn: 'China',
      nameZhCn: '中国',
      nameZhHk: '中國'
    },
    {
      code: 'HK',
      nameDe: 'Hongkong',
      nameEn: 'Hong Kong',
      nameZhCn: '香港',
      nameZhHk: '香港'
    },
    {
      code: 'US',
      nameDe: 'USA',
      nameEn: 'USA',
      nameZhCn: '美国',
      nameZhHk: '美國'
    },
    {
      code: 'DE',
      nameDe: 'Deutschland',
      nameEn: 'Germany',
      nameZhCn: '德国',
      nameZhHk: '德國'
    },
    {
      code: 'JP',
      nameDe: 'Japan',
      nameEn: 'Japan',
      nameZhCn: '日本',
      nameZhHk: '日本'
    },
    {
      code: 'EL', // Fictional code for Einsenland
      nameDe: 'Einsenland',
      nameEn: 'Einsenland',
      nameZhCn: '埃森兰国',
      nameZhHk: '埃森蘭國'
    }
  ]

  for (const country of countries) {
    await prisma.country.upsert({
      where: { code: country.code },
      update: country,
      create: country
    })
  }

  console.log('Countries seeded.')

  // 2. Seed Immigration Rules
  const rules = [
    // US Passport -> China
    {
      passportCode: 'US',
      destCode: 'CN',
      visaStatus: 'VISA_REQUIRED',
      stayDuration: '60-90 days usually',
      notesEn: 'Visa required for tourism. 10-year multi-entry available.',
      notesZhCn: '需要签证。可申请10年多次往返签证。',
      notesZhHk: '需要簽證。可申請10年多次往返簽證。',
      notesDe: 'Visum erforderlich. 10-Jahres-Visum für mehrfache Einreise verfügbar.',
      
      healthEn: 'Customs Health Declaration required (via WeChat or Web).',
      healthZhCn: '需填写海关健康申报（通过微信或网页）。',
      healthZhHk: '需填寫海關健康申報（通過微信或網頁）。',
      healthDe: 'Gesundheitserklärung beim Zoll erforderlich (über WeChat oder Web).',

      customsEn: 'Declare currency over 5000 USD. Strict checks on electronics/media.',
      customsZhCn: '携带外币超过5000美元需申报。严格检查电子产品/媒体。',
      customsZhHk: '攜帶外幣超過5000美元需申報。嚴格檢查電子產品/媒體。',
      customsDe: 'Währung über 5000 USD deklarieren. Strenge Kontrollen bei Elektronik/Medien.',

      entryFormEn: 'Arrival Card for Foreigners required.',
      entryFormZhCn: '需填写外国人入境卡。',
      entryFormZhHk: '需填寫外國人入境卡。',
      entryFormDe: 'Einreisekarte für Ausländer erforderlich.'
    },
    // HK Passport -> US
    {
      passportCode: 'HK',
      destCode: 'US',
      visaStatus: 'VISA_REQUIRED',
      stayDuration: 'Up to 6 months',
      notesEn: 'Visa required (B1/B2). Interview typically required.',
      notesZhCn: '需要签证（B1/B2）。通常需要面试。',
      notesZhHk: '需要簽證（B1/B2）。通常需要面試。',
      notesDe: 'Visum erforderlich (B1/B2). Interview normalerweise erforderlich.',

      healthEn: 'No specific COVID requirements.',
      healthZhCn: '无特定COVID要求。',
      healthZhHk: '無特定COVID要求。',
      healthDe: 'Keine spezifischen COVID-Anforderungen.',

      customsEn: 'Declare currency over 10,000 USD. No meat/fruit products.',
      customsZhCn: '携带超过10,000美元需申报。禁止携带肉类/水果。',
      customsZhHk: '攜帶超過10,000美元需申報。禁止攜帶肉類/水果。',
      customsDe: 'Währung über 10.000 USD deklarieren. Keine Fleisch-/Obstprodukte.',

      entryFormEn: 'No paper form usually. APC kiosks available.',
      entryFormZhCn: '通常无纸质表格。可用APC自助机。',
      entryFormZhHk: '通常無紙質表格。可用APC自助機。',
      entryFormDe: 'Normalerweise kein Papierformular. APC-Kioske verfügbar.'
    },
    // US Passport -> Japan
    {
      passportCode: 'US',
      destCode: 'JP',
      visaStatus: 'VISA_FREE',
      stayDuration: '90 days',
      notesEn: 'Visa-free for tourism.',
      notesZhCn: '旅游免签。',
      notesZhHk: '旅遊免簽。',
      notesDe: 'Visumfrei für Tourismus.',

      healthEn: 'No specific requirements.',
      healthZhCn: '无特殊要求。',
      healthZhHk: '無特殊要求。',
      healthDe: 'Keine besonderen Anforderungen.',

      customsEn: 'Visit Japan Web QR code recommended for fast track.',
      customsZhCn: '建议使用Visit Japan Web二维码以便快速通关。',
      customsZhHk: '建議使用Visit Japan Web二維碼以便快速通關。',
      customsDe: 'Visit Japan Web QR-Code für Schnellabfertigung empfohlen.',

      entryFormEn: 'Disembarkation Card required (Paper or QR).',
      entryFormZhCn: '需填写入境卡（纸质或二维码）。',
      entryFormZhHk: '需填寫入境卡（紙質或二維碼）。',
      entryFormDe: 'Einreisekarte erforderlich (Papier oder QR).'
    },
    // US Passport -> Einsenland (Placeholder)
    {
      passportCode: 'US',
      destCode: 'EL',
      visaStatus: 'VISA_REQUIRED', // Default conservative
      stayDuration: '30 days',
      notesEn: 'Please contact local embassy for latest requirements.',
      notesZhCn: '请联系当地大使馆获取最新要求。',
      notesZhHk: '請聯絡當地大使館獲取最新要求。',
      notesDe: 'Bitte kontaktieren Sie die örtliche Botschaft für aktuelle Anforderungen.',

      healthEn: 'Yellow Fever vaccination certificate if arriving from infected area.',
      healthZhCn: '如来自疫区需黄热病疫苗证书。',
      healthZhHk: '如來自疫區需黃熱病疫苗證書。',
      healthDe: 'Gelbfieberimpfbescheinigung bei Anreise aus Infektionsgebiet.',

      customsEn: 'Standard declaration.',
      customsZhCn: '标准申报。',
      customsZhHk: '標準申報。',
      customsDe: 'Standarddeklaration.',

      entryFormEn: 'Arrival Card required.',
      entryFormZhCn: '需填写入境卡。',
      entryFormZhHk: '需填寫入境卡。',
      entryFormDe: 'Einreisekarte erforderlich.'
    },
    // Einsenland Passport -> US (Placeholder)
    {
      passportCode: 'EL',
      destCode: 'US',
      visaStatus: 'VISA_REQUIRED',
      stayDuration: 'N/A',
      notesEn: 'Visa required.',
      notesZhCn: '需要签证。',
      notesZhHk: '需要簽證。',
      notesDe: 'Visum erforderlich.',

      healthEn: 'None.',
      healthZhCn: '无。',
      healthZhHk: '無。',
      healthDe: 'Keine.',

      customsEn: 'Declare > $10k.',
      customsZhCn: '超过1万美元需申报。',
      customsZhHk: '超過1萬美元需申報。',
      customsDe: 'Über 10.000 $ deklarieren.',

      entryFormEn: 'Visa application required beforehand.',
      entryFormZhCn: '需提前申请签证。',
      entryFormZhHk: '需提前申請簽證。',
      entryFormDe: 'Visumantrag im Voraus erforderlich.'
    },
    // China -> Einsenland
    {
      passportCode: 'CN',
      destCode: 'EL',
      visaStatus: 'VISA_ON_ARRIVAL',
      stayDuration: '14 days',
      notesEn: 'Visa on arrival available at major airports.',
      notesZhCn: '主要机场提供落地签。',
      notesZhHk: '主要機場提供落地簽。',
      notesDe: 'Visum bei Ankunft an größeren Flughäfen verfügbar.',

      healthEn: 'None.',
      healthZhCn: '无。',
      healthZhHk: '無。',
      healthDe: 'Keine.',

      customsEn: 'Standard.',
      customsZhCn: '标准。',
      customsZhHk: '標準。',
      customsDe: 'Standard.',

      entryFormEn: 'Arrival Card.',
      entryFormZhCn: '入境卡。',
      entryFormZhHk: '入境卡。',
      entryFormDe: 'Einreisekarte.'
    },
    // HK -> Japan
    {
      passportCode: 'HK',
      destCode: 'JP',
      visaStatus: 'VISA_FREE',
      stayDuration: '90 days',
      notesEn: 'Visa-free for tourism, business, and visiting friends/relatives.',
      notesZhCn: '旅游、商务及探亲访友免签。',
      notesZhHk: '旅遊、商務及探親訪友免簽。',
      notesDe: 'Visumfrei für Tourismus, Geschäftsreisen und Besuche von Freunden/Verwandten.',

      healthEn: 'No specific requirements.',
      healthZhCn: '无特殊要求。',
      healthZhHk: '無特殊要求。',
      healthDe: 'Keine besonderen Anforderungen.',

      customsEn: 'Visit Japan Web QR code recommended.',
      customsZhCn: '建议使用Visit Japan Web二维码。',
      customsZhHk: '建議使用Visit Japan Web二維碼。',
      customsDe: 'Visit Japan Web QR-Code empfohlen.',

      entryFormEn: 'Disembarkation Card (QR or Paper).',
      entryFormZhCn: '入境卡（二维码或纸质）。',
      entryFormZhHk: '入境卡（二維碼或紙質）。',
      entryFormDe: 'Einreisekarte (QR oder Papier).'
    },
    // HK -> Germany (Schengen)
    {
      passportCode: 'HK',
      destCode: 'DE',
      visaStatus: 'VISA_FREE',
      stayDuration: '90 days (in 180 days)',
      notesEn: 'Visa-free entry to Schengen area.',
      notesZhCn: '免签进入申根区。',
      notesZhHk: '免簽進入申根區。',
      notesDe: 'Visumfreie Einreise in den Schengen-Raum.',

      healthEn: 'None.',
      healthZhCn: '无。',
      healthZhHk: '無。',
      healthDe: 'Keine.',

      customsEn: 'Declare cash > 10,000 EUR.',
      customsZhCn: '携带现金超过10,000欧元需申报。',
      customsZhHk: '攜帶現金超過10,000歐元需申報。',
      customsDe: 'Bargeld über 10.000 EUR anmelden.',

      entryFormEn: 'No landing card usually.',
      entryFormZhCn: '通常无需入境卡。',
      entryFormZhHk: '通常無需入境卡。',
      entryFormDe: 'Normalerweise keine Landekarte.'
    },
    // HK -> China
    {
      passportCode: 'HK',
      destCode: 'CN',
      visaStatus: 'PERMIT_REQUIRED',
      stayDuration: 'Unlimited',
      notesEn: 'Home Return Permit required.',
      notesZhCn: '需要回乡证（港澳居民来往内地通行证）。',
      notesZhHk: '需要回鄉證（港澳居民來往內地通行證）。',
      notesDe: 'Heimkehrschein erforderlich.',

      healthEn: 'Health Declaration QR (Black code) was removed Nov 2023, but random checks possible.',
      healthZhCn: '健康申报（黑码）已取消，但可能有随机抽查。',
      healthZhHk: '健康申報（黑碼）已取消，但可能有隨機抽查。',
      healthDe: 'Gesundheitserklärung (Black Code) wurde abgeschafft.',

      customsEn: 'Standard customs check.',
      customsZhCn: '标准海关检查。',
      customsZhHk: '標準海關檢查。',
      customsDe: 'Standard-Zollkontrolle.',

      entryFormEn: 'No entry card with Home Return Permit.',
      entryFormZhCn: '持回乡证无需填卡。',
      entryFormZhHk: '持回鄉證無需填卡。',
      entryFormDe: 'Keine Einreisekarte mit Heimkehrschein.'
    },
    // CN -> Japan
    {
      passportCode: 'CN',
      destCode: 'JP',
      visaStatus: 'VISA_REQUIRED',
      stayDuration: '15/30/90 days',
      notesEn: 'Visa required. eVisa available for tourism.',
      notesZhCn: '需要签证。旅游可申请电子签。',
      notesZhHk: '需要簽證。旅遊可申請電子簽。',
      notesDe: 'Visum erforderlich. E-Visum für Touristen verfügbar.',

      healthEn: 'None.',
      healthZhCn: '无。',
      healthZhHk: '無。',
      healthDe: 'Keine.',

      customsEn: 'Visit Japan Web QR recommended.',
      customsZhCn: '建议使用Visit Japan Web二维码。',
      customsZhHk: '建議使用Visit Japan Web二維碼。',
      customsDe: 'Visit Japan Web QR empfohlen.',

      entryFormEn: 'Disembarkation Card required.',
      entryFormZhCn: '需填写入境卡。',
      entryFormZhHk: '需填寫入境卡。',
      entryFormDe: 'Einreisekarte erforderlich.'
    }
  ]

  for (const rule of rules) {
    await prisma.immigrationRule.upsert({
      where: {
        passportCode_destCode: {
          passportCode: rule.passportCode,
          destCode: rule.destCode
        }
      },
      update: rule,
      create: rule
    })
  }

  console.log('Immigration rules seeded.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
