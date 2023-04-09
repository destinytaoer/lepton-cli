import { resolve } from 'path';
import { createRequire } from 'module';
import { pathExistsSync } from 'path-exists';
import { packageDirectorySync } from 'pkg-dir';
import { isObject, formatPath, log } from '@lepton-cli/utils';
import { getNpmLatestVersion, npmInstall, getDefaultRegistry } from '@lepton-cli/npm';

const require$1 = createRequire(import.meta.url);
class Package {
    // 包路径
    targetPath;
    // 缓存路径
    storePath;
    // 包名
    name;
    // 版本
    version;
    constructor(options) {
        if (!options && isObject(options)) {
            throw new Error('Package 类的参数不能为空');
        }
        this.targetPath = options.targetPath;
        this.storePath = options.storePath;
        this.name = options.name;
        this.version = options.version;
    }
    async prepare() {
        if (this.version === 'latest') {
            this.version = await getNpmLatestVersion(this.name) ?? '';
        }
    }
    get cacheFilePath() {
        return resolve(this.storePath, this.name);
    }
    // 判断当前 package 是否存在
    async exist() {
        if (this.storePath) {
            await this.prepare();
            console.log(this.cacheFilePath);
            return pathExistsSync(this.cacheFilePath);
        }
        else {
            return pathExistsSync(this.targetPath);
        }
    }
    // 安装 package
    async install() {
        await this.prepare();
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
            const pkgFile = require$1(resolve(dir, 'package.json'));
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
            const pkgFile = require$1(resolve(dir, 'package.json'));
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

const require = createRequire(import.meta.url);
const CACHE_DIR = 'dependencies';
const SETTINGS = {
    init: '@lepton-cli/cli',
};
async function exec() {
    let targetPath = process.env.CLI_TARGET_PATH;
    const homePath = process.env.CLI_HOME_PATH;
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
    if (await pkg.exist()) {
        // 更新 package
        console.log('update');
    }
    else {
        await pkg.install();
    }
    const rootFile = pkg.getRootFilePath();
    if (rootFile) {
        if (pkg.isEsModule()) {
            import(rootFile).then((module) => {
                module.default(...arguments);
            });
        }
        else {
            require(rootFile)(...arguments);
        }
    }
}

export { Package, exec };
