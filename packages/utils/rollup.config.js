import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export default {
  input: {
    index: 'src/index.ts',
    log: 'src/log/index.ts',
    function: 'src/function/index.ts',
  },
  output: {
    dir: 'lib',
    format: 'es',
  },
  external: [/node_modules/],
  plugins: [nodeResolve(), commonjs(), typescript(), json()],
};
