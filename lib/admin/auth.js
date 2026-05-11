/**
 * Admin auth. A single ADMIN_PASSWORD env var gates the /admin tree.
 * On success we set an httpOnly cookie containing an HMAC-signed timestamp;
 * on every admin request we re-verify the HMAC and the age. No DB involved —
 * stateless, survives Lambda cold starts.
 */
import crypto from 'crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'lf_admin'
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7 // 7 days

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET
  if (!s || s.length < 16) {
    throw new Error('ADMIN_SESSION_SECRET is missing or too short. Set a 32+ char random hex string in .env.local.')
  }
  return s
}

function sign(payload) {
  return crypto.createHmac('sha256', secret()).update(payload).digest('base64url')
}

function constantTimeEqual(a, b) {
  const A = Buffer.from(a)
  const B = Buffer.from(b)
  if (A.length !== B.length) return false
  return crypto.timingSafeEqual(A, B)
}

export function verifyPassword(input) {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected || expected.length < 8) {
    throw new Error('ADMIN_PASSWORD is missing or too short (>= 8 chars).')
  }
  if (!input || typeof input !== 'string') return false
  return constantTimeEqual(input, expected)
}

export function issueSessionCookie() {
  const now = Date.now()
  const payload = String(now)
  const sig = sign(payload)
  const value = `${payload}.${sig}`
  cookies().set(COOKIE_NAME, value, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE_SECONDS,
  })
}

export function clearSessionCookie() {
  cookies().set(COOKIE_NAME, '', { httpOnly: true, path: '/', maxAge: 0 })
}

/** Returns true if the current request carries a valid admin session cookie. */
export function isAuthed() {
  const raw = cookies().get(COOKIE_NAME)?.value
  if (!raw) return false
  const dot = raw.indexOf('.')
  if (dot < 0) return false
  const payload = raw.slice(0, dot)
  const sig = raw.slice(dot + 1)
  if (sign(payload) !== sig) return false
  const issued = Number(payload)
  if (!Number.isFinite(issued)) return false
  if (Date.now() - issued > MAX_AGE_SECONDS * 1000) return false
  return true
}

export { COOKIE_NAME }
