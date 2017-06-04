/**
 * webpack打包配置（开发环境）
 * @author gxiaobang
 */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const I18nPlugin = require("i18n-webpack-plugin");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const autoprefixer = require('autoprefixer');

const path = require('path');

const { devPort, rootPath, srcPath, lang } = require('./config/base.config');
const api = require('./config/api.config');

// 语言包
const langFn = require('./i18n/lang');


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
    // 调试map
    devtool: 'eval-source-map',
    name: env.lang,
    entry: {
      app: [path.resolve(srcPath, './app')],
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
        'utils': path.resolve(srcPath, './utils'),
        'stores': path.resolve(srcPath, './stores'),
        'views': path.resolve(srcPath, './views'),
        'images': path.resolve(srcPath, './images'),
        'components': path.resolve(srcPath, './components'),
        'layouts': path.resolve(srcPath, './layouts'),
        'styles': path.resolve(srcPath, './styles'),
        'mocks': path.resolve(srcPath, './mocks'),
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
          test: /\.(png|jpg)$/,
          use: ['url-loader?limit=25000']
        }
      ]
    },
    plugins: [

      // 热更新
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),

      // new ExtractTextPlugin('styles.css'),

      // 提取相同的文件
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'common'],
        minChunks: 5
      }),

      // 修改页面静态文件路径
      new HtmlWebpackPlugin({
        title: 'WEB 组件',
        lang: env.lang,
        template: path.resolve(srcPath, './index.html')
      }),

      // 浏览器打开地址
      new OpenBrowserPlugin({
        url: `http://localhost:${devPort}`
      }),

      new I18nPlugin(langFn(env.lang)),

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