import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export default {
  input: {
    index: 'src/index.ts',
  },
  output: {
    dir: 'lib',
    format: 'es',
  },
  external: [/node_modules/, /@lepton-cli/],
  plugins: [nodeResolve(), commonjs(), typescript(), json()],
};
