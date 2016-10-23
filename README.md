# react-framework

## 基于react单页架构

## 项目配置

### 运行环境`node6.x`

### 安装依赖包
```bash
$npm install
```

### 初始化项目
```bash
$gulp create
```
创建webpack`entry`文件，在下一步通过webpack去动态读取`fs`

### 运行webpack编译
```bash
$webpack -w
```
`-w`是`--watch`的简写，用来监听文件变化

## 目录结构
* `assets` 静态文件
	* `action` 页面路由 (运行`gulp action:create`生成)
	* `components` 组件目录 (`main.jsx`入口文件通过`gulp components:create`生成)
	* `styles` 样式目录 (`sass`)
	* `views` 页面 (被`action`引用)

* `build` 编译文件
	* `dev` 开发环境
	* `release` 发布打包