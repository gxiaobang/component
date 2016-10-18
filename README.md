# react-framework

## 基于react单页架构

## 项目配置

### 下载安装依赖包
```bash
$npm install
```
读取`package.json`配置

### 初始化项目
```bash
$gulp init
```
创建webpack所需`entry`文件

### 运行webpack
```bash
$webpack -w
```
`-w`监听文件变化

## 目录结构
* `assets` 静态文件
	* `action` 页面路由 (运行`gulp action:init`生成)
	* `component` 组件目录 (`main.jsx`入口文件通过`gulp component:init`生成)
	* `styles` 样式目录 (`sass`)
	* `view` 页面 (被`action`引用)

* `build` 编译文件

* `release` 发布打包