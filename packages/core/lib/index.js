import { sep, resolve } from 'path';
import { createRequire } from 'module';
import { packageDirectorySync } from 'pkg-dir';
import log from 'npmlog';

log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
log.heading = 'lepton';

function isObject(o) {
    return Object.prototype.toString.call(o) === '[object Object]';
}
function isString(o) {
    return typeof o === 'string';
}

function formatPath(p) {
    if (p && isString(p)) {
        if (sep === '/') {
            return p;
        }
        else {
            return p.replace(/\\/g, '/');
        }
    }
    return p;
}

const require = createRequire(import.meta.url);
class Package {
    // 包路径
    targetPath;
    // 缓存路径
    // storePath: string;
    // 包名
    name;
    // 版本
    version;
    constructor(options) {
        if (!options && isObject(options)) {
            throw new Error('Package 类的参数不能为空');
        }
        this.targetPath = options.targetPath;
        // this.storePath = options.storePath;
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
}

const SETTINGS = {
    init: '@lepton-cli/init',
};
function exec() {
    let targetPath = process.env.CLI_TARGET_PATH;
    const homePath = process.env.CLI_HOME_PATH;
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

export { Package, exec };
