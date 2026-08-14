// Generates public/logo-options.html — a comparison sheet of ETCS logo concepts.
// Crisp programmatic SVG (gears computed) in the brand palette.
import { promises as fs } from "node:fs";
import path from "node:path";

const NAVY = "#0F2645", NAVY_DEEP = "#0A1A2F", NAVY_HI = "#1B3A66";
const GOLD = "#D4A537", GOLD_HI = "#F4E5B1", GOLD_LO = "#8E6815", GOLD_400 = "#E6B954";

const f = (n) => Number(n.toFixed(2));
const P = (cx, cy, ang, r) => `${f(cx + Math.cos(ang) * r)},${f(cy + Math.sin(ang) * r)}`;

// Closed gear outline path with flat-ish teeth.
function gearPath(cx, cy, rOut, rIn, teeth, tip = 0.5) {
  const step = (Math.PI * 2) / teeth;
  const tw = step * tip;
  let d = "";
  for (let i = 0; i < teeth; i++) {
    const a = i * step - Math.PI / 2;
    const p1 = P(cx, cy, a, rIn);
    const p2 = P(cx, cy, a + tw * 0.5, rOut);
    const p3 = P(cx, cy, a + tw, rOut);
    const p4 = P(cx, cy, a + step, rIn);
    d += (i === 0 ? `M${p1}` : `L${p1}`) + `L${p2}L${p3}L${p4}`;
  }
  return d + "Z";
}

// Vector "E" glyph inside box (x,y,w,h)
function glyphE(x, y, w, h, fill, t = null) {
  t = t || h * 0.2;
  const r = f(t * 0.18);
  return `
    <rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(t)}" rx="${r}" fill="${fill}"/>
    <rect x="${f(x)}" y="${f(y + (h - t) / 2)}" width="${f(w * 0.82)}" height="${f(t)}" rx="${r}" fill="${fill}"/>
    <rect x="${f(x)}" y="${f(y + h - t)}" width="${f(w)}" height="${f(t)}" rx="${r}" fill="${fill}"/>
    <rect x="${f(x)}" y="${f(y)}" width="${f(t)}" height="${f(h)}" rx="${r}" fill="${fill}"/>`;
}

function defs(uid) {
  return `<defs>
    <linearGradient id="g-${uid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${GOLD_HI}"/>
      <stop offset=".45" stop-color="${GOLD}"/>
      <stop offset="1" stop-color="${GOLD_LO}"/>
    </linearGradient>
    <radialGradient id="n-${uid}" cx="38%" cy="34%" r="75%">
      <stop offset="0" stop-color="${NAVY_HI}"/>
      <stop offset="1" stop-color="${NAVY_DEEP}"/>
    </radialGradient>
  </defs>`;
}

const wrap = (inner) => `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">${inner}</svg>`;

// ── Concept 1: Precision Gear-E ────────────────────────────────
const c1 = (uid) => wrap(`${defs(uid)}
  <path d="${gearPath(60, 60, 54, 44, 12)}" fill="url(#g-${uid})"/>
  <circle cx="60" cy="60" r="40" fill="url(#n-${uid})"/>
  <circle cx="60" cy="60" r="40" fill="none" stroke="${GOLD}" stroke-width="1.5" opacity=".5"/>
  ${glyphE(46, 41, 30, 38, "url(#g-" + uid + ")", 7.5)}`);

// ── Concept 2: Hex Engineer ────────────────────────────────────
function hexPath(cx, cy, R) {
  let d = "";
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    d += (i === 0 ? "M" : "L") + P(cx, cy, a, R);
  }
  return d + "Z";
}
const c2 = (uid) => wrap(`${defs(uid)}
  <path d="${hexPath(60, 60, 52)}" fill="url(#n-${uid})" stroke="url(#g-${uid})" stroke-width="4" stroke-linejoin="round"/>
  ${[0,1,2,3,4,5].map(i=>{const a=(Math.PI/3)*i-Math.PI/6;const[px,py]=P(60,60,a,40).split(",");return `<circle cx="${px}" cy="${py}" r="2.4" fill="${GOLD}"/>`}).join("")}
  ${glyphE(47, 42, 28, 36, "url(#g-" + uid + ")", 7)}`);

// ── Concept 3: Interlocking Gears ──────────────────────────────
const c3 = (uid) => wrap(`${defs(uid)}
  <path d="${gearPath(50, 64, 42, 33, 11)}" fill="url(#g-${uid})"/>
  <circle cx="50" cy="64" r="30" fill="url(#n-${uid})"/>
  ${glyphE(39, 49, 22, 30, "url(#g-" + uid + ")", 6)}
  <path d="${gearPath(90, 34, 24, 17, 9)}" fill="url(#n-${uid})" stroke="${GOLD}" stroke-width="2"/>
  <circle cx="90" cy="34" r="6" fill="${GOLD}"/>`);

