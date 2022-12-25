import semver from 'semver'
import chalk from 'chalk'
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
    throw new Error(chalk.red(`使用 lepton cli 需要安装 ${lowestVersion} 以上版本的 Node.js`))
  }
}
