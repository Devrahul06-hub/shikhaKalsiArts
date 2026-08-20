import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, pieceType, message } = body
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Placeholder: persist to database or send email
    console.log('Inquiry received:', { name, email, pieceType, message })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}

export function GET() {
  return NextResponse.json({ status: 'ok' })
}
