import TOML from "@iarna/toml";
import fs from "fs";

import path from 'path';
import type { Config } from "./config";


export function loadAllSvgs() {
  const svgDir = path.join(process.cwd(), 'public', 'img');
  const files = fs.readdirSync(svgDir);
  const svgFiles = files.filter((file) => path.extname(file).toLowerCase() === '.svg');
  const svgs = Object();

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
  return config as unknown as Config;
}
