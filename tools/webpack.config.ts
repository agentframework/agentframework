import * as path from 'path'
import * as fs from 'fs'
import * as webpack from 'webpack'

declare var __dirname;
const projectRoot = path.resolve(__dirname, '..');
let externalNodeModules = Object.create(null);

// all node_modules will be consider as externals
fs.readdirSync(path.join(projectRoot, 'node_modules'))
  .filter((x: string) => ['.bin'].indexOf(x) === -1)
  .forEach((mod: string) => {
    externalNodeModules[mod] = `commonjs ${mod}`
  });

export default {
  target: 'es6',
  entry: {
    index: path.join(projectRoot, 'src/lib/index.ts')
  },
  output: {
    path: path.join(projectRoot, 'lib'),
    filename: '[name].js',
    libraryTarget: 'commonjs'
  },
  node: {
    __dirname: false
  },
  externals: externalNodeModules,
  resolve: {
    extensions: ['.ts']
  },
  module: {
    loaders: [
      {test: /\.ts$/, loader: 'ts-loader'}
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
