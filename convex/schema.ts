import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  // Beta waitlist signups from the home page form.
  waitlist: defineTable({
    email: v.string(),
    locale: v.optional(v.string()),
    source: v.optional(v.string()),
    timestamp: v.number(),
  }).index('by_email', ['email']),

  // /request-demo form submissions.
  demoRequests: defineTable({
    name: v.string(),
    companyName: v.string(),
    contactNumber: v.string(),
    email: v.string(),
    message: v.string(),
    timestamp: v.number(),
  }).index('by_timestamp', ['timestamp']),

  // /contact form submissions.
  contactSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    subject: v.optional(v.string()),
    timestamp: v.number(),
  }).index('by_timestamp', ['timestamp']),

  // One row per page-view event. IP is hashed (sha-256 + salt) and we
  // store the /24 prefix separately so admins can spot patterns without
  // ever having the raw IP at rest.
  visitors: defineTable({
    path: v.string(),
    ipHash: v.string(),
    ipPrefix: v.string(),
    userAgent: v.optional(v.string()),
    referer: v.optional(v.string()),
    country: v.optional(v.string()),
    city: v.optional(v.string()),
    sessionId: v.optional(v.string()),
    timestamp: v.number(),
  })
    .index('by_path', ['path'])
    .index('by_timestamp', ['timestamp'])
    .index('by_session', ['sessionId']),

  // Click events for the heatmap. Coords are normalized 0..1.
  clicks: defineTable({
    path: v.string(),
    x: v.number(),
    y: v.number(),
    viewportWidth: v.number(),
    viewportHeight: v.number(),
    pageHeight: v.number(),
    sessionId: v.string(),
    timestamp: v.number(),
  })
    .index('by_path', ['path'])
    .index('by_timestamp', ['timestamp']),

  // Audit log of every email the admin tool sends.
  emails: defineTable({
    to: v.string(),
    subject: v.string(),
    body: v.string(),
    sentAt: v.number(),
    success: v.boolean(),
    error: v.optional(v.string()),
    audienceSize: v.optional(v.number()),
    sentBy: v.optional(v.string()),
  }).index('by_sentAt', ['sentAt']),
})
