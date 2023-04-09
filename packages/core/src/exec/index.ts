import { Package } from '../package';
import { log } from '@lepton-cli/utils';

export function exec() {
  const targetPath = process.env.CLI_TARGET_PATH;
  const homePath = process.env.CLI_HOME_PATH;
  log.verbose(targetPath);
  log.verbose(homePath);

  const pkg = new Package({});

  // 1. targetPath -> modulePath
  // 2. modulePath -> Package(npm 模块)
  // 封装 Package 类
  // 3. Package.isExist/Package.update/Package.install
  // 4. Package.getRootFile 获取入口文件
}
