import { ConvexHttpClient } from 'convex/browser'

/**
 * Returns a Convex HTTP client. Reads NEXT_PUBLIC_CONVEX_URL (set by `npx convex dev`).
 * Throws a clear error if not configured so we never silently swallow writes.
 */
export function convex() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL
  if (!url) {
    throw new Error(
      'NEXT_PUBLIC_CONVEX_URL is not set. Run `npx convex dev` to provision a deployment, ' +
        'then add the printed URL to .env.local and your hosting environment.',
    )
  }
  return new ConvexHttpClient(url)
}
