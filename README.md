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

## 功能说明
* `assets` 静态文件
	* `page` 页面amd (运行`gulp page:create`生成)
	* `components` 组件 (`main.jsx`入口文件通过`gulp components:create`生成)
	* `styles` 样式 (`sass`)
	* `views` 视图页面

* `build` 编译文件
	* `dev` 开发环境
	* `release` 带hash串打包

* `assetsmap-[version].js` 路径映射，有对应的hash