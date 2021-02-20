import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
import postcss from 'rollup-plugin-postcss'

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'lib/front-debugger.js',
      format: 'umd',
      extend: true,
      name: "FrontDebugger",
    },
    plugins: [
      postcss({
        extensions: ['.css']
      }),
      typescript(),
      commonjs()
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'lib/front-debugger.min.js',
      format: 'umd',
      extend: true,
      name: "FrontDebugger",
    },
    plugins: [
      postcss({
        extensions: ['.css']
      }),
      typescript(),
      commonjs(),
      uglify()
    ]
  }
]