import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/lib/index.ts',

  plugins: [
    typescript({
      cacheRoot: './release/tmp/.rpt2_cache',
      tsconfig: 'tsconfig.release.json'
    }),
    terser({
      // 6 = es2015: class,
      // 7 = es2016: Array.includes,
      // 8 = es2017: async/await,
      // 9 = es2018: spread operator
      ecma: 9,

      compress: {
        // compress options
        keep_classnames: true,
        keep_fnames: true,
        keep_fargs: true,
        keep_infinity: true,
        module: true,
        global_defs: {
          '@console.log': 'alert'
        },
        passes: 3
      },

      output: {
        preamble: '/* minified */'
      }
    })
  ],

  output: [
    {
      file: './release/tmp/index.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: './release/tmp/index.mjs',
      format: 'es'
    }
  ]
};
