import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Placeholder: here you'd connect to Mailchimp/SendGrid or database
    console.log('Newsletter signup:', email)

    return NextResponse.json({ success: true, email }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}

export function GET() {
  return NextResponse.json({ status: 'ok' })
}
