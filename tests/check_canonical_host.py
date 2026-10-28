#!/usr/bin/env python3
"""Guard against advertising the TLS-broken www host as canonical / og:url."""

from pathlib import Path
import re
import sys

html = Path("index.html").read_text(encoding="utf-8")
expected = "https://highreadinessunit.com/"
errors = []

og = re.search(r'property="og:url"\s+content="([^"]+)"', html)
canon = re.search(r'rel="canonical"\s+href="([^"]+)"', html)

if not og:
    errors.append("missing og:url")
elif og.group(1) != expected:
    errors.append(f"og:url is {og.group(1)!r}, expected {expected!r}")

if not canon:
    errors.append("missing canonical")
elif canon.group(1) != expected:
    errors.append(f"canonical is {canon.group(1)!r}, expected {expected!r}")

if "https://www.highreadinessunit.com" in html:
    errors.append("www.highreadinessunit.com still appears in index.html")

if errors:
    print("FAIL:")
    for error in errors:
        print(f" - {error}")
    sys.exit(1)

print("ok: canonical and og:url use the apex host")
