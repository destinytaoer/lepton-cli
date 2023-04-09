import { isObject } from '@lepton-cli/utils';

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
  }

  // 安装 package
  install() {
  }

  // 更新 package
  update() {
  }

  // 获取入口文件路径
  getRootFilePath() {
  }
}
