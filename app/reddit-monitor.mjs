#!/usr/bin/env node
/**
 * Reddit Monitor v3 — Smart Search + Signal Cleaning + Thread Intelligence
 *
 * 3-layer relevance pipeline:
 *   1. Quoted phrase search on Reddit API
 *   2. Local keyword-presence filter
 *   3. GPT relevance scoring (money transfer context)
 *
 * Features:
 *   - Rich HTML digest at 8:00 AM CET via Telegram
 *   - Real-time watchdog alerts for active debates
 *   - --test flag for single-cycle smoke test
 *
 * Usage:
 *   node reddit-monitor.mjs              (run in foreground)
 *   node reddit-monitor.mjs --test       (single poll + test digest)
 *   pm2 start reddit-monitor.mjs --name reddit-monitor
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { HttpsProxyAgent } from "https-proxy-agent";

const __dirname = dirname(fileURLToPath(import.meta.url));
try {
    const envContent = readFileSync(resolve(__dirname, ".env"), "utf-8");
    for (const line of envContent.split(/\r?\n/)) {
        const t = line.trim();
        if (!t || t.startsWith("#")) continue;
        const eq = t.indexOf("=");
        if (eq < 0) continue;
        const k = t.slice(0, eq).trim();
        if (!process.env[k]) process.env[k] = t.slice(eq + 1).trim();
    }
} catch { /* no .env — fine */ }

const IS_TEST = process.argv.includes("--test");

// ═══════════════════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
    // Keywords — quoted for exact phrase matching on Reddit
    keywords: [
        '"send money abroad"',
        '"international money transfer"',
        '"transfer fees" remittance',
        '"cross-border payment"',
        '"cross border payment"',
        '"Western Union" alternative cheaper',
        '"Wise" transfer fees',
        '"Remitly" fees OR review',
        '"WhatsApp payment"',
        '"S2 Transfer"',
        '"money transfer app"',
        '"cheapest way to send money"',
        '"remittance fees"',
        '"send money to" Africa OR Asia OR Europe OR Latin',
    ],

    // Subreddits to monitor for new posts
    subreddits: [
        "personalfinance",
        "UKPersonalFinance",
        "eupersonalfinance",
        "expats",
        "digitalnomad",
        "IWantOut",
        "smallbusiness",
        "Entrepreneur",
        "fintech",
        "Banking",
        "immigration",
        "povertyfinance",
    ],

    // Subreddit denylist — skip these (referral/promo spam)
    subredditDenylist: new Set([
        "referralcodes", "referrallinks", "referralcodesaus",
        "signupsforpay", "beermoneyglobal", "promoreddit",
        "promocodes", "parrainage", "bonsplanscashbackfr",
        "referrals", "referralexchange", "makemoneyuk",
    ]),

    // Promo phrase filter — skip posts matching these patterns
    promoPatterns: /referral\s*(code|link)|sign\s*up\s*with\s*my|use\s*my\s*(code|link)|free\s*transfer\s*bonus|invite\s*(link|code)|referral\s*offer|promo\s*code|get\s*\$?\d+\s*free/i,

    // Relevance keywords — post must contain at least one (local filter)
    relevanceTerms: [
        "money transfer", "send money", "remittance", "remit",
        "wire transfer", "international transfer", "cross-border",
        "transfer fee", "exchange rate", "fx rate", "forex",
        "western union", "moneygram", "wise", "remitly", "worldremit",
        "xoom", "payoneer", "s2 transfer", "s2transfer",
        "sending money", "receive money", "money abroad",
        "payment abroad", "pay overseas", "pay internationally",
        "cheapest way", "best way to send", "how to send money",
        "fintech", "neobank", "mobile money", "m-pesa",
        "usdc", "stablecoin", "crypto payment", "crypto transfer",
        "corridor", "diaspora", "expat payment", "migrant worker",
    ],

    // Polling interval in minutes
    pollIntervalMinutes: IS_TEST ? 0 : 30,

    // Digest time (24h format, CET timezone)
    digestHour: 8,
    digestMinute: 0,
    timezone: "Europe/Berlin",

    // Telegram config
    telegramChatId: process.env.REDDIT_MONITOR_CHAT_ID || "",
    telegramToken: process.env.GROWTH_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || "",

    // OpenAI config for GPT relevance scoring
    openaiApiKey: process.env.OPENAI_API_KEY || "",
    gptModel: "gpt-4o-mini",

    // Max results per keyword poll
    maxResultsPerKeyword: 15,

    // Watchdog config
    watchdogMinComments: 5,          // min comments to trigger alert
    watchdogMaxAgeHours: 4,          // max age for "fresh" post
    watchdogMinRelevanceScore: 7,    // min GPT score for alert
    watchdogMaxAlertsPerHour: 3,     // throttle

    // Thread watchlist config (Phase 2)
    watchlistMinScore: 7,            // min relevance to auto-track
    watchlistMaxAge: 48,             // hours before expiry
    watchlistMaxThreads: 25,         // max tracked threads
    velocityAlertThreshold: 3,       // comments/hr to trigger alert
    scoreJumpAlertPct: 50,           // % score jump to trigger alert
    commentsToFetch: 15,             // top comments to analyze

    // Data files
    dataFile: resolve(__dirname, "reddit-monitor-data.json"),
    seenFile: resolve(__dirname, "reddit-monitor-seen.json"),
    reportFile: resolve(__dirname, "reddit-monitor-report.html"),
};

// ═══════════════════════════════════════════════════════════════════════════
// TELEGRAM — HTML mode
// ═══════════════════════════════════════════════════════════════════════════

