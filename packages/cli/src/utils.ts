import fs from 'fs';
import os from 'os';
import path from 'path';

import semver from 'semver';
import rootCheck from 'root-check';
import minimist from 'minimist';
import dotenv from 'dotenv';
import { getNpmSemverVersion } from '@lepton-cli/npm';

import chalk from 'chalk';
import { log } from '@lepton-cli/utils';
import pkg from '../package.json';
import { DEFAULT_CLI_HOME, LOWEST_NODE_VERSION } from './const';

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

export function checkEnv() {
  const homedir = os.homedir();
  const dotenvPath = path.resolve(homedir, '.env');
  if (fs.existsSync(dotenvPath)) {
    dotenv.config({ path: dotenvPath });
  }
  createDefaultConfig();
  log.verbose('env', JSON.stringify(process.env));
}

export function createDefaultConfig() {
  const cliConfig: Record<string, any> = {
    home: os.homedir(),
  };
  if (process.env.CLI_HOME) {
    cliConfig.cliHome = path.join(cliConfig.home, process.env.CLI_HOME);
  } else {
    cliConfig.cliHome = path.join(cliConfig.home, DEFAULT_CLI_HOME);
  }

  process.env.CLI_HOME_PATH = cliConfig.cliHome;
}

export async function checkGlobalUpdate() {
  // 获取当前版本和包名
  const currentVersion = pkg.version;
  const name = pkg.name;
  // 从 npm api 获取所有版本
  const latestVersion = await getNpmSemverVersion(currentVersion, name);
  if (!latestVersion) return;
  // 提取所有大于当前版本的版本号
  log.warn('更新提示', chalk.yellow(`当前版本: ${currentVersion}, 最新版本: ${latestVersion}
更新命令: npm install -g ${name}`));
  // 获取最新版本号, 提示用户更新
}
