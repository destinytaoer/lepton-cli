import { Package } from '../package';
import { log } from '@lepton-cli/utils';
import { resolve } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const CACHE_DIR = 'dependencies';

const SETTINGS: Record<string, string> = {
  init: '@lepton-cli/cli',
};

export async function exec() {
  let targetPath = process.env.CLI_TARGET_PATH as string;
  const homePath = process.env.CLI_HOME_PATH as string;
  log.verbose('targetPath', targetPath);
  log.verbose('homePath', homePath);
  // 1. targetPath -> modulePath
  // 2. modulePath -> Package(npm 模块)
  // 封装 Package 类
  // 3. Package.isExist/Package.update/Package.install
  // 4. Package.getRootFile 获取入口文件

  const cmdObj = arguments[arguments.length - 1];
  const cmdName = cmdObj.name();
  const packageName = SETTINGS[cmdName];
  const packageVersion = 'latest';

  // 生成缓存目录
  let storePath = '';
  if (!targetPath) {
    targetPath = resolve(homePath, CACHE_DIR);
    storePath = resolve(targetPath, 'node_modules');
    log.verbose('targetPath', targetPath);
    log.verbose('storePath', storePath);
  }

  const pkg = new Package({
    targetPath,
    storePath,
    name: packageName,
    version: packageVersion,
  });

  if (pkg.exist()) {
    // 更新 package
  } else {
    await pkg.install();
  }

  const rootFile = pkg.getRootFilePath();
  if (rootFile) {
    if (pkg.isEsModule()) {
      import(rootFile).then((module) => {
        module.default(...arguments);
      });
    } else {
      require(rootFile)(...arguments);
    }
  }
}