function escHtml(text) {
    if (!text) return "";
    return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Strip Reddit markdown so blockquotes show clean text in Telegram */
function stripReddit(text) {
    if (!text) return "";
    return text
        .replace(/\*\*([^*]+)\*\*/g, "$1")      // **bold**
        .replace(/\*([^*]+)\*/g, "$1")           // *italic*
        .replace(/__([^_]+)__/g, "$1")            // __underline__
        .replace(/_([^_]+)_/g, "$1")              // _italic_
        .replace(/~~([^~]+)~~/g, "$1")            // ~~strike~~
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // [text](url)
        .replace(/^#{1,6}\s*/gm, "")              // # headers
        .replace(/^[\-*]\s+/gm, "• ")             // - bullet → •
        .replace(/^>\s?/gm, "")                   // > blockquote prefix
        .replace(/&amp;/g, "&")                    // HTML entities from Reddit
        .replace(/\\([\[\]()\\*_~`#])/g, "$1")    // escaped chars
        .replace(/\n{3,}/g, "\n\n")               // collapse blank lines
        .trim();
}

async function sendTelegram(html, disablePreview = true) {
    if (!CONFIG.telegramToken || !CONFIG.telegramChatId) {
        console.log("[tg] No token or chat ID — skipping");
        return null;
    }
    const url = `https://api.telegram.org/bot${CONFIG.telegramToken}/sendMessage`;

    // Split into chunks respecting Telegram's 4096 char limit
    const chunks = [];
    let remaining = html;
    while (remaining.length > 0) {
        if (remaining.length <= 4000) { chunks.push(remaining); break; }
        let cut = remaining.lastIndexOf("\n\n", 4000);
        if (cut < 1500) cut = remaining.lastIndexOf("\n", 4000);
        if (cut < 1500) cut = 4000;
        chunks.push(remaining.slice(0, cut));
        remaining = remaining.slice(cut).trimStart();
    }

    for (const chunk of chunks) {
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: CONFIG.telegramChatId,
                    text: chunk,
                    parse_mode: "HTML",
                    disable_web_page_preview: disablePreview,
                }),
            });
            const d = await res.json().catch(() => ({}));
            if (!d.ok) console.error("[tg] Error:", d.description || "unknown");
        } catch (err) {
            console.error("[tg] Send failed:", err.message);
        }
        if (chunks.length > 1) await sleep(500);
    }
}

