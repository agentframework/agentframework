import typescript from 'rollup-plugin-typescript2';

export default {

  input: './src/lib/index.ts',

  plugins: [
    typescript({
      tsconfig: 'tsconfig.release.json'
    })
  ],

  output: [
    {
      file: './release/lib/index.js',
      format: 'cjs',
      sourcemap: true
    }
  ]
}
