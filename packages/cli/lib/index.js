import { log } from '@lepton-cli/utils';
import fs from 'fs';
import os from 'os';
import path from 'path';
import semver from 'semver';
import rootCheck from 'root-check';
import dotenv from 'dotenv';
import { getNpmSemverVersion } from '@lepton-cli/npm';
import chalk from 'chalk';
import * as commander from 'commander';
import { init } from '@lepton-cli/init';

var name = "@lepton-cli/cli";
var version = "0.1.0";
var description = "lepton 脚手架工具";
var bin = {
	lepton: "./bin/index.js"
};
var type = "module";
var main = "lib/index.js";
var scripts = {
	dev: "rollup -c -w",
	build: "rollup -c"
};
var dependencies = {
	"@lepton-cli/npm": "^0.1.0",
	"@lepton-cli/utils": "^0.1.0",
	"@lepton-cli/init": "^0.1.0",
	chalk: "^5.2.0",
	commander: "^10.0.0",
	dotenv: "^16.0.3",
	"import-local": "^3.1.0",
	minimist: "^1.2.7",
	"root-check": "^2.0.0",
	semver: "^7.3.8"
};
var directories = {
	lib: "lib"
};
var files = [
	"lib",
	"bin"
];
var repository = {
	type: "git",
	url: "git+https://github.com/destinytaoer/lepton-cli.git"
};
var license = "ISC";
var author = "destiny <1848765519@qq.com>";
var homepage = "https://github.com/destinytaoer/lepton-cli#readme";
var bugs = {
	url: "https://github.com/destinytaoer/lepton-cli/issues"
};
var pkg = {
	name: name,
	version: version,
	description: description,
	bin: bin,
	type: type,
	main: main,
	scripts: scripts,
	dependencies: dependencies,
	directories: directories,
	files: files,
	repository: repository,
	license: license,
	author: author,
	homepage: homepage,
	bugs: bugs
};

const LOWEST_NODE_VERSION = '13.2.0';
const DEFAULT_CLI_HOME = '.lepton-cli';

function logVersion() {
    log.info('cli', pkg.version);
}
function checkNodeVersion() {
    const currentVersion = process.version;
    const lowestVersion = LOWEST_NODE_VERSION;
    if (!semver.gte(currentVersion, lowestVersion)) {
        throw new Error(chalk.red(`使用 lepton cli 需要安装 ${lowestVersion} 以上版本的 Node.js`));
    }
}
function checkRootUser() {
    // 检查是否 root 账号, 如果是, 会自动降级为普通用户
    rootCheck();
}
// 检查用户主目录
function checkUserHome() {
    const homedir = os.homedir();
    if (!homedir || !fs.existsSync(homedir)) {
        throw new Error(chalk.red('当前登录用户主目录不存在'));
    }
}
function checkEnv() {
    const homedir = os.homedir();
    const dotenvPath = path.resolve(homedir, '.env');
    if (fs.existsSync(dotenvPath)) {
        dotenv.config({ path: dotenvPath });
    }
    createDefaultConfig();
    log.verbose('env', JSON.stringify(process.env));
}
function createDefaultConfig() {
    const cliConfig = {
        home: os.homedir(),
    };
    if (process.env.CLI_HOME) {
        cliConfig.cliHome = path.join(cliConfig.home, process.env.CLI_HOME);
    }
    else {
        cliConfig.cliHome = path.join(cliConfig.home, DEFAULT_CLI_HOME);
    }
    process.env.CLI_HOME_PATH = cliConfig.cliHome;
}
async function checkGlobalUpdate() {
    // 获取当前版本和包名
    const currentVersion = pkg.version;
    const name = pkg.name;
    // 从 npm api 获取所有版本
    const latestVersion = await getNpmSemverVersion(currentVersion, name);
    if (!latestVersion)
        return;
    // 提取所有大于当前版本的版本号
    log.warn('更新提示', chalk.yellow(`当前版本: ${currentVersion}, 最新版本: ${latestVersion}
更新命令: npm install -g ${name}`));
    // 获取最新版本号, 提示用户更新
}

const program = new commander.Command();
function registerCommand() {
    program
        .name(Object.keys(pkg.bin)[0])
        .usage('<command> [options]')
        .version(pkg.version)
        .option('-d --debug', '是否开启调试模式', false)
        .option('-tp --targetPath <targetPath>', '是否指定本地调试文件路径', '');
    program
        .command('init [projectName]')
        .option('-f --force', '是否强制初始化项目')
        .action(init);
    // debug 模式
    program.on('option:debug', function (...args) {
        const options = program.opts();
        if (options.debug) {
            process.env.LOG_LEVEL = 'verbose';
        }
        else {
            process.env.LOG_LEVEL = 'info';
        }
        log.level = process.env.LOG_LEVEL;
        log.verbose('debug', chalk.red('开启 debug 模式'));
    });
    // 指定 targetPath
    // 因为 targetPath 是 program 的选项, 定义的命令或者子命令中是不能直接拿到的, 所以统一放到环境变量中, 方便获取
    program.on("option:targetPath", function () {
        process.env.CLI_TARGET_PATH = program.opts().targetPath;
    });
    // 所有未知命令的处理
    program.on('command:*', function (args) {
        const availableCommands = program.commands.map(cmd => cmd.name());
        log.error('command', chalk.red(`未知命令: ${args[0]}`));
        if (availableCommands.length > 0) {
            log.info('command', chalk.red(`可用命令: ${availableCommands.join(', ')}`));
        }
    });
    // 只输入命令时, 输出帮助文档
    if (process.argv.length < 3) {
        program.outputHelp();
    }
    program.parse(process.argv);
}

async function cli() {
    try {
        await prepare();
        registerCommand();
    }
    catch (e) {
        log.error('', e.message);
    }
}
async function prepare() {
    logVersion();
    checkNodeVersion();
    checkRootUser();
    checkUserHome();
    checkEnv();
    await checkGlobalUpdate();
}

export { cli as default };
