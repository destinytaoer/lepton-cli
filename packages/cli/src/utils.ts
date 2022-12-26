import fs from 'fs';
import os from 'os';
import semver from 'semver';
import rootCheck from 'root-check';
import chalk from 'chalk';
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
