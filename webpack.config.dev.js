/**
 * webpack打包配置（开发环境）
 * @author gxiaobang
 */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const I18nPlugin = require("i18n-webpack-plugin");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const autoprefixer = require('autoprefixer');

const path = require('path');

const { devPort, rootPath, srcPath, lang } = require('./config/base.config');
const api = require('./config/api.config');

// 国际化
const locale = require('./i18n/locale');


module.exports = (env = {}) => {
  // console.log(env)

  env.refer = env.refer || 'dev';
  env.lang = env.lang || lang;

  // 代理
  const proxy = {};
  for (let key in api[env.refer]) {
    proxy[`/proxy/${key}`] = {
      target: api[env.refer][key],
      secure: false,
      pathRewrite: {
        '^/proxy': ''
      }
    }
  }

  return {
    name: env.lang,
    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    entry: {
      app: path.resolve(srcPath, './app'),
      // 第三方
      vendor: ['core-js', 'react', 'react-dom', 'mobx',  'lodash', 'moment', 'axios', 'classnames']
    },
    output: {
      filename: '[name].js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.sass', '.scss'],
      // 简称
      alias: {
        '@': srcPath,
        'config': path.resolve(rootPath, './config'),
      }
    },
    /*externals: {
      requirejs: 'window.requirejs'
    },*/
    module: { 
      rules: [
        { 
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.(css|scss)$/,
          use: [
            'style-loader', 
            'css-loader?sourceMap', 
            'sass-loader?sourceMap'
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: ['url-loader?limit=25000']
        }
      ]
    },
    plugins: [

      // 热更新
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),

      // 提取相同的文件
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'common'],
        minChunks: 5
      }),

      // 修改页面静态文件路径
      new HtmlWebpackPlugin({
        title: 'Web组件',
        lang: env.lang,
        template: path.resolve(srcPath, './index.html')
      }),

      // 浏览器打开地址
      new OpenBrowserPlugin({
        url: `http://localhost:${devPort}`
      }),

      new I18nPlugin(locale.use(env.lang)),

      // 自定义参数
      new webpack.DefinePlugin({
        'NODE_REFER': JSON.stringify(env.refer)
      })
    ],

    // 代理服务器
    devServer: {
      contentBase: srcPath,
      host: '0.0.0.0',
      port: devPort,
      hot: true,
      inline: true,
      compress: true,
      historyApiFallback: true,
      proxy: proxy
    }
  };
}