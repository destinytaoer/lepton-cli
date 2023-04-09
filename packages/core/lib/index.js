import log from 'npmlog';

function exec() {
    console.log('exec');
    console.log(process.env.CLI_TARGET_PATH);
    console.log(process.env.CLI_HOME_PATH);
    // 1. targetPath -> modulePath
    // 2. modulePath -> Package(npm 模块)
    // 封装 Package 类
    // 3. Package.isExist/Package.update/Package.install
    // 4. Package.getRootFile 获取入口文件
}

log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
log.heading = 'lepton';

function isObject(o) {
    return Object.prototype.toString.call(o) === '[object Object]';
}

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

export { Package, exec };
