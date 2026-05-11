import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const record = mutation({
  args: {
    to: v.string(),
    subject: v.string(),
    body: v.string(),
    success: v.boolean(),
    error: v.optional(v.string()),
    audienceSize: v.optional(v.number()),
    sentBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('emails', { ...args, sentAt: Date.now() })
  },
})

export const recent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    return await ctx.db
      .query('emails')
      .withIndex('by_sentAt')
      .order('desc')
      .take(Math.min(limit ?? 50, 500))
  },
})
