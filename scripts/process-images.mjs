// One-off image curation + optimisation for Rev 01.
// Reads the client photo library, picks the highest-resolution shots per
// discipline, and writes optimised JPGs into public/images/{services,work,hero}.
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const SRC = "/Users/mrq/Desktop/Data for website Revision 01";
const PUB = path.resolve("public/images");
const EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const MAP = [
  { dir: "1. Surface Protection", service: "coating", work: "coating", gallery: 4 },
  { dir: "2. Insulation Services", service: "insulation", work: "insulation", gallery: 3 },
  { dir: "3. Refractory", service: "refractory", work: "refractory", gallery: 3 },
  { dir: "4. Passive Fire Protection", service: "passive-fire-protection", work: "passive-fire-protection", gallery: 3 },
  { dir: "5.Fabrication", service: "piping", work: "fabrication", gallery: 5 },
  { dir: "6. Civil Construction", service: "civil", work: "civil", gallery: 5 },
  { dir: "7. Wastemanagement", service: "waste", work: "waste", gallery: 2 },
  { dir: "8. Inspection Services", service: "inspection-services", work: "inspection", gallery: 4 },
  { dir: "9. Training Services", service: "training-services", work: "training", gallery: 4 },
  { dir: "10. Material Supply & Equipments", service: "supply", work: null, gallery: 0 },
  { dir: "11. Manpower Supply", service: "manpower", work: "manpower", gallery: 2 },
];

async function listImages(dir) {
  let files = [];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }
  const out = [];
  for (const f of files) {
    if (!EXT.has(path.extname(f).toLowerCase())) continue;
    const full = path.join(dir, f);
    try {
      const meta = await sharp(full).metadata();
      const area = (meta.width || 0) * (meta.height || 0);
      if ((meta.width || 0) < 700) continue; // skip thumbnails/icons
      out.push({ full, area, landscape: (meta.width || 0) >= (meta.height || 0) });
    } catch {
      /* unreadable — skip */
    }
  }
  // highest resolution first (a decent proxy for "best" without viewing)
  out.sort((a, b) => b.area - a.area);
  return out;
}

async function write(srcFull, outFile, longEdge) {
  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await sharp(srcFull)
    .rotate() // respect EXIF orientation
    .resize({ width: longEdge, height: longEdge, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(outFile);
  process.stdout.write(`  → ${path.relative(PUB, outFile)}\n`);
}

async function run() {
  const heroPool = [];
  for (const m of MAP) {
    const imgs = await listImages(path.join(SRC, m.dir));
    if (imgs.length === 0) {
      console.log(`! no images for ${m.dir}`);
      continue;
    }
    console.log(`${m.dir} (${imgs.length} usable)`);

    // service hero (prefer a landscape near the top of the resolution list)
    const heroPick = imgs.find((i) => i.landscape) || imgs[0];
    await write(heroPick.full, path.join(PUB, "services", `${m.service}-01.jpg`), 1600);

    // discipline gallery
    if (m.work && m.gallery > 0) {
      const picks = imgs.slice(0, m.gallery);
      for (let i = 0; i < picks.length; i++) {
        await write(picks[i].full, path.join(PUB, "work", m.work, `0${i + 1}.jpg`), 1280);
      }
    }

    // collect landscape candidates for the homepage hero slideshow
    for (const i of imgs.filter((x) => x.landscape).slice(0, 3)) heroPool.push(i);
  }

  // also pull cinematic wides from extras
  const extras = await listImages(path.join(SRC, "extras photos"));
  for (const i of extras.filter((x) => x.landscape).slice(0, 6)) heroPool.push(i);

  heroPool.sort((a, b) => b.area - a.area);
  const heroPicks = heroPool.slice(0, 4);
  console.log("hero slideshow:");
  for (let i = 0; i < heroPicks.length; i++) {
    await write(heroPicks[i].full, path.join(PUB, "hero", `hero-0${i + 1}.jpg`), 1920);
  }
  console.log("done.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
