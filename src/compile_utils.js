import TOML from "@iarna/toml";
import fs from "fs";

import path from 'path';

export function loadAllSvgs() {
  const svgDir = path.join(process.cwd(), 'public', 'img');
  const files = fs.readdirSync(svgDir);
  const svgFiles = files.filter((file) => path.extname(file).toLowerCase() === '.svg');
  const svgs = {};

  for (const svgFile of svgFiles) {
    const filePath = path.join(svgDir, svgFile);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const basename = path.basename(svgFile, '.svg');
    const fileB64 = Buffer.from(fileContent);
    svgs[basename] = `data:image/svg+xml;base64,${fileB64.toString('base64')}`
  }

  return svgs;
}

export function loadConfig() {
  const configFile = fs.readFileSync('config.toml', 'utf8');
  const config = TOML.parse(configFile);
  config.email = Buffer.from(config.email).toString("base64")
  config.links.forEach(x => {
    x.title = Buffer.from(x.title).toString("base64")
  })
  return config;
}

export function adjustColor(color, amount) {
  const colorInt = parseInt(color.slice(1), 16);
  const r = (colorInt >> 16) + amount;
  const g = ((colorInt >> 8) & 0x00FF) + amount;
  const b = (colorInt & 0x0000FF) + amount;

  return '#' + (
    ((clamp(r) << 16) | (clamp(g) << 8) | clamp(b))
      .toString(16)
      .padStart(6, '0')
  ) + '19';
}

function clamp(value, min = 0, max = 255) {
  return Math.min(Math.max(value, min), max);
}
