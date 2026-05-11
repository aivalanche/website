import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { convex } from '@/lib/convex'
import { api } from '@/convex/_generated/api'

const SALT = process.env.IP_HASH_SALT || 'labflow-default-salt-change-me'

function hashIp(ip) {
  return crypto.createHash('sha256').update(SALT).update(ip).digest('hex').slice(0, 32)
}

function prefixIp(ip) {
  // IPv4 /24 (truncate last octet) or IPv6 first 4 groups.
  if (!ip) return 'unknown'
  if (ip.includes(':')) {
    return ip.split(':').slice(0, 4).join(':') + '::/64'
  }
  const parts = ip.split('.')
  if (parts.length !== 4) return 'unknown'
  return `${parts[0]}.${parts[1]}.${parts[2]}.0/24`
}

function getIp(request) {
  const xff = request.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  const real = request.headers.get('x-real-ip')
  if (real) return real
  return '0.0.0.0'
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  const ip = getIp(request)
  const ipHash = hashIp(ip)
  const ipPrefix = prefixIp(ip)
  const userAgent = request.headers.get('user-agent') ?? undefined
  const referer = request.headers.get('referer') ?? undefined
  const country = request.headers.get('cloudfront-viewer-country') ?? undefined
  const city = request.headers.get('cloudfront-viewer-city') ?? undefined

  try {
    const client = convex()
    const { type } = body || {}

    if (type === 'page') {
      const { path, sessionId } = body
      if (typeof path !== 'string' || path.length > 256) {
        return NextResponse.json({ error: 'Bad path' }, { status: 400 })
      }
      await client.mutation(api.visitors.record, {
        path,
        ipHash,
        ipPrefix,
        userAgent,
        referer,
        country,
        city,
        sessionId,
      })
      return new NextResponse(null, { status: 204 })
    }

    if (type === 'click') {
      const { path, x, y, viewportWidth, viewportHeight, pageHeight, sessionId } = body
      if (typeof path !== 'string' || typeof x !== 'number' || typeof y !== 'number') {
        return NextResponse.json({ error: 'Bad click payload' }, { status: 400 })
      }
      await client.mutation(api.clicks.record, {
        path,
        x: Math.max(0, Math.min(1, x)),
        y: Math.max(0, Math.min(1, y)),
        viewportWidth: viewportWidth || 0,
        viewportHeight: viewportHeight || 0,
        pageHeight: pageHeight || 0,
        sessionId: String(sessionId || 'anon'),
      })
      return new NextResponse(null, { status: 204 })
    }

    return NextResponse.json({ error: 'Unknown type' }, { status: 400 })
  } catch (e) {
    // Tracking failures are fatal-soft — log + return 204 so the client doesn't retry.
    console.error('[track] failed:', e?.message)
    return new NextResponse(null, { status: 204 })
  }
}
