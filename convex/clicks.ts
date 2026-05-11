import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const record = mutation({
  args: {
    path: v.string(),
    x: v.number(),
    y: v.number(),
    viewportWidth: v.number(),
    viewportHeight: v.number(),
    pageHeight: v.number(),
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('clicks', { ...args, timestamp: Date.now() })
  },
})

export const byPath = query({
  args: { path: v.string(), sinceMs: v.optional(v.number()), limit: v.optional(v.number()) },
  handler: async (ctx, { path, sinceMs, limit }) => {
    const all = await ctx.db
      .query('clicks')
      .withIndex('by_path', (q) => q.eq('path', path))
      .order('desc')
      .take(Math.min(limit ?? 5000, 20000))
    if (sinceMs == null) return all
    return all.filter((r) => r.timestamp >= sinceMs)
  },
})

export const distinctPaths = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query('clicks').collect()
    const paths = new Map<string, number>()
    for (const r of rows) paths.set(r.path, (paths.get(r.path) ?? 0) + 1)
    return Array.from(paths.entries())
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
  },
})
