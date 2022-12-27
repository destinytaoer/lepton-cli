import { log } from '@lepton-cli/utils';
import { checkInputArgs, checkNodeVersion, checkRootUser, checkUserHome, logVersion } from './utils';

function cli() {
  try {
    logVersion();
    checkNodeVersion();
    checkRootUser();
    checkUserHome();
    checkInputArgs();
  } catch (e: any) {
    log.error('', e.message);
  }
}

export default cli;
