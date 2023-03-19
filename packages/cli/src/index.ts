import { log } from '@lepton-cli/utils';
import {
  checkEnv,
  checkGlobalUpdate,
  checkNodeVersion,
  checkRootUser,
  checkUserHome,
  logVersion,
} from './utils';
import { registerCommand } from './registerCommand';

async function cli() {
  try {
    await prepare();
    registerCommand();
  } catch (e: any) {
    log.error('', e.message);
  }
}

async function prepare() {
  logVersion();
  checkNodeVersion();
  checkRootUser();
  checkUserHome();
  checkEnv();
  await checkGlobalUpdate();
}

export default cli;
