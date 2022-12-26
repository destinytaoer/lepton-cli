import { log } from '@lepton-cli/utils';
import { checkNodeVersion, checkRootUser, logVersion } from './utils';

function cli() {
  try {
    logVersion();
    checkNodeVersion();
    checkRootUser();
  } catch (e: any) {
    log.error('', e.message);
  }
}

export default cli;
