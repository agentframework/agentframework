import { getExternalModules, resolve } from './webpack.utils';

export default [
  // Build UMD module into `dist` folder
  {
    entry: {
      index: resolve('src/lib/index.ts')
    },
    output: {
      path: resolve('release/dist'),
      filename: 'agentframework.js',
      libraryTarget: 'umd'
    },
    node: {
      __dirname: false
    },
    externals: getExternalModules(),
    resolve: {
      extensions: ['.ts']
    },
    module: {
      loaders: [
        {
          test: /\.ts$/,
          loaders: ['ts-loader?configFileName=tsconfig.json']
        }
      ]
    }
  },
  {
    entry: {
      index: resolve('src/lib/index.ts')
    },
    output: {
      path: resolve('release/dist'),
      filename: 'agentframework.min.js',
      libraryTarget: 'umd'
    },
    node: {
      __dirname: false
    },
    externals: getExternalModules(),
    resolve: {
      extensions: ['.ts']
    },
    module: {
      loaders: [
        {
          test: /\.ts$/,
          loaders: ['babel-loader?presets[]=babili', 'ts-loader?configFileName=tsconfig.json'] //
        }
      ]
    }
  }
]
