import typescript from 'rollup-plugin-typescript2';

export default {

  input: './src/lib/index.ts',

  plugins: [
    typescript({
      cacheRoot: '/tmp/.rpt2_cache',
      tsconfig: 'tsconfig.release.json'
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
}
