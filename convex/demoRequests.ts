import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const add = mutation({
  args: {
    name: v.string(),
    companyName: v.string(),
    contactNumber: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('demoRequests', { ...args, timestamp: Date.now() })
  },
})

export const list = query({
  args: {},
  handler: async (ctx) => ctx.db.query('demoRequests').withIndex('by_timestamp').order('desc').collect(),
})
