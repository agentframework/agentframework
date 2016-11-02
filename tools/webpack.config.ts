import * as path from 'path'
import * as fs from 'fs'

declare var __dirname: string;
const projectRoot = path.resolve(__dirname, '..');
let externalNodeModules = Object.create(null);

// all node_modules will be consider as externals
fs.readdirSync(path.join(projectRoot, 'node_modules'))
  .filter((x: string) => ['.bin'].indexOf(x) === -1)
  .forEach((mod: string) => {
    externalNodeModules[mod] = `commonjs ${mod}`
  });

export default {
  target: 'node',
  entry: {
    index: path.resolve(projectRoot, 'src/lib/index.ts')
  },
  output: {
    path: path.resolve(projectRoot, 'release/lib'),
    filename: '[name].js',
    libraryTarget: 'commonjs'
  },
  node: {
    __dirname: false
  },
  externals: externalNodeModules,
  resolve: {
    extensions: ['', '.ts']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['babel-loader?presets[]=babili', 'ts-loader']
      }
    ]
  }
}
