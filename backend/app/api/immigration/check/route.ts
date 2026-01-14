import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const passport = searchParams.get('passport')
  const destination = searchParams.get('destination')

  if (!passport || !destination) {
    return NextResponse.json(
      { error: 'Passport and destination are required' },
      { status: 400 }
    )
  }

  // Same country check (Home Country / Right of Abode)
  if (passport === destination) {
    return NextResponse.json({
      type: 'HOME_COUNTRY',
      visaStatus: 'RIGHT_OF_ABODE',
      notesEn: 'You have the right of abode / citizenship.',
      notesZhCn: '您拥有居留权/公民身份，入境无需签证。',
      notesZhHk: '您擁有居留權/公民身份，入境無需簽證。',
      notesDe: 'Sie haben das Aufenthaltsrecht / die Staatsbürgerschaft.'
    })
  }

  try {
    const rule = await prisma.immigrationRule.findUnique({
      where: {
        passportCode_destCode: {
          passportCode: passport,
          destCode: destination
        }
      },
      include: {
        passport: true,
        destination: true
      }
    })

    if (!rule) {
      // Default fallback if no rule exists in DB
      return NextResponse.json({
        type: 'NO_DATA',
        visaStatus: 'UNKNOWN',
        notesEn: 'Please contact the nearest embassy for information.',
        notesZhCn: '请联系最近的大使馆获取信息。',
        notesZhHk: '請聯絡最近的大使館獲取信息。',
        notesDe: 'Bitte kontaktieren Sie die nächste Botschaft für Informationen.'
      })
    }

    return NextResponse.json({
      type: 'RULE_FOUND',
      ...rule
    })

  } catch (error) {
    console.error('Error fetching immigration rule:', error)
    return NextResponse.json(
      { error: 'Failed to fetch immigration rule' },
      { status: 500 }
    )
  }
}
