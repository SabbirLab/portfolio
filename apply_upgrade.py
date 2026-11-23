#!/usr/bin/env python3
"""Apply portfolio fixes + wire in upgrade.css / upgrade.js.

Usage:  python apply_upgrade.py [index.html] [https://your-domain.com]
Safe to re-run. Writes index.html.bak first. Reports every edit as OK / SKIP / MISS.
"""
import pathlib, re, shutil, sys

path = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "index.html")
domain = sys.argv[2].rstrip("/") if len(sys.argv) > 2 else None
src = path.read_text(encoding="utf-8")
shutil.copyfile(path, str(path) + ".bak")

def report(name, status):
    print(f"[{status:4}] {name}")

def replace(name, old, new):
    global src
    if new in src and old not in src:
        return report(name, "SKIP")
    if old not in src:
        return report(name, "MISS")
    src = src.replace(old, new, 1)
    report(name, "OK")

# --- content fixes ---
replace("typo Academmic", "Academmic Course", "Academic Course")
replace("tag AutoCAD", "<span>Autocad project</span>", "<span>AutoCAD</span>")
replace("emoji in title", "Multi-Storey Residential Building⚡🏢", "Multi-Storey Residential Building")
replace("card 08 tags", "<span>ESP32</span><span>MATLAB</span><span>Circuits</span>",
        "<span>ESP32</span><span>ESP-NOW</span><span>Circuits</span>")

short = ("<p>Complete electrical design of a 6-storey residential building: load analysis, lighting "
         "calculations, conduit layout, SDB/MDB sizing, single line diagram, earthing, lightning "
         "protection, and fire safety planning.</p>")
pat = re.compile(r"<p>This project presents the complete electrical design.*?</p>", re.S)
if pat.search(src):
    src = pat.sub(short, src, count=1); report("card 07 description", "OK")
else:
    report("card 07 description", "SKIP" if short in src else "MISS")

# --- wire upgrade files ---
if 'href="upgrade.css"' in src:
    report("link upgrade.css", "SKIP")
else:
    src = src.replace("</head>", '  <link rel="stylesheet" href="upgrade.css">\n</head>', 1); report("link upgrade.css", "OK")
if 'src="upgrade.js"' in src:
    report("script upgrade.js", "SKIP")
else:
    src = src.replace("</body>", '  <script src="upgrade.js" defer></script>\n</body>', 1); report("script upgrade.js", "OK")

# --- social preview (needs absolute URLs, so only with a domain) ---
if domain and 'property="og:image"' not in src:
    block = (
        f'  <meta property="og:image" content="{domain}/assets/portrait.jpg">\n'
        f'  <meta property="og:url" content="{domain}/">\n'
        '  <meta name="twitter:card" content="summary_large_image">\n'
        f'  <link rel="canonical" href="{domain}/">\n'
    )
    src = src.replace("</head>", block + "</head>", 1); report("og:image / twitter / canonical", "OK")
elif not domain:
    report("og:image (pass your domain as 2nd arg)", "SKIP")

path.write_text(src, encoding="utf-8")
print("Done. Backup:", str(path) + ".bak")
