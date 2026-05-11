import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const add = mutation({
  args: {
    email: v.string(),
    locale: v.optional(v.string()),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('waitlist')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .first()
    if (existing) {
      return { added: false, count: await countAll(ctx) }
    }
    await ctx.db.insert('waitlist', {
      email: args.email,
      locale: args.locale,
      source: args.source ?? 'landing-page',
      timestamp: Date.now(),
    })
    return { added: true, count: await countAll(ctx) }
  },
})

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('waitlist').order('desc').collect()
  },
})

export const count = query({
  args: {},
  handler: async (ctx) => {
    return await countAll(ctx)
  },
})

async function countAll(ctx: { db: { query: (t: string) => { collect: () => Promise<unknown[]> } } }) {
  const rows = await ctx.db.query('waitlist').collect()
  return rows.length
}
