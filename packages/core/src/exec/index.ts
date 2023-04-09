import { Package } from '../package';
import { log } from '@lepton-cli/utils';

const SETTINGS: Record<string, string> = {
  init: '@lepton-cli/init',
};

export function exec() {
  let targetPath: string = process.env.CLI_TARGET_PATH;
  const homePath: string = process.env.CLI_HOME_PATH;
  log.verbose('targetPath', targetPath);
  log.verbose('homePath', homePath);

  const cmdObj = arguments[arguments.length - 1];
  const cmdName = cmdObj.name();
  const packageName = SETTINGS[cmdName];
  const packageVersion = 'latest';

  // 生成缓存目录
  if (!targetPath) {
    targetPath = '';
  }

  const pkg = new Package({
    targetPath,
    storePath: '',
    name: packageName,
    version: packageVersion,
  });

  console.log(pkg.getRootFilePath());
  // 1. targetPath -> modulePath
  // 2. modulePath -> Package(npm 模块)
  // 封装 Package 类
  // 3. Package.isExist/Package.update/Package.install
  // 4. Package.getRootFile 获取入口文件
}
