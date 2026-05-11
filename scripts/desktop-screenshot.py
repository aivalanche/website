"""Screenshot the home page at common desktop widths to check the hero fits."""
from __future__ import annotations

import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / ".screens" / "desktop"
OUT.mkdir(parents=True, exist_ok=True)

WIDTHS = [1280, 1440, 1600, 1920]
PATH = sys.argv[1] if len(sys.argv) > 1 else "/"


def main() -> int:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        for w in WIDTHS:
            ctx = browser.new_context(viewport={"width": w, "height": 900}, device_scale_factor=1)
            page = ctx.new_page()
            page.goto(f"http://localhost:3000{PATH}", wait_until="networkidle", timeout=30000)
            page.wait_for_timeout(300)
            slug = PATH.strip("/").replace("/", "_") or "home"
            out = OUT / f"{slug}-{w}.png"
            # Crop to the first viewport so we focus on hero
            page.screenshot(path=str(out), full_page=False)
            overflow = page.evaluate(
                "() => ({dw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth})"
            )
            print(f"{w}px -> {out.name}  doc={overflow['dw']} client={overflow['cw']}")
            ctx.close()
        browser.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