// ── Concept 4: Ascendant (vision / growth) ─────────────────────
const c4 = (uid) => {
  const teeth = [];
  const T = 36, step = (Math.PI * 2) / T;
  for (let i = 0; i < T; i++) {
    const a = i * step;
    teeth.push(`<line x1="${P(60,60,a,50).replace(',',' ').split(' ')[0]}" />`);
  }
  // gold tick ring
  let ring = "";
  for (let i = 0; i < 48; i++) {
    const a = (Math.PI * 2 / 48) * i;
    const [x1, y1] = P(60, 60, a, 50).split(",");
    const [x2, y2] = P(60, 60, a, 54).split(",");
    ring += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${GOLD}" stroke-width="1.6" opacity=".55"/>`;
  }
  const chev = (y, w, sw) =>
    `<path d="M${f(60-w)} ${f(y+ w*0.7)} L60 ${f(y)} L${f(60+w)} ${f(y+w*0.7)}" fill="none" stroke="url(#g-${uid})" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
  return wrap(`${defs(uid)}
    <circle cx="60" cy="60" r="50" fill="url(#n-${uid})"/>
    ${ring}
    ${chev(48, 20, 7)}
    ${chev(60, 20, 7)}
    ${chev(72, 20, 7)}`);
};

// ── Concept 5: Steel Crest (shield) ────────────────────────────
const shield = "M60 14 L100 26 L100 60 C100 84 82 100 60 108 C38 100 20 84 20 60 L20 26 Z";
const c5 = (uid) => wrap(`${defs(uid)}
  <path d="${shield}" fill="url(#n-${uid})" stroke="url(#g-${uid})" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="${gearPath(60, 40, 18, 12, 10)}" fill="url(#g-${uid})"/>
  <circle cx="60" cy="40" r="6.5" fill="url(#n-${uid})"/>
  <text x="60" y="78" text-anchor="middle" font-family="Sora, sans-serif" font-weight="800" font-size="20" letter-spacing="1.5" fill="url(#g-${uid})">ETCS</text>
  <rect x="42" y="86" width="36" height="2.4" rx="1.2" fill="${GOLD}" opacity=".7"/>`);

// ── Concept 6: Monogram Seal ───────────────────────────────────
const c6 = (uid) => wrap(`${defs(uid)}
  <circle cx="60" cy="60" r="56" fill="url(#n-${uid})"/>
  <circle cx="60" cy="60" r="56" fill="none" stroke="url(#g-${uid})" stroke-width="2"/>
  <circle cx="60" cy="60" r="44" fill="none" stroke="${GOLD}" stroke-width="1" opacity=".4"/>
  <path id="seal-top-${uid}" d="M60 60 m -46 0 a 46 46 0 1 1 92 0" fill="none"/>
  <path id="seal-bot-${uid}" d="M60 60 m -42 0 a 42 42 0 0 0 84 0" fill="none"/>
  <text font-family="Inter, sans-serif" font-weight="600" font-size="8.5" letter-spacing="2.4" fill="${GOLD}">
    <textPath href="#seal-top-${uid}" startOffset="50%" text-anchor="middle">EXPERT TECHNICAL CONTRACTING</textPath>
  </text>
  <text font-family="Inter, sans-serif" font-weight="600" font-size="8.5" letter-spacing="3" fill="${GOLD}">
    <textPath href="#seal-bot-${uid}" startOffset="50%" text-anchor="middle">• SERVICES • KSA •</textPath>
  </text>
  <path d="${gearPath(60, 58, 26, 19, 10)}" fill="url(#g-${uid})"/>
  <circle cx="60" cy="58" r="16" fill="url(#n-${uid})"/>
  ${glyphE(52, 48, 17, 21, "url(#g-" + uid + ")", 4.4)}`);

const CONCEPTS = [
  { id: "precision-gear-e", name: "Precision Gear-E", note: "Refined evolution of the current mark — a metallic gear ring cradling a bold monogram E. Instantly reads ‘engineering’.", icon: c1 },
  { id: "hex-engineer", name: "Hex Engineer", note: "A machined hex-nut silhouette with riveted vertices. Precise, industrial, modern — great as a favicon.", icon: c2 },
  { id: "interlocking-gears", name: "Interlocking Gears", note: "Two meshed gears signalling partnership and motion. Dynamic and distinctive.", icon: c3 },
  { id: "ascendant", name: "Ascendant", note: "An instrument dial with rising chevrons — ‘Where Vision Becomes Reality’. Forward-looking and premium.", icon: c4 },
  { id: "steel-crest", name: "Steel Crest", note: "A shield crowned by a gear — authority, safety (HSE) and trust. Strong for stamps and certificates.", icon: c5 },
  { id: "monogram-seal", name: "Corporate Seal", note: "A full corporate seal with circular wordmark. Formal, established, official-looking.", icon: c6 },
];

let uid = 0;
const iconBox = (concept, bg) =>
  `<div class="tile ${bg}"><div class="ico">${concept.icon("u" + uid++)}</div></div>`;

const lockup = (concept, dark) => `
  <div class="lockup ${dark ? "on-dark" : "on-light"}">
    <div class="lk-ico">${concept.icon("u" + uid++)}</div>
    <div class="lk-text">
      <div class="lk-name">ETCS</div>
      <div class="lk-sub">EXPERT TECHNICAL CONTRACTING &amp; SERVICES</div>
    </div>
  </div>`;

const favStrip = (concept) => `
  <div class="favs">
    <div class="fav" style="width:48px;height:48px">${concept.icon("u" + uid++)}</div>
    <div class="fav" style="width:32px;height:32px">${concept.icon("u" + uid++)}</div>
    <div class="fav" style="width:20px;height:20px">${concept.icon("u" + uid++)}</div>
    <span class="fav-label">favicon sizes</span>
  </div>`;

const card = (concept, i) => `
  <section class="card">
    <header class="card-h">
      <span class="num">0${i + 1}</span>
      <div>
        <h2>${concept.name}</h2>
        <p>${concept.note}</p>
      </div>
    </header>
    <div class="icons">
      ${iconBox(concept, "light")}
      ${iconBox(concept, "dark")}
    </div>
    ${lockup(concept, false)}
    ${lockup(concept, true)}
    ${favStrip(concept)}
  </section>`;

const html = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>ETCS — Logo Concepts</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{--navy:${NAVY};--navy-deep:${NAVY_DEEP};--gold:${GOLD};--bone:#FAFAF8}
  *{box-sizing:border-box}
  body{margin:0;font-family:Inter,system-ui,sans-serif;background:#EEEFEA;color:#0A1A2F}
  .page{max-width:1180px;margin:0 auto;padding:56px 24px 96px}
  .masthead{text-align:center;margin-bottom:48px}
  .masthead .ey{font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:${GOLD_LO};font-weight:600}
  .masthead h1{font-family:Sora,sans-serif;font-weight:800;font-size:clamp(28px,4vw,44px);margin:.3em 0 .2em;color:${NAVY}}
  .masthead p{color:#4A4A43;max-width:560px;margin:0 auto;line-height:1.6}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:24px}
  .card{background:#fff;border:1px solid #E5E5DF;border-radius:20px;padding:22px;box-shadow:0 24px 60px -40px rgba(15,38,69,.35)}
  .card-h{display:flex;gap:14px;align-items:flex-start;margin-bottom:18px;min-height:84px}
  .num{font-family:Sora,sans-serif;font-weight:800;font-size:26px;color:${GOLD};line-height:1}
  .card-h h2{font-family:Sora,sans-serif;font-size:19px;margin:0 0 4px;color:${NAVY}}
  .card-h p{margin:0;font-size:12.5px;line-height:1.5;color:#5A5A52}
  .icons{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
  .tile{aspect-ratio:1;border-radius:14px;display:flex;align-items:center;justify-content:center;padding:20px}
  .tile.light{background:var(--bone);border:1px solid #E5E5DF}
  .tile.dark{background:var(--navy)}
  .ico{width:100%;height:100%}
  .lockup{display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:12px;margin-bottom:10px}
  .lockup.on-light{background:var(--bone);border:1px solid #E5E5DF}
  .lockup.on-dark{background:var(--navy)}
  .lk-ico{width:46px;height:46px;flex:0 0 46px}
  .lk-name{font-family:Sora,sans-serif;font-weight:800;font-size:26px;letter-spacing:.06em;line-height:1}
  .on-light .lk-name{color:${NAVY}} .on-dark .lk-name{color:#fff}
  .lk-sub{font-size:8.5px;letter-spacing:.22em;font-weight:600;margin-top:5px}
  .on-light .lk-sub{color:${GOLD_LO}} .on-dark .lk-sub{color:${GOLD_400}}
  .favs{display:flex;align-items:center;gap:14px;margin-top:14px;padding-top:14px;border-top:1px dashed #E0E0D8}
  .fav{display:flex;align-items:center;justify-content:center}
  .fav-label{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#9A9A90;margin-left:auto}
  footer{text-align:center;margin-top:56px;color:#6B6B61;font-size:13px}
</style></head>
<body>
  <div class="page">
    <div class="masthead">
      <div class="ey">ETCS · Brand Identity</div>
      <h1>Logo Concepts</h1>
      <p>Six directions in the ETCS palette — deep navy &amp; metallic gold. Each shown as an icon (light &amp; dark), a horizontal lockup, and at favicon sizes. All are crisp, scalable SVG.</p>
    </div>
    <div class="grid">
      ${CONCEPTS.map(card).join("")}
    </div>
    <footer>Tell me the number(s) you like and I'll refine and wire it into the live site.</footer>
  </div>
</body></html>`;

await fs.mkdir(path.resolve("public"), { recursive: true });
await fs.writeFile(path.resolve("public/logo-options.html"), html, "utf8");
console.log("wrote public/logo-options.html with", CONCEPTS.length, "concepts");
