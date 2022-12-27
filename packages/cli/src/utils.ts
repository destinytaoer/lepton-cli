import fs from 'fs';
import os from 'os';
import semver from 'semver';
import rootCheck from 'root-check';
import chalk from 'chalk';
import minimist from 'minimist';
import { log } from '@lepton-cli/utils';
import pkg from '../package.json';
import { LOWEST_NODE_VERSION } from './const';

export function logVersion() {
  log.info('cli', pkg.version);
}

export function checkNodeVersion() {
  const currentVersion = process.version;
  const lowestVersion = LOWEST_NODE_VERSION;
  if (!semver.gte(currentVersion, lowestVersion)) {
    throw new Error(chalk.red(`使用 lepton cli 需要安装 ${lowestVersion} 以上版本的 Node.js`));
  }
}

export function checkRootUser() {
  // 检查是否 root 账号, 如果是, 会自动降级为普通用户
  rootCheck();
}

// 检查用户主目录
export function checkUserHome() {
  const homedir = os.homedir();
  if (!homedir || !fs.existsSync(homedir)) {
    throw new Error(chalk.red('当前登录用户主目录不存在'));
  }
}

// 检查入参
export function checkInputArgs() {
  console.log('checkInputArgs');
  const args = minimist(process.argv.slice(2));
  console.log(args);
  checkArgs(args);
  log.verbose('test', 'aa');
}

export function checkArgs(args: Record<string, any>) {
  if (args.debug) {
    process.env.LOG_LEVEL = 'verbose';
  } else {
    process.env.LOG_LEVEL = 'info';
  }
  log.level = process.env.LOG_LEVEL;
}
