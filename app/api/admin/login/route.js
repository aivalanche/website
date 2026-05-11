import { NextResponse } from 'next/server'
import { verifyPassword, issueSessionCookie } from '@/lib/admin/auth'

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }
  if (!verifyPassword(body?.password)) {
    return NextResponse.json({ error: 'Wrong password' }, { status: 401 })
  }
  issueSessionCookie()
  return NextResponse.json({ ok: true })
}
