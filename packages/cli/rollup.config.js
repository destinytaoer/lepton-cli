const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const json = require('@rollup/plugin-json');

module.exports = {
  input: 'src/index.ts',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
  },
  external: [/node_modules/],
  plugins: [nodeResolve(), commonjs(), typescript(), json()],
};
