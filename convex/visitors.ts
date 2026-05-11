import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const record = mutation({
  args: {
    path: v.string(),
    ipHash: v.string(),
    ipPrefix: v.string(),
    userAgent: v.optional(v.string()),
    referer: v.optional(v.string()),
    country: v.optional(v.string()),
    city: v.optional(v.string()),
    sessionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('visitors', { ...args, timestamp: Date.now() })
  },
})

export const recent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    return await ctx.db
      .query('visitors')
      .withIndex('by_timestamp')
      .order('desc')
      .take(Math.min(limit ?? 200, 1000))
  },
})

export const pathStats = query({
  args: { sinceMs: v.optional(v.number()) },
  handler: async (ctx, { sinceMs }) => {
    const cutoff = sinceMs ?? Date.now() - 1000 * 60 * 60 * 24 * 30
    const rows = await ctx.db
      .query('visitors')
      .withIndex('by_timestamp', (q) => q.gte('timestamp', cutoff))
      .collect()
    const totals: Record<string, { views: number; unique: Set<string> }> = {}
    for (const r of rows) {
      const slot = (totals[r.path] = totals[r.path] ?? { views: 0, unique: new Set() })
      slot.views += 1
      slot.unique.add(r.ipHash)
    }
    return Object.entries(totals)
      .map(([path, { views, unique }]) => ({ path, views, uniqueVisitors: unique.size }))
      .sort((a, b) => b.views - a.views)
  },
})

export const summary = query({
  args: {},
  handler: async (ctx) => {
    const dayMs = 1000 * 60 * 60 * 24
    const now = Date.now()
    const last24 = await ctx.db
      .query('visitors')
      .withIndex('by_timestamp', (q) => q.gte('timestamp', now - dayMs))
      .collect()
    const last7 = await ctx.db
      .query('visitors')
      .withIndex('by_timestamp', (q) => q.gte('timestamp', now - 7 * dayMs))
      .collect()
    const last30 = await ctx.db
      .query('visitors')
      .withIndex('by_timestamp', (q) => q.gte('timestamp', now - 30 * dayMs))
      .collect()
    return {
      last24: { views: last24.length, unique: new Set(last24.map((r) => r.ipHash)).size },
      last7: { views: last7.length, unique: new Set(last7.map((r) => r.ipHash)).size },
      last30: { views: last30.length, unique: new Set(last30.map((r) => r.ipHash)).size },
    }
  },
})

export const byPath = query({
  args: { path: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, { path, limit }) => {
    return await ctx.db
      .query('visitors')
      .withIndex('by_path', (q) => q.eq('path', path))
      .order('desc')
      .take(Math.min(limit ?? 200, 1000))
  },
})
