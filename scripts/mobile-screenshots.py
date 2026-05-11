"""
Screenshot every Labflow page at an iPhone-class viewport and save
full-page PNGs into ./.screens/mobile/. Run while `npm run dev` is up.
"""
from __future__ import annotations

import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / ".screens" / "mobile"
OUT.mkdir(parents=True, exist_ok=True)

BASE = "http://localhost:3000"
PATHS = [
    "/",
    "/product",
    "/instruments",
    "/agents",
    "/protocols",
    "/docs",
    "/pricing",
    "/changelog",
    "/contact",
    "/request-demo",
    "/sitemap",
    "/privacy",
    "/terms",
    "/impressum",
]

VIEWPORT = {"width": 390, "height": 844}
DEVICE_SCALE = 2  # retina, but keeps screenshot file sizes manageable


def main() -> int:
    only = sys.argv[1:] or PATHS
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(
            viewport=VIEWPORT,
            device_scale_factor=DEVICE_SCALE,
            user_agent=(
                "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) "
                "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
            ),
            is_mobile=True,
            has_touch=True,
        )
        page = ctx.new_page()
        results = []
        for path in only:
            slug = path.strip("/").replace("/", "_") or "home"
            target = f"{BASE}{path}"
            try:
                page.goto(target, wait_until="networkidle", timeout=30000)
            except Exception as e:
                results.append((path, "load-failed", str(e)[:120]))
                continue
            # Give animations and font swap a moment
            page.wait_for_timeout(400)
            out_path = OUT / f"{slug}.png"
            try:
                page.screenshot(path=str(out_path), full_page=True)
                # Detect horizontal overflow (very common mobile bug)
                overflow = page.evaluate(
                    """() => {
                        const dw = document.documentElement.scrollWidth;
                        const cw = document.documentElement.clientWidth;
                        return { docWidth: dw, clientWidth: cw, overflow: dw - cw };
                    }"""
                )
                results.append((path, "ok", overflow))
            except Exception as e:
                results.append((path, "screenshot-failed", str(e)[:120]))
        ctx.close()
        browser.close()

    print(f"Screenshots -> {OUT}")
    print()
    for path, status, info in results:
        print(f"{status:18s} {path:18s} {info}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
