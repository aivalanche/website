# Labflow admin + Convex setup

This is the one-time setup for the admin console at `/admin` and the Convex backend that backs it.

## 1. Provision Convex

```bash
npx convex dev
```

The first run is interactive:

1. Sign in (creates an account if needed — free tier is plenty for this site).
2. Pick / create a project named `labflow` (or similar).
3. Convex writes two env vars to `.env.local`:
   - `NEXT_PUBLIC_CONVEX_URL`
   - `CONVEX_DEPLOYMENT`
4. It also generates `convex/_generated/` (typed API surface) and starts a watcher that auto-deploys every change under `convex/`.

Leave `npx convex dev` running in a second terminal while you develop. The schema in `convex/schema.ts` and the functions under `convex/*.ts` deploy on save.

## 2. Set the admin env vars

Copy `.env.example` to `.env.local`. Fill in:

```bash
ADMIN_PASSWORD=            # what you'll type at /admin/login (>= 16 chars)
ADMIN_SESSION_SECRET=      # 32 hex chars — `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
IP_HASH_SALT=              # 16 hex chars — same generator
SMTP_USER / SMTP_PASS      # AWS SES credentials (you already have these)
```

`ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` are the only ones that must be set for the admin to work. Without `SMTP_USER`/`SMTP_PASS`, the admin still runs but the "Send" button errors.

## 3. Run

```bash
# Terminal 1: Convex watcher
npx convex dev

# Terminal 2: Next.js
npm run dev
```

Visit:

- `/admin/login` → sign in with `ADMIN_PASSWORD`
- `/admin` → overview (KPIs, top pages, recent emails)
- `/admin/email` → send a single message or broadcast to the waitlist
- `/admin/visitors` → page-view log (hashed IPs, /24 prefixes, country if CloudFront passes it)
- `/admin/heatmap?path=/` → click density per page

## 4. Deploy

In AWS Amplify console → environment variables, add the same set listed in `.env.example`. The Convex URL is safe to expose (it's a public deployment URL); the secrets are server-side only.

Convex itself has nothing to deploy — it already runs in its own cloud. When you push to `main`, Amplify just builds Next.js and starts hitting the same Convex deployment.

## Data flowing into Convex

| Table | Source |
|---|---|
| `waitlist` | `/api/early-access` (home page signup form) |
| `demoRequests` | `/api/request-demo` |
| `contactSubmissions` | `/api/contact` |
| `visitors` | `/api/track` via the `<Tracker />` client component on every page |
| `clicks` | `/api/track` (also Tracker — every click on the public site) |
| `emails` | `/api/admin/email` — audit log of every admin send |

## Privacy

- IPs are SHA-256 hashed with `IP_HASH_SALT` before hitting the DB. The raw IP is never persisted.
- The `/24` (IPv4) or `/64` (IPv6) prefix IS stored so you can spot a single ISP / network without identifying individuals.
- Admin tree is `noindex,nofollow` (in metadata).
- Tracker skips `/admin/*` so your own admin sessions don't show up in the heatmap.
