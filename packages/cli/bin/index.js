#! /usr/bin/env node

import importLocal from 'import-local';
import log from 'npmlog';
import cli from '../lib/index.js';

if (importLocal(import.meta.url)) {
  log.info('cli', '正在使用本地版本');
} else {
  cli();
}
