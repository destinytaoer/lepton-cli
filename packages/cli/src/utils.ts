import pkg from '../package.json';
import { log } from '@lepton-cli/utils';

export function logVersion() {
  log.info('cli', pkg.version);
}
