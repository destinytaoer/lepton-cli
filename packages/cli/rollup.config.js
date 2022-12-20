const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const json = require('@rollup/plugin-json');
const pkg = require('./package.json');

module.exports = {
  input: 'src/index.ts',
  output: {
    file: pkg.main,
    format: 'cjs',
  },
  external: ['commander', 'zx', 'figlet', 'inquirer', 'ora'],
  plugins: [nodeResolve(), commonjs(), typescript(), json()],
};
