import { resolve } from 'path';
import { createRequire } from 'module';

import { packageDirectorySync } from 'pkg-dir';
import { formatPath, isObject } from '@lepton-cli/utils';
import { getDefaultRegistry, npmInstall } from '@lepton-cli/npm';

const require = createRequire(import.meta.url);

export interface IPackageOptions {
  targetPath: string;
  storePath: string;
  name: string;
  version: string;
}

export class Package {
  // 包路径
  targetPath: string;
  // 缓存路径
  storePath: string;
  // 包名
  name: string;
  // 版本
  version: string;

  constructor(options: IPackageOptions) {
    if (!options && isObject(options)) {
      throw new Error('Package 类的参数不能为空');
    }
    this.targetPath = options.targetPath;
    this.storePath = options.storePath;
    this.name = options.name;
    this.version = options.version;
  }

  // 判断当前 package 是否存在
  exist() {
    return false
  }

  // 安装 package
  install() {
    return npmInstall({
      root: this.targetPath,
      storeDir: this.storePath,
      registry: getDefaultRegistry(),
      pkgs: [{
        name: this.name,
        version: this.version,
      }],
    });
  }

  // 更新 package
  update() {
  }

  // 获取 package.json 数据
  getPackageJson() {
    // 1. 获取 package.json 所在目录 -> pkg-dir
    const dir = packageDirectorySync({ cwd: this.targetPath });
    if (dir) {
      // 2. 读取 package.json
      const pkgFile = require(resolve(dir, 'package.json'));
      return pkgFile || null;
    }
    return null;
  }

  // 获取入口文件路径
  getRootFilePath() {
    // 1. 获取 package.json 所在目录 -> pkg-dir
    const dir = packageDirectorySync({ cwd: this.targetPath });
    if (dir) {
      // 2. 读取 package.json
      const pkgFile = require(resolve(dir, 'package.json'));
      // 3. main/lib -> path
      if (pkgFile && pkgFile.main) {
        // 4. 路径的兼容(macOS/windows)
        return formatPath(resolve(dir, pkgFile.main));
      }
    }
    return null;
  }

  // 判断是否是 es module
  isEsModule() {
    const pkgFile = this.getPackageJson();
    return !!(pkgFile && pkgFile.type === 'module');
  }
}
