import { log } from '@lepton-cli/utils';
import { checkNodeVersion, logVersion } from './utils';

function cli() {
  try {
    logVersion();
    checkNodeVersion();
  } catch (e: any) {
    log.error('', e.message);
  }
}

export default cli;
