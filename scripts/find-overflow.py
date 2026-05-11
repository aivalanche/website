"""
Walk the DOM and print every element whose right edge crosses the
viewport. Lets us pinpoint which component is causing horizontal
overflow at a given viewport width.
"""
from __future__ import annotations

import sys
from playwright.sync_api import sync_playwright

WIDTH = int(sys.argv[2]) if len(sys.argv) > 2 else 1440
PATH = sys.argv[1] if len(sys.argv) > 1 else "/"


def main() -> int:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(viewport={"width": WIDTH, "height": 900})
        page = ctx.new_page()
        page.goto(f"http://localhost:3000{PATH}", wait_until="networkidle", timeout=30000)
        offenders = page.evaluate(
            f"""() => {{
                const W = {WIDTH};
                const out = [];
                document.querySelectorAll('*').forEach(el => {{
                    const r = el.getBoundingClientRect();
                    if (r.right > W + 0.5 && r.width > 4) {{
                        const id = el.id ? '#'+el.id : '';
                        const cls = el.className && typeof el.className === 'string' ? '.'+el.className.split(' ').filter(Boolean).slice(0,3).join('.') : '';
                        out.push({{
                            tag: el.tagName.toLowerCase() + id + cls,
                            left: Math.round(r.left),
                            right: Math.round(r.right),
                            width: Math.round(r.width),
                        }});
                    }}
                }});
                // Sort by right edge descending and dedupe similar
                out.sort((a,b) => b.right - a.right);
                return out.slice(0, 25);
            }}"""
        )
        for o in offenders:
            print(f"right={o['right']:6d} width={o['width']:6d}  {o['tag'][:100]}")
        ctx.close()
        browser.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
