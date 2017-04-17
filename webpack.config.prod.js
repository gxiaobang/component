/**
 * webpack打包配置（生产环境）
 * by gxiaobang
 */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const I18nPlugin = require("i18n-webpack-plugin");
const autoprefixer = require('autoprefixer');

const path = require('path');
const { version, host, port, srcPath, distPath, publicPath } = require('./config');

// 国际化
const languages = {
  'zh-cn': null,
  'en': require('./i18n/en'),
};

process.env.NODE_ENV = 'production';

module.exports = {
  name: 'zh-cn',
  entry: {
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
    filename: '[name].[chunkhash:5].js',
    publicPath: publicPath,
    chunkFilename: '[name].[chunkhash:5].js'
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
      'mock': path.resolve(srcPath, './mock')
    }
  },
  module: { 
    rules: [
      { 
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        /*use: [
          'style-loader', 
          'css-loader', 
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [
                  autoprefixer({ browsers: ['last 10 version'] })
                ]
              }
            }
          },
          'sass-loader'
        ]*/
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => {
                  return [
                    autoprefixer({ browsers: ['last 10 version'] })
                  ]
                }
              }
            },
            'sass-loader'
          ],
          // publicPath: publicPath
        })
      }
    ]
  },
  plugins: [

    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: false,
      allChunks: true
    }),

    // 提取相同的文件
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'common'],
      // minChunks: 5
    }),

    // 修改页面静态文件路径
    new HtmlWebpackPlugin({
      title: 'web组件',
      template: path.resolve(srcPath, './index.html'),
      filename: `index.${version}.html`
    }),

    new I18nPlugin(languages['zh-cn']),

    // 压缩
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: false
      }
    }),

    // 自定义参数
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};