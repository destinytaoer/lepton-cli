import * as commander from 'commander';
import pkg from '../package.json';

export const program = new commander.Command();

export function registerCommand() {
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version);

  program.parse(process.argv)
}
