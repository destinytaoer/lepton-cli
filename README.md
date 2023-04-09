# lepton-cli

基于 monorepo 结构的脚手架工具项目

## 主要技术栈

lerna + commander + rollup + typescript

## 详细文档

- [脚手架原理](./docs/cli.md)
- [拆包](./docs/packages.md)
- [核心流程介绍](./docs/core.md)
- [命令](./docs/commands.md)

## 开发

(1) 进入 packages/cli 目录下, 执行 yarn link

```bash
yarn link
```

(2) 模块开发和打包

每个模块都使用 rollup 进行编译打包, 可以执行一下命令进行开发和打包

```bash
yarn dev
yarn build
```

开发过程中, 可能需要同时启动多个 package 的 dev 模式. 当某个 package 开发完成后, 可以 build 代码, 后续就不需要启动该 package 的 dev 模式了

(3) 使用 lerna 添加模块以及安装依赖
参考: [Lerna Commands](https://lerna.js.org/docs/api-reference/commands)

```bash
# 初始化安装依赖
lerna bootstrap

# 创建一个模块
lerna create <name> [loc]

# 添加依赖
lerna add <package-name>[@version] --scope=<module-name> [--dev/--peer]
# 或者
$ yarn workspace <module-name>1 add <package-name>[@version]

# 添加公共依赖
yarn add -WD <package-name>
```
