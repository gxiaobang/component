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
$gulp init
```
创建`component`的`index.jsx`，和`base`的`index.jsx`。方便文件夹`require`。

### 运行webpack编译
```bash
$npm run dev
```

## 项目结构
* `assets`
	* `base` 基础工具类
	* `components` 组件
	* `styles` 样式 (`sass`)
	* `views` 视图页面

* `dev` 开发环境，有map文件用来调试
* `build` 带hash串打包