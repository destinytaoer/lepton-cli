import { log } from '@lepton-cli/utils';
import {
  checkEnv,
  checkGlobalUpdate,
  checkInputArgs,
  checkNodeVersion,
  checkRootUser,
  checkUserHome,
  logVersion,
} from './utils';
import { registerCommand } from './registerCommand';

function cli() {
  try {
    logVersion();
    checkNodeVersion();
    checkRootUser();
    checkUserHome();
    // checkInputArgs();
    checkEnv();
    checkGlobalUpdate();
    registerCommand();
  } catch (e: any) {
    log.error('', e.message);
  }
}

export default cli;
