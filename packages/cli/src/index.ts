import { log } from '@lepton-cli/utils';
import { checkNodeVersion, checkRootUser, checkUserHome, logVersion } from './utils';

function cli() {
  try {
    logVersion();
    checkNodeVersion();
    checkRootUser();
    checkUserHome();
  } catch (e: any) {
    log.error('', e.message);
  }
}

export default cli;
