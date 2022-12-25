const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const json = require('@rollup/plugin-json');

module.exports = {
  input: {
    index: 'src/index.ts',
    log: 'src/log/index.ts',
  },
  output: {
    dir: 'lib',
    format: 'cjs',
  },
  external: [/node_modules/],
  plugins: [nodeResolve(), commonjs(), typescript(), json()],
};
