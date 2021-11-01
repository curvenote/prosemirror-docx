import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

const isProduction = !process.env.ROLLUP_WATCH

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: isProduction
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: isProduction
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
  ],
  plugins: [
    typescript(),
    commonjs(),
  ],
  watch: {
    clearScreen: false
  }
}
