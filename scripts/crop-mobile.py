"""Save a viewport-cropped (not full-page) shot of a path on mobile."""
from __future__ import annotations

import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / ".screens" / "mobile-crops"
OUT.mkdir(parents=True, exist_ok=True)

path = sys.argv[1] if len(sys.argv) > 1 else "/"
y_offset = int(sys.argv[2]) if len(sys.argv) > 2 else 0
height = int(sys.argv[3]) if len(sys.argv) > 3 else 900


def main() -> int:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(
            viewport={"width": 390, "height": height},
            device_scale_factor=2,
            is_mobile=True,
            has_touch=True,
        )
        page = ctx.new_page()
        page.goto(f"http://localhost:3000{path}", wait_until="networkidle", timeout=30000)
        page.wait_for_timeout(400)
        if y_offset:
            page.evaluate(f"window.scrollTo(0, {y_offset})")
            page.wait_for_timeout(200)
        slug = path.strip("/").replace("/", "_") or "home"
        out = OUT / f"{slug}-y{y_offset}-h{height}.png"
        page.screenshot(path=str(out), full_page=False)
        print(f"Saved {out}")
        ctx.close()
        browser.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
