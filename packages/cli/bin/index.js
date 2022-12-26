#! /usr/bin/env node

import importLocal from 'import-local';
import { fileURLToPath } from 'url';
import log from 'npmlog';
import cli from '../lib/index.js';

const __filename = fileURLToPath(import.meta.url);
if (importLocal(__filename)) {
  log.info('cli', '正在使用本地版本');
} else {
  cli();
}
