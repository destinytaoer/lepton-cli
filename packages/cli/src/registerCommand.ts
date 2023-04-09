import * as commander from 'commander';
import pkg from '../package.json';
import { log } from '@lepton-cli/utils';
import { init } from '@lepton-cli/init';
import { exec } from '@lepton-cli/core';
import chalk from 'chalk';

export const program = new commander.Command();

export function registerCommand() {
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d --debug', '是否开启调试模式', false)
    .option('-tp --targetPath <targetPath>', '是否指定本地调试文件路径', '');

  program
    .command('init [projectName]')
    .option('-f --force', '是否强制初始化项目')
    .action(exec);

  // debug 模式
  program.on('option:debug', function(...args) {
    const options = program.opts();
    if (options.debug) {
      process.env.LOG_LEVEL = 'verbose';
    } else {
      process.env.LOG_LEVEL = 'info';
    }

    log.level = process.env.LOG_LEVEL;
    log.verbose('debug', chalk.red('开启 debug 模式'));
  });

  // 指定 targetPath
  // 因为 targetPath 是 program 的选项, 定义的命令或者子命令中是不能直接拿到的, 所以统一放到环境变量中, 方便获取
  program.on('option:targetPath', function() {
    process.env.CLI_TARGET_PATH = program.opts().targetPath;
  });

  // 所有未知命令的处理
  program.on('command:*', function(args) {
    const availableCommands = program.commands.map(cmd => cmd.name());
    log.error('command', chalk.red(`未知命令: ${args[0]}`));
    if (availableCommands.length > 0) {
      log.info('command', chalk.red(`可用命令: ${availableCommands.join(', ')}`));
    }
  });

  // 只输入命令时, 输出帮助文档
  if (process.argv.length < 3) {
    program.outputHelp();
  }

  program.parse(process.argv);
}
