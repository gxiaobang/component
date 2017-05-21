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
const { version, host, devPort, srcPath, distPath, publicPath, api } = require('./config');

// 国际化
const languages = {
  'zh-cn': require('./i18n/zh-cn'),
  'en': require('./i18n/en'),
};

const proxy = {};

for (let key in api.dev) {
  proxy[`/${key}`] = {
    target: api.dev[key],
    secure: false/*,
    pathRewrite: {
      [`^/${key}`]: ''
    }*/
  }
}

module.exports = {
  // 调试map
  devtool: 'eval-source-map',
  entry: {
    /*reload: [
      `webpack-dev-server/client?http://${host}:${devPort}`,
      'webpack/hot/only-dev-server',
    ],*/
    app: [
      path.resolve(srcPath, './app')
    ],
    // 第三方
    vendor: [
      'react', 
      'react-dom'
    ]
  },
  output: {
    path: distPath,
    filename: '[name].js',
    publicPath: '/',
    // chunkFilename: '[name].[chunkhash:5].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.sass', '.scss'],
    // 简称
    alias: {
      'utils': path.resolve(srcPath, './utils'),
      'stores': path.resolve(srcPath, './stores'),
      'views': path.resolve(srcPath, './views'),
      'components': path.resolve(srcPath, './components'),
      'layouts': path.resolve(srcPath, './layouts'),
      'styles': path.resolve(srcPath, './styles'),
      'mocks': path.resolve(srcPath, './mocks')
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
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: ['url-loader?limit=100000']
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
      // minChunks: 5
    }),

    // 修改页面静态文件路径
    new HtmlWebpackPlugin({
      title: 'web组件',
      template: path.resolve(srcPath, './index.html')
    }),

    // 浏览器打开地址
    new OpenBrowserPlugin({
      url: `http://localhost:${devPort}`
    }),

    new I18nPlugin(languages['zh-cn']),

    /*new webpack.LoaderOptionsPlugin({
      test: /\.scss$/,
      options: {
        postcss: [ autoprefixer() ]
      }
    })*/
  ],

  // 代理服务器
  devServer: {
    contentBase: srcPath,
    host: host,
    port: devPort,
    hot: true,
    inline: true,
    compress: true,
    historyApiFallback: true,
    proxy: proxy
  }
};