import * as commander from 'commander';
import pkg from '../package.json';
import { log } from '@lepton-cli/utils';
import chalk from 'chalk';

export const program = new commander.Command();

export function registerCommand() {
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d --debug', '是否开启调试模式', false);

  program.on('option:debug', function(...args) {
    const options = program.opts()
    if(options.debug) {
      process.env.LOG_LEVEL = 'verbose'
    } else {
      process.env.LOG_LEVEL = 'info'
    }

    log.level = process.env.LOG_LEVEL;
    log.verbose('debug', chalk.red('开启 debug 模式'));
  })

  program.parse(process.argv)
}
