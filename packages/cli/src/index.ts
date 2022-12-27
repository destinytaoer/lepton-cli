import { log } from '@lepton-cli/utils';
import { checkEnv, checkInputArgs, checkNodeVersion, checkRootUser, checkUserHome, logVersion } from './utils';

function cli() {
  try {
    logVersion();
    checkNodeVersion();
    checkRootUser();
    checkUserHome();
    checkInputArgs();
    checkEnv();
  } catch (e: any) {
    log.error('', e.message);
  }
}

export default cli;
