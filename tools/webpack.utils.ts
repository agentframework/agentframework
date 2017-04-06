import * as path from 'path'
import * as fs from 'fs'

declare const __dirname: string;
const projectRoot = path.resolve(__dirname, '..');

export function getExternalModules() {
  let externalNodeModules = Object.create(null);

  // all node_modules will be consider as externals
  fs.readdirSync(path.join(projectRoot, 'node_modules'))
    .filter((x: string) => ['.bin'].indexOf(x) === -1)
    .forEach((mod: string) => {
      externalNodeModules[mod] = `commonjs ${mod}`
    });

  return externalNodeModules;
}

export function resolve(dir) {
  return path.join(projectRoot, dir)
}