/** Send an HTML file as a document attachment via Telegram */
async function sendTelegramDocument(filePath, caption = "") {
    if (!CONFIG.telegramToken || !CONFIG.telegramChatId) return;
    const url = `https://api.telegram.org/bot${CONFIG.telegramToken}/sendDocument`;
    const fileContent = readFileSync(filePath);
    const boundary = "----FormBoundary" + Date.now();
    const fileName = "reddit-monitor-report.html";

    // Build multipart form body manually
    const parts = [];
    parts.push(`--${boundary}\r\nContent-Disposition: form-data; name="chat_id"\r\n\r\n${CONFIG.telegramChatId}`);
    if (caption) {
        parts.push(`--${boundary}\r\nContent-Disposition: form-data; name="caption"\r\n\r\n${caption}`);
    }
    parts.push(`--${boundary}\r\nContent-Disposition: form-data; name="parse_mode"\r\n\r\nHTML`);

    const textParts = parts.join("\r\n") + "\r\n";
    const fileHeader = `--${boundary}\r\nContent-Disposition: form-data; name="document"; filename="${fileName}"\r\nContent-Type: text/html\r\n\r\n`;
    const fileFooter = `\r\n--${boundary}--\r\n`;

    const body = Buffer.concat([
        Buffer.from(textParts),
        Buffer.from(fileHeader),
        fileContent,
        Buffer.from(fileFooter),
    ]);

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": `multipart/form-data; boundary=${boundary}` },
            body,
        });
        const d = await res.json().catch(() => ({}));
        if (!d.ok) console.error("[tg] Doc send error:", d.description || "unknown");
        else console.log("[tg] HTML report sent as document");
    } catch (err) {
        console.error("[tg] Doc send failed:", err.message);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// REDDIT API
// ═══════════════════════════════════════════════════════════════════════════

const proxyAgent = process.env.DECODO_PROXY_URL
    ? new HttpsProxyAgent(process.env.DECODO_PROXY_URL)
    : null;

const HEADERS = {
    "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    Accept: "application/json",
};

async function smartRedditFetch(url, label) {
    // 1. Try direct (free)
    try {
        const res = await fetch(url, { headers: HEADERS });
        if (res.status === 429) {
            console.warn(`[reddit] ${label} rate limited — backing off 60s`);
            await sleep(60000);
            return null;
        }
        if (res.ok) return await res.json();
        console.log(`[reddit] ${label} direct blocked (${res.status}), trying proxy...`);
    } catch (err) {
        console.log(`[reddit] ${label} direct failed (${err.message}), trying proxy...`);
    }

    // 2. Fallback to proxy
    if (!proxyAgent) {
        console.error(`[reddit] ${label} blocked and no proxy configured`);
        return null;
    }
    try {
        const res = await fetch(url, { agent: proxyAgent, headers: HEADERS });
        if (res.status === 429) {
            console.warn(`[reddit] ${label} rate limited via proxy`);
            await sleep(60000);
            return null;
        }
        if (!res.ok) {
            console.error(`[reddit] ${label} proxy also failed: ${res.status}`);
            return null;
        }
        return await res.json();
    } catch (err) {
        console.error(`[reddit] ${label} proxy error:`, err.message);
        return null;
    }
}

async function searchReddit(query, limit = 15) {
    const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=new&limit=${limit}&t=day`;
    const data = await smartRedditFetch(url, `search "${query}"`);
    return data ? (data?.data?.children || []).map((c) => parsePost(c.data)) : [];
}

async function fetchSubredditNew(subreddit, limit = 10) {
    const url = `https://www.reddit.com/r/${subreddit}/new.json?limit=${limit}`;
    const data = await smartRedditFetch(url, `r/${subreddit}`);
    return data ? (data?.data?.children || []).map((c) => parsePost(c.data)) : [];
}

/** Fetch a single post by ID to get updated metrics */
async function fetchPostById(postId) {
    const url = `https://www.reddit.com/by_id/t3_${postId}.json`;
    const data = await smartRedditFetch(url, `post/${postId}`);
    if (!data?.data?.children?.[0]) return null;
    return parsePost(data.data.children[0].data);
}

/** Fetch top comments for a post */
async function fetchComments(postId, subreddit, limit = 15) {
    const url = `https://www.reddit.com/r/${subreddit}/comments/${postId}.json?limit=${limit}&sort=top`;
    try {
        const data = await smartRedditFetch(url, `comments/${postId}`);
        if (!Array.isArray(data) || data.length < 2) return [];
        const commentListing = data[1]?.data?.children || [];
        return commentListing
            .filter(c => c.kind === 't1' && c.data?.body)
            .map(c => ({
                id: c.data.id,
                author: c.data.author || '[deleted]',
                body: (c.data.body || '').slice(0, 500),
                score: c.data.score || 0,
                replies: c.data.replies?.data?.children?.length || 0,
            }));
    } catch {
        return [];
    }
}

function parsePost(raw) {
    return {
        id: raw.id || raw.name,
        subreddit: raw.subreddit || "",
        title: (raw.title || "").slice(0, 300),
        author: raw.author || "[deleted]",
        url: `https://reddit.com${raw.permalink || ""}`,
        score: raw.score || 0,
        numComments: raw.num_comments || 0,
        createdUtc: raw.created_utc || 0,
        selftext: (raw.selftext || "").slice(0, 800),
        isNew: false,
    };
}

// ═══════════════════════════════════════════════════════════════════════════
// SIGNAL CLEANING — Phase 1 filters (denylist, spam, dedup)
// ═══════════════════════════════════════════════════════════════════════════

/** Check if post is from a denied subreddit */
function isDeniedSubreddit(post) {
    return CONFIG.subredditDenylist.has(post.subreddit.toLowerCase());
}

/** Check if post title/body matches promo spam patterns */
function isPromoSpam(post) {
    const text = `${post.title} ${post.selftext}`;
    return CONFIG.promoPatterns.test(text);
}

/** Generate a dedup hash from normalized title + first 50 chars of selftext */
function dedupHash(post) {
    const normalized = `${post.title.toLowerCase().replace(/[^a-z0-9]/g, '')}|${(post.selftext || '').slice(0, 50).toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    return createHash('md5').update(normalized).digest('hex').slice(0, 12);
}

// ═══════════════════════════════════════════════════════════════════════════
// RELEVANCE PIPELINE
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Layer 2: Local keyword-presence filter.
 * Returns true if the post text contains at least one relevance term.
 */
function passesLocalFilter(post) {
    const text = `${post.title} ${post.selftext}`.toLowerCase();
    return CONFIG.relevanceTerms.some((term) => text.includes(term.toLowerCase()));
}

/**
 * Layer 3: GPT relevance scoring.
 * Sends a batch of posts to GPT and returns scored results.
 * Only posts scoring >= threshold are returned.
 */
async function gptRelevanceCheck(posts, threshold = 6) {
    if (!CONFIG.openaiApiKey || posts.length === 0) return posts.map(p => ({ ...p, relevanceScore: 5 }));

    const postSummaries = posts.map((p, i) => (
        `[${i}] r/${p.subreddit} | "${p.title}" | ${p.selftext.slice(0, 200)}`
    )).join("\n");

    const systemPrompt = `You are a relevance judge for a global money transfer and remittance platform (like Wise, Western Union competitors).

Score each post 1-10 for relevance to the money transfer / remittance / cross-border payments industry:
- 9-10: Directly about sending money internationally, comparing transfer services, asking for recommendations
- 7-8: About remittance fees, exchange rates, fintech for payments, expat money problems
- 5-6: Tangentially related (general personal finance with international angle)
- 1-4: Not relevant (different meaning of "transfer", unrelated topics)

Return ONLY a JSON array of objects: [{"index": 0, "score": 8, "reason": "brief reason"}, ...]
Include ALL posts in your response. No markdown, no explanation, just the JSON array.`;

    try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${CONFIG.openaiApiKey}`,
            },
            body: JSON.stringify({
                model: CONFIG.gptModel,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: postSummaries },
                ],
                temperature: 0.1,
                max_tokens: 2000,
            }),
        });

        const data = await res.json();
        const content = data?.choices?.[0]?.message?.content || "[]";

        // Parse scores — handle possible markdown wrapping
        const jsonStr = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        const scores = JSON.parse(jsonStr);

        return posts.map((post, i) => {
            const scoreObj = scores.find((s) => s.index === i);
            return {
                ...post,
                relevanceScore: scoreObj?.score || 3,
                relevanceReason: scoreObj?.reason || "",
            };
        }).filter((p) => p.relevanceScore >= threshold);
    } catch (err) {
        console.error("[gpt] Relevance check failed:", err.message);
        // On GPT failure, fall back to local-filter-only results with default score
        return posts.map(p => ({ ...p, relevanceScore: 5, relevanceReason: "GPT unavailable" }));
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// PERSISTENCE
// ═══════════════════════════════════════════════════════════════════════════

function loadData() {
    try {
        if (existsSync(CONFIG.dataFile)) return JSON.parse(readFileSync(CONFIG.dataFile, "utf-8"));
    } catch { /* ignore */ }
    return { matches: [], lastDigestAt: null, pollCount: 0, startedAt: new Date().toISOString(), alertedIds: [] };
}

function saveData(data) {
    try { writeFileSync(CONFIG.dataFile, JSON.stringify(data, null, 2)); }
    catch (err) { console.error("[data] Save failed:", err.message); }
}

function loadSeen() {
    try {
        if (existsSync(CONFIG.seenFile)) return new Set(JSON.parse(readFileSync(CONFIG.seenFile, "utf-8")));
    } catch { /* ignore */ }
    return new Set();
}

function saveSeen(seen) {
    const arr = [...seen].slice(-10000);
    try { writeFileSync(CONFIG.seenFile, JSON.stringify(arr)); } catch { /* ignore */ }
}

// ═══════════════════════════════════════════════════════════════════════════
// POLLING LOGIC — 3-layer pipeline
// ═══════════════════════════════════════════════════════════════════════════

async function pollAll(data, seen) {
    const rawCandidates = [];
    let pollErrors = 0;
    let totalScanned = 0;

    // ── Layer 1: Search by keywords (quoted phrases) ──
    for (const keyword of CONFIG.keywords) {
        try {
            const posts = await searchReddit(keyword, CONFIG.maxResultsPerKeyword);
            totalScanned += posts.length;
            for (const post of posts) {
                if (seen.has(post.id)) continue;
                seen.add(post.id);
                post.matchedKeyword = keyword;
                post.foundAt = new Date().toISOString();
                rawCandidates.push(post);
            }
        } catch { pollErrors++; }
        await sleep(2000);
    }

    // ── Monitor subreddits for new posts ──
    for (const sub of CONFIG.subreddits) {
        try {
            const posts = await fetchSubredditNew(sub, 8);
            totalScanned += posts.length;
            for (const post of posts) {
                if (seen.has(post.id)) continue;
                seen.add(post.id);
                post.matchedSubreddit = sub;
                post.foundAt = new Date().toISOString();
                rawCandidates.push(post);
            }
        } catch { pollErrors++; }
        await sleep(2000);
    }

    if (rawCandidates.length === 0) {
        data.pollCount++;
        data.lastPollAt = new Date().toISOString();
        data.lastPollNewCount = 0;
        data.lastPollScanned = totalScanned;
        return { newMatches: [], pollErrors, totalScanned };
    }

    // ── Phase 1 filters: denylist + promo + dedup ──
    if (!data.seenHashes) data.seenHashes = {};
    const cleanCandidates = rawCandidates.filter(post => {
        if (isDeniedSubreddit(post)) return false;
        if (isPromoSpam(post)) return false;
        const hash = dedupHash(post);
        if (data.seenHashes[hash]) return false;
        data.seenHashes[hash] = Date.now();
        return true;
    });
    // Prune old hashes (keep last 2000)
    const hashEntries = Object.entries(data.seenHashes);
    if (hashEntries.length > 2000) {
        hashEntries.sort((a, b) => a[1] - b[1]);
        data.seenHashes = Object.fromEntries(hashEntries.slice(-1500));
    }
    const filtered = rawCandidates.length - cleanCandidates.length;
    if (filtered > 0) console.log(`[clean] Filtered ${filtered} posts (denylist/promo/dedup)`);

    // ── Layer 2: Local relevance filter ──
    const localFiltered = cleanCandidates.filter(passesLocalFilter);
    console.log(`[pipeline] ${rawCandidates.length} raw → ${cleanCandidates.length} clean → ${localFiltered.length} after local filter`);

    // ── Layer 3: GPT relevance scoring ──
    let scored = [];
    if (localFiltered.length > 0) {
        // Batch in groups of 20 to stay within token limits
        for (let i = 0; i < localFiltered.length; i += 20) {
            const batch = localFiltered.slice(i, i + 20);
            const results = await gptRelevanceCheck(batch, 6);
            scored.push(...results);
        }
    }
    console.log(`[pipeline] ${localFiltered.length} local → ${scored.length} after GPT scoring`);

    // Mark as new and store
    for (const m of scored) {
        m.isNew = true;
    }

    if (scored.length > 0) {
        data.matches.push(...scored);
        if (data.matches.length > 500) data.matches = data.matches.slice(-500);
    }

    data.pollCount++;
    data.lastPollAt = new Date().toISOString();
    data.lastPollNewCount = scored.length;
    data.lastPollScanned = totalScanned;

    return { newMatches: scored, pollErrors, totalScanned };
}

// ═══════════════════════════════════════════════════════════════════════════
// WATCHDOG — Real-time debate alerts
// ═══════════════════════════════════════════════════════════════════════════

async function checkWatchdog(newMatches, data) {
    if (!data.alertedIds) data.alertedIds = [];
    if (!data.alertTimestamps) data.alertTimestamps = [];

    // Clean old timestamps (keep last hour)
    const oneHourAgo = Date.now() - 3600000;
    data.alertTimestamps = data.alertTimestamps.filter((t) => t > oneHourAgo);

    // Check throttle
    if (data.alertTimestamps.length >= CONFIG.watchdogMaxAlertsPerHour) {
        console.log("[watchdog] Throttled — max alerts per hour reached");
        return;
    }

    for (const post of newMatches) {
        if (data.alertedIds.includes(post.id)) continue;

        const ageHours = (Date.now() - post.createdUtc * 1000) / 3600000;
        const isHot = post.numComments >= CONFIG.watchdogMinComments || ageHours <= 2;
        const isHighRelevance = (post.relevanceScore || 0) >= CONFIG.watchdogMinRelevanceScore;

        if (isHot && isHighRelevance) {
            // Check throttle again inside loop
            if (data.alertTimestamps.length >= CONFIG.watchdogMaxAlertsPerHour) break;

            console.log(`[watchdog] 🚨 Alert: ${post.title.slice(0, 60)}`);

            const ageText = ageHours < 1 ? `${Math.round(ageHours * 60)}m ago` : `${Math.round(ageHours)}h ago`;
            const scoreEmoji = post.relevanceScore >= 9 ? "🔥" : post.relevanceScore >= 7 ? "🟢" : "🟡";

            const snippet = escHtml(stripReddit(post.selftext).slice(0, 250).replace(/\n/g, " "));

            const alertHtml = [
                `🚨 <b>Live Debate</b>`,
                ``,
                `<b>${escHtml(stripReddit(post.title))}</b>`,
                `r/${escHtml(post.subreddit)} · ⬆${post.score} · 💬${post.numComments} · ${ageText}`,
                ``,
                `<a href="${post.url}">→ Join now</a>`,
            ].join("\n");

            await sendTelegram(alertHtml);

            data.alertedIds.push(post.id);
            data.alertTimestamps.push(Date.now());

            // Keep alertedIds bounded
            if (data.alertedIds.length > 1000) data.alertedIds = data.alertedIds.slice(-1000);
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// THREAD WATCHLIST — Phase 2: velocity tracking + comment intelligence
// ═══════════════════════════════════════════════════════════════════════════

/** Add high-scoring posts to the watchlist */
function addToWatchlist(newMatches, data) {
    if (!data.watchlist) data.watchlist = [];

    for (const post of newMatches) {
        if ((post.relevanceScore || 0) < CONFIG.watchlistMinScore) continue;
        if (data.watchlist.some(w => w.id === post.id)) continue;

        data.watchlist.push({
            id: post.id,
            url: post.url,
            subreddit: post.subreddit,
            title: post.title,
            author: post.author,
            addedAt: Date.now(),
            relevanceScore: post.relevanceScore || 0,
            snapshots: [{
                ts: Date.now(),
                score: post.score,
                comments: post.numComments,
            }],
            velocityAlerted: false,
            insights: null,
        });
    }

    // Cap watchlist size
    if (data.watchlist.length > CONFIG.watchlistMaxThreads) {
        data.watchlist.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
        data.watchlist = data.watchlist.slice(0, CONFIG.watchlistMaxThreads);
    }
}

/** Re-check watched threads for velocity changes + extract insights */
async function updateWatchlist(data) {
    if (!data.watchlist || data.watchlist.length === 0) return;

    const now = Date.now();
    const maxAgeMs = CONFIG.watchlistMaxAge * 3600000;
    const alerts = [];

    // Expire old threads
    data.watchlist = data.watchlist.filter(w => (now - w.addedAt) < maxAgeMs);

    for (const thread of data.watchlist) {
        try {
            const updated = await fetchPostById(thread.id);
            if (!updated) continue;
            await sleep(1500);

            const lastSnapshot = thread.snapshots[thread.snapshots.length - 1];
            const hoursSinceLast = Math.max(0.1, (now - lastSnapshot.ts) / 3600000);

            // Compute velocity
            const commentDelta = updated.numComments - lastSnapshot.comments;
            const scoreDelta = updated.score - lastSnapshot.score;
            const commentVelocity = commentDelta / hoursSinceLast;
            const scorePctChange = lastSnapshot.score > 0 ? (scoreDelta / lastSnapshot.score) * 100 : 0;

            // Record snapshot
            thread.snapshots.push({
                ts: now,
                score: updated.score,
                comments: updated.numComments,
                commentVelocity: Math.round(commentVelocity * 10) / 10,
            });
            if (thread.snapshots.length > 20) thread.snapshots = thread.snapshots.slice(-20);

            // Velocity spike alert
            if (!thread.velocityAlerted && (
                commentVelocity >= CONFIG.velocityAlertThreshold ||
                scorePctChange >= CONFIG.scoreJumpAlertPct
            )) {
                thread.velocityAlerted = true;
                const reason = commentVelocity >= CONFIG.velocityAlertThreshold
                    ? `💬 ${Math.round(commentVelocity)} comments/hr`
                    : `📈 Score +${Math.round(scorePctChange)}%`;
                alerts.push({ thread, updated, reason });
            }

            // Fetch comments for threads with enough activity (first time only)
            if (!thread.insights && updated.numComments >= 3) {
                const comments = await fetchComments(thread.id, thread.subreddit, CONFIG.commentsToFetch);
                await sleep(1500);
                if (comments.length > 0) {
                    thread.insights = extractInsights(comments);
                }
            }
        } catch (err) {
            console.error(`[watchlist] Error checking ${thread.id}: ${err.message}`);
        }
    }

    // Send velocity alerts
    for (const { thread, updated, reason } of alerts) {
        console.log(`[watchlist] 🔥 Velocity alert: ${thread.title.slice(0, 50)} — ${reason}`);

        const ageHours = (now - thread.addedAt) / 3600000;
        const ageStr = ageHours < 1 ? `${Math.round(ageHours * 60)}m tracked` : `${Math.round(ageHours)}h tracked`;

        const alertHtml = [
            `🔥 <b>Thread Accelerating</b>`,
            ``,
            `<b>${escHtml(stripReddit(thread.title))}</b>`,
            `r/${escHtml(thread.subreddit)} · ⬆${updated.score} · 💬${updated.numComments} · ${ageStr}`,
            `${reason}`,
            ``,
            thread.insights?.unanswered?.length
                ? `❓ Unanswered: <i>${escHtml(thread.insights.unanswered[0].slice(0, 100))}</i>`
                : '',
            thread.insights?.competitors?.length
                ? `🏷 Mentions: ${thread.insights.competitors.join(', ')}`
                : '',
            ``,
            `<a href="${thread.url}">→ Jump in now</a>`,
        ].filter(Boolean).join('\n');

        await sendTelegram(alertHtml);
    }

    if (data.watchlist.length > 0) {
        console.log(`[watchlist] Tracking ${data.watchlist.length} threads (${alerts.length} velocity alerts)`);
    }
}

/** Extract actionable insights from comments */
function extractInsights(comments) {
    const insights = { unanswered: [], competitors: [], painPoints: [] };
    const competitorNames = ['wise', 'remitly', 'western union', 'moneygram', 'worldremit', 'xoom', 'payoneer', 'ofx', 'xe', 'revolut', 'n26'];
    const mentionedCompetitors = new Set();

    for (const c of comments) {
        const body = c.body.toLowerCase();

        // Unanswered questions — ends with ? and has 0 replies
        if (c.body.includes('?') && c.replies === 0 && c.score <= 1) {
            const question = c.body.split('?')[0].trim() + '?';
            if (question.length > 15 && question.length < 300) {
                insights.unanswered.push(question);
            }
        }

        // Competitor mentions
        for (const comp of competitorNames) {
            if (body.includes(comp)) mentionedCompetitors.add(comp);
        }

        // Pain points
        const painPatterns = /too expensive|rip.?off|hidden fee|slow transfer|took \d+ days|worst|terrible|charged me|lost money|scam/i;
        if (painPatterns.test(c.body)) {
            insights.painPoints.push(c.body.slice(0, 200));
        }
    }

    insights.competitors = [...mentionedCompetitors];
    return insights;
}


// ═══════════════════════════════════════════════════════════════════════════
// TELEGRAM DIGEST (minimal, elegant)
// ═══════════════════════════════════════════════════════════════════════════

function getRecentMatches(data) {
    const sinceDate = data.lastDigestAt
        ? new Date(data.lastDigestAt)
        : new Date(Date.now() - 24 * 60 * 60 * 1000);
    return data.matches.filter((m) => new Date(m.foundAt) > sinceDate)
        .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
}

function buildDigest(data) {
    const recentMatches = getRecentMatches(data);
    const dateStr = new Date().toLocaleDateString("en-GB", {
        weekday: "long", day: "numeric", month: "short",
    });

    if (recentMatches.length === 0) {
        return [
            `📡 <b>Reddit Monitor</b> · ${dateStr}`,
            ``,
            `All quiet — no relevant mentions found.`,
            `<code>${data.pollCount} polls · ${data.lastPollScanned || 0} posts scanned</code>`,
        ].join("\n");
    }

    // Top posts — clean numbered list
    const top = recentMatches.slice(0, 8);
    const lines = [
        `📡 <b>Reddit Monitor</b> · ${dateStr}`,
        `<b>${recentMatches.length}</b> mentions found`,
        ``,
    ];

    for (let i = 0; i < top.length; i++) {
        const p = top[i];
        const age = (Date.now() - p.createdUtc * 1000) / 3600000;
        const ageStr = age < 1 ? `${Math.round(age * 60)}m` : `${Math.round(age)}h`;
        const hot = p.numComments >= 5 ? " 🔥" : "";

        lines.push(`<b>${i + 1}.</b> <a href="${p.url}">${escHtml(stripReddit(p.title.slice(0, 90)))}</a>`);
        lines.push(`    r/${p.subreddit} · ⬆${p.score} · 💬${p.numComments} · ${ageStr}${hot}`);
    }

    if (recentMatches.length > 8) {
        lines.push(``);
        lines.push(`<i>+ ${recentMatches.length - 8} more in full report ↓</i>`);
    }

    return lines.join("\n");
}

// ═══════════════════════════════════════════════════════════════════════════
// FULL HTML REPORT
// ═══════════════════════════════════════════════════════════════════════════

function buildHtmlReport(data) {
    const recentMatches = getRecentMatches(data);
    const dateStr = new Date().toLocaleDateString("en-GB", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
    });
    const timeStr = new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit", minute: "2-digit", timeZone: CONFIG.timezone,
    });

    // Group by source
    const grouped = {};
    for (const m of recentMatches) {
        const key = (m.matchedKeyword || m.matchedSubreddit || "other").replace(/"/g, "");
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(m);
    }

    function esc(s) { return escHtml(s); }

    // Build entries
    let entriesHtml = "";
    let entryNum = 0;

    for (const [source, posts] of Object.entries(grouped)) {
        entriesHtml += `
        <div class="section">
            <div class="section-rule"></div>
            <h2>${esc(source)}<span class="count">${posts.length}</span></h2>`;

        for (const p of posts) {
            entryNum++;
            const age = (Date.now() - p.createdUtc * 1000) / 3600000;
            const ageStr = age < 1 ? `${Math.round(age * 60)} min ago` : age < 24 ? `${Math.round(age)} hours ago` : `${Math.round(age / 24)} days ago`;
            const score = p.relevanceScore || 0;
            const dots = "●".repeat(score) + "○".repeat(10 - score);
            const cleanText = esc(stripReddit(p.selftext).slice(0, 280).replace(/\n/g, " "));
            const hot = p.numComments >= 5;

            entriesHtml += `
            <div class="entry">
                <div class="entry-num">${String(entryNum).padStart(2, "0")}</div>
                <div class="entry-content">
                    <a href="${p.url}" target="_blank" class="entry-title">${esc(stripReddit(p.title))}</a>${hot ? '<span class="active">active</span>' : ''}
                    <div class="entry-meta">
                        r/${esc(p.subreddit)} · ${p.score} points · ${p.numComments} comments · ${ageStr} · u/${esc(p.author)}
                    </div>
                    <div class="entry-relevance">${dots} ${score}/10</div>
                    ${cleanText ? `<div class="entry-excerpt">${cleanText}</div>` : ""}
                    <a href="${p.url}" target="_blank" class="entry-link">→ read thread</a>
                </div>
            </div>`;
        }
        entriesHtml += `</div>`;
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reddit Monitor — ${dateStr}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Courier Prime', 'Courier New', Courier, monospace;
    background: #faf9f6;
    color: #1a1a1a;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }

  .page {
    max-width: 680px;
    margin: 0 auto;
    padding: 60px 40px 80px;
  }

  /* Header — like a typed document */
  .header {
    text-align: center;
    padding-bottom: 32px;
    margin-bottom: 32px;
    border-bottom: 2px solid #1a8c5b;
  }
  .header h1 {
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    margin-bottom: 8px;
    color: #1a8c5b;
  }
  .header .date {
    font-size: 13px;
    color: #666;
    letter-spacing: 0.1em;
  }

  /* Stats — simple inline */
  .stats {
    display: flex;
    justify-content: center;
    gap: 32px;
    padding: 20px 0;
    margin-bottom: 8px;
    font-size: 13px;
    color: #666;
    letter-spacing: 0.02em;
  }
  .stats .stat-num {
    font-weight: 700;
    color: #1a8c5b;
    font-size: 22px;
    display: block;
    text-align: center;
    line-height: 1.2;
  }
  .stats .stat-label {
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-align: center;
    display: block;
  }

  /* Section dividers */
  .section {
    margin-bottom: 28px;
  }
  .section-rule {
    border: none;
    border-top: 1px solid #1a8c5b;
    margin-bottom: 16px;
  }
  .section h2 {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: #1a8c5b;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section h2 .count {
    font-size: 10px;
    font-weight: 400;
    color: #aaa;
    border: 1px solid #ccc;
    padding: 1px 6px;
    border-radius: 2px;
  }

  /* Entry — each post */
  .entry {
    display: flex;
    gap: 16px;
    padding: 14px 0;
    border-bottom: 1px dotted #ddd;
  }
  .entry:last-child { border-bottom: none; }
  .entry-num {
    font-size: 12px;
    color: #1a8c5b;
    font-weight: 700;
    padding-top: 2px;
    min-width: 24px;
    user-select: none;
  }
  .entry-content { flex: 1; }
  .entry-title {
    font-size: 14px;
    font-weight: 700;
    color: #1a1a1a;
    text-decoration: none;
    line-height: 1.4;
  }
  .entry-title:hover {
    text-decoration: underline;
    text-decoration-style: dotted;
  }
  .active {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #fff;
    background: #1a8c5b;
    border: 1px solid #1a8c5b;
    padding: 1px 5px;
    margin-left: 8px;
    vertical-align: middle;
    font-weight: 700;
    border-radius: 2px;
  }
  .entry-meta {
    font-size: 11px;
    color: #999;
    margin-top: 4px;
    line-height: 1.5;
  }
  .entry-relevance {
    font-size: 11px;
    color: #1a8c5b;
    margin-top: 4px;
    letter-spacing: 0.05em;
  }
  .entry-excerpt {
    font-size: 12px;
    color: #666;
    margin-top: 8px;
    line-height: 1.6;
    font-style: italic;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .entry-link {
    font-size: 11px;
    color: #1a8c5b;
    text-decoration: none;
    margin-top: 6px;
    display: inline-block;
    letter-spacing: 0.05em;
  }
  .entry-link:hover {
    color: #146b47;
    text-decoration: underline;
    text-decoration-style: dotted;
  }

  /* Footer */
  .footer {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 2px solid #1a1a1a;
    text-align: center;
    font-size: 10px;
    color: #aaa;
    text-transform: uppercase;
    letter-spacing: 0.2em;
  }

  @media print {
    body { background: white; }
    .page { padding: 20px; }
  }

  @media (max-width: 600px) {
    .page { padding: 24px 16px 40px; }
    .stats { gap: 16px; }
    .entry-num { display: none; }
  }
</style>
</head>
<body>
<div class="page">
    <div class="header">
        <h1>Reddit Monitor</h1>
        <div class="date">${dateStr} — ${timeStr} CET</div>
    </div>

    <div class="stats">
        <div><span class="stat-num">${recentMatches.length}</span><span class="stat-label">relevant</span></div>
        <div><span class="stat-num">${data.lastPollScanned || 0}</span><span class="stat-label">scanned</span></div>
        <div><span class="stat-num">${data.pollCount}</span><span class="stat-label">polls</span></div>
        <div><span class="stat-num">${Object.keys(grouped).length}</span><span class="stat-label">sources</span></div>
    </div>

    ${entriesHtml}

    <div class="footer">
        ${CONFIG.keywords.length} keywords · ${CONFIG.subreddits.length} subreddits · gpt-4o-mini relevance · v2
    </div>
</div>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN LOOP
// ═══════════════════════════════════════════════════════════════════════════

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

function getLocalHour() {
    const now = new Date();
    const local = new Date(now.toLocaleString("en-US", { timeZone: CONFIG.timezone }));
    return { hour: local.getHours(), minute: local.getMinutes() };
}

async function main() {
    console.log("🔴 Reddit Monitor v3 starting...");
    console.log(`   Keywords: ${CONFIG.keywords.length}`);
    console.log(`   Subreddits: ${CONFIG.subreddits.length} monitored, ${CONFIG.subredditDenylist.size} denied`);
    console.log(`   Subreddits: ${CONFIG.subreddits.map((s) => `r/${s}`).join(", ")}`);
    console.log(`   Polling every ${CONFIG.pollIntervalMinutes} min`);
    console.log(`   Digest at ${CONFIG.digestHour}:00 ${CONFIG.timezone}`);
    console.log(`   GPT relevance: ${CONFIG.openaiApiKey ? "✅ enabled" : "❌ disabled"}`);
    console.log(`   Watchdog: alerts on ≥${CONFIG.watchdogMinComments} comments, relevance ≥${CONFIG.watchdogMinRelevanceScore}`);
    console.log(`   Telegram: ${CONFIG.telegramChatId ? `chat ${CONFIG.telegramChatId}` : "NOT SET"}`);
    console.log(`   Mode: ${IS_TEST ? "TEST (single cycle)" : "PRODUCTION (24/7)"}`);
    console.log("");

    const data = loadData();
    const seen = loadSeen();

    // Persisted digest date — survives restarts
    const todayStr = () => new Date().toLocaleDateString('en-CA', { timeZone: CONFIG.timezone });
    let digestSentToday = data.lastDigestDate === todayStr();

    // ── Test mode ──
    if (IS_TEST) {
        console.log("═══ TEST MODE: Running single poll cycle ═══\n");

        const { newMatches, pollErrors, totalScanned } = await pollAll(data, seen);
        saveData(data);
        saveSeen(seen);

        console.log(`\n═══ RESULTS ═══`);
        console.log(`Total scanned: ${totalScanned}`);
        console.log(`Relevant matches: ${newMatches.length}`);
        console.log(`Errors: ${pollErrors}`);

        if (newMatches.length > 0) {
            console.log(`\nTop matches:`);
            for (const m of newMatches.slice(0, 10)) {
                console.log(`  [${m.relevanceScore || "?"}/10] r/${m.subreddit}: ${m.title.slice(0, 80)}`);
                if (m.relevanceReason) console.log(`    → ${m.relevanceReason}`);
            }
        }

        // Send test digest
        console.log("\n═══ Sending test digest to Telegram... ═══");
        const digest = buildDigest(data);
        await sendTelegram(digest);

        // Generate and send HTML report
        console.log("\n═══ Generating HTML report... ═══");
        const html = buildHtmlReport(data);
        writeFileSync(CONFIG.reportFile, html);
        console.log(`[report] Saved to ${CONFIG.reportFile}`);
        await sendTelegramDocument(CONFIG.reportFile, "📊 Full report attached");

        // Check watchdog
        if (newMatches.length > 0) {
            console.log("\n═══ Checking watchdog alerts... ═══");
            await checkWatchdog(newMatches, data);
            saveData(data);
        }

        console.log("\n═══ TEST COMPLETE ═══");
        process.exit(0);
    }

    // ── Production mode ──
    if (CONFIG.telegramChatId) {
        await sendTelegram(
            `🔴 <b>Reddit Monitor v2 started</b>\n` +
            `🔑 ${CONFIG.keywords.length} keywords\n` +
            `📡 ${CONFIG.subreddits.length} subreddits\n` +
            `⏱ Polling every ${CONFIG.pollIntervalMinutes} min\n` +
            `🤖 GPT relevance: ${CONFIG.openaiApiKey ? "enabled" : "disabled"}\n` +
            `🚨 Watchdog: active\n` +
            `📬 Morning digest at ${CONFIG.digestHour}:00 CET`
        );
    }

    while (true) {
        try {
            // ── Poll Reddit ──
            const { newMatches, pollErrors, totalScanned } = await pollAll(data, seen);
            saveData(data);
            saveSeen(seen);

            const timeStr = new Date().toLocaleTimeString("en-GB", { timeZone: CONFIG.timezone });

            if (newMatches.length > 0) {
                console.log(`[${timeStr}] Poll #${data.pollCount} — ${totalScanned} scanned → ${newMatches.length} relevant matches`);
                for (const m of newMatches.slice(0, 3)) {
                    console.log(`  [${m.relevanceScore}/10] r/${m.subreddit}: ${m.title.slice(0, 80)}`);
                }

                // ── Watchdog: immediate alerts for hot debates ──
                await checkWatchdog(newMatches, data);

                // ── Phase 2: Add to watchlist ──
                addToWatchlist(newMatches, data);
                saveData(data);
            } else {
                console.log(`[${timeStr}] Poll #${data.pollCount} — ${totalScanned} scanned — no relevant matches`);
            }

            // ── Phase 2: Update watchlist (velocity + comments) ──
            await updateWatchlist(data);
            saveData(data);

            // ── Check if it's digest time ──
            const { hour, minute } = getLocalHour();
            const today = todayStr();
            digestSentToday = data.lastDigestDate === today;

            if (hour === CONFIG.digestHour && minute >= CONFIG.digestMinute && minute < CONFIG.digestMinute + CONFIG.pollIntervalMinutes + 5 && !digestSentToday) {
                console.log("[digest] Sending morning digest...");
                const digest = buildDigest(data);
                await sendTelegram(digest);

                // Generate and send HTML report
                const html = buildHtmlReport(data);
                writeFileSync(CONFIG.reportFile, html);
                await sendTelegramDocument(CONFIG.reportFile, "📊 Full report attached");

                data.lastDigestAt = new Date().toISOString();
                data.lastDigestDate = today;
                saveData(data);
                digestSentToday = true;
                console.log("[digest] Sent + HTML report!");
            }

        } catch (err) {
            console.error(`[error] ${err.message}`);
        }

        await sleep(CONFIG.pollIntervalMinutes * 60 * 1000);
    }
}

main().catch((err) => {
    console.error("Fatal:", err);
    process.exit(1);
});
