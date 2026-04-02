import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const postsDir = path.join(rootDir, "src", "content", "posts");
const publicImagesDir = path.join(rootDir, "public", "images", "posts");
const generatedDir = path.join(rootDir, "src", "generated");
const manifestPath = path.join(generatedDir, "image-map.json");

await mkdir(publicImagesDir, { recursive: true });
await mkdir(generatedDir, { recursive: true });

const manifest = {};
const files = (await readdir(postsDir)).filter((file) => file.endsWith(".md"));

for (const file of files) {
  const fullPath = path.join(postsDir, file);
  const slug = path.basename(file, ".md");
  const raw = await readFile(fullPath, "utf8");
  const match = raw.match(/^---\n[\s\S]*?\nimage:\s*["']?([^"'\n]+)["']?[\s\S]*?\n---/m);
  const sourceImage = match?.[1]?.trim();

  if (!sourceImage) continue;
  if (!/^https?:\/\//i.test(sourceImage)) {
    manifest[slug] = sourceImage;
    continue;
  }

  try {
    const response = await fetch(sourceImage);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const contentType = response.headers.get("content-type") ?? "";
    const extension = inferExtension(sourceImage, contentType);
    const outputName = `${slug}${extension}`;
    const outputPath = path.join(publicImagesDir, outputName);
    const buffer = Buffer.from(await response.arrayBuffer());

    await writeFile(outputPath, buffer);
    manifest[slug] = `/images/posts/${outputName}`;
    process.stdout.write(`image ok ${slug}\n`);
  } catch (error) {
    const outputName = `${slug}.svg`;
    const outputPath = path.join(publicImagesDir, outputName);
    await writeFile(outputPath, buildFallbackSvg(slug));
    manifest[slug] = `/images/posts/${outputName}`;
    process.stdout.write(`image fallback ${slug}: ${error instanceof Error ? error.message : String(error)}\n`);
  }
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
process.stdout.write(`manifest written ${path.relative(rootDir, manifestPath)}\n`);

function inferExtension(sourceUrl, contentType) {
  if (contentType.includes("png")) return ".png";
  if (contentType.includes("webp")) return ".webp";
  if (contentType.includes("svg")) return ".svg";
  const pathname = new URL(sourceUrl).pathname;
  const ext = path.extname(pathname).toLowerCase();
  return [".jpg", ".jpeg", ".png", ".webp", ".svg"].includes(ext) ? ext : ".jpg";
}

function buildFallbackSvg(slug) {
  const label = slug.replace(/-/g, " ").slice(0, 48);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <defs>
    <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
      <stop offset="0%" stop-color="#1B2A4A"/>
      <stop offset="100%" stop-color="#E2001A"/>
    </linearGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#bg)"/>
  <rect x="54" y="54" width="1172" height="612" rx="28" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)"/>
  <text x="90" y="190" fill="#FFFFFF" font-family="Georgia, serif" font-size="42" font-weight="700">FO Com Supports Banque Postale</text>
  <text x="90" y="278" fill="rgba(255,255,255,0.88)" font-family="Georgia, serif" font-size="30">${escapeXml(label)}</text>
  <text x="90" y="610" fill="rgba(255,255,255,0.72)" font-family="Georgia, serif" font-size="24">Visuel de secours genere localement pendant le build</text>
</svg>`;
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
